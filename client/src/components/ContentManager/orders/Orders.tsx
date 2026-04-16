import axios from "axios";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../../config/api";
import { buildAuthConfig } from "../../../utils/auth";
import { extractErrorMessage } from "../../../utils/http";
import { OrderDetailPanel } from "./OrderDetailPanel";
import { SortArrow, StatsBar, TableSkeleton } from "./Orders.components";
import type {
  OrderDetails,
  OrderListItem,
  OrdersFeedbackState,
  OrderStats,
  SortBy,
  SortDirection,
} from "./Orders.types";
import {
  FAILED_STATUSES,
  PAID_STATUSES,
  formatAmount,
  formatDate,
  formatStatusLabel,
  getStatusBadgeClass,
  parseOrderDetails,
  parseOrderItem,
} from "./Orders.utils";

// ── Column definitions ────────────────────────────────────────────────────

const FEEDBACK_DISMISS_MS = 4000;

const SORTABLE_COLUMNS: { key: SortBy; label: string }[] = [
  { key: "customerName", label: "Customer" },
  { key: "serviceName", label: "Service" },
  { key: "amountTotal", label: "Amount" },
  { key: "createdAt", label: "Date" },
];

// ── Component ─────────────────────────────────────────────────────────────

const Orders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<OrdersFeedbackState | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<OrderDetails | null>(null);
  const [loadingDetailsById, setLoadingDetailsById] = useState<string | null>(
    null,
  );
  const [orderDetailsCache, setOrderDetailsCache] = useState<
    Record<string, OrderDetails>
  >({});

  // Auto-dismiss success toasts after 4 s
  useEffect(() => {
    if (feedback?.type !== "success") return;
    const timer = setTimeout(() => setFeedback(null), FEEDBACK_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [feedback]);

  // ── Data fetching ───────────────────────────────────────────────────

  const loadOrders = useCallback(async () => {
    const config = buildAuthConfig();
    if (!config) {
      setLoading(false);
      setFeedback({
        type: "error",
        message: "Missing session token. Please sign in again.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<{ orders?: unknown[]; total?: unknown }>(
        `${API_BASE_URL}/api/auth/orders`,
        config,
      );

      const normalized = Array.isArray(response.data.orders)
        ? response.data.orders
            .map(parseOrderItem)
            .filter((o): o is OrderListItem => o !== null)
        : [];

      setOrders(normalized);
      setTotalOrders(
        typeof response.data.total === "number"
          ? response.data.total
          : normalized.length,
      );
    } catch (error) {
      setFeedback({
        type: "error",
        message: extractErrorMessage(error, "Failed to load orders."),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const loadOrderDetails = useCallback(
    async (orderId: string): Promise<OrderDetails | null> => {
      const config = buildAuthConfig();
      if (!config) {
        setFeedback({
          type: "error",
          message: "Missing session token. Please sign in again.",
        });
        return null;
      }

      setLoadingDetailsById(orderId);
      setFeedback(null);

      try {
        const response = await axios.get<{ order?: unknown }>(
          `${API_BASE_URL}/api/auth/orders/${orderId}`,
          config,
        );
        const details = parseOrderDetails(response.data.order);
        if (!details)
          throw new Error("Invalid order details response from server");
        setOrderDetailsCache((prev) => ({ ...prev, [orderId]: details }));
        return details;
      } catch (error) {
        setFeedback({
          type: "error",
          message: extractErrorMessage(error, "Failed to load order details."),
        });
        return null;
      } finally {
        setLoadingDetailsById(null);
      }
    },
    [],
  );

  // ── Interaction handlers ────────────────────────────────────────────

  const toggleOrderDetails = useCallback(
    async (orderId: string) => {
      if (expandedOrderId === orderId) {
        setExpandedOrderId(null);
        setExpandedOrder(null);
        return;
      }
      setExpandedOrderId(orderId);
      const cached = orderDetailsCache[orderId];
      if (cached) {
        setExpandedOrder(cached);
        return;
      }
      setExpandedOrder(null);
      const details = await loadOrderDetails(orderId);
      if (details) setExpandedOrder(details);
    },
    [expandedOrderId, loadOrderDetails, orderDetailsCache],
  );

  const refreshOrders = useCallback(async () => {
    setExpandedOrderId(null);
    setExpandedOrder(null);
    setOrderDetailsCache({});
    await loadOrders();
  }, [loadOrders]);

  const copyOrderId = useCallback(async (orderId: string) => {
    try {
      await navigator.clipboard.writeText(orderId);
      setFeedback({
        type: "success",
        message: "Order ID copied to clipboard.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Unable to copy from this browser.",
      });
    }
  }, []);

  const handleColumnSort = useCallback(
    (column: SortBy) => {
      if (sortBy === column) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(column);
        setSortDirection("desc");
      }
    },
    [sortBy],
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setStatusFilter("all");
  }, []);

  // ── Derived data ────────────────────────────────────────────────────

  const stats = useMemo((): OrderStats => {
    let revenue = 0;
    let paidCount = 0;
    let issueCount = 0;
    const currencyTally: Record<string, number> = {};

    for (const order of orders) {
      const s = order.paymentStatus.trim().toLowerCase();
      if (PAID_STATUSES.includes(s)) {
        paidCount++;
        revenue += order.amountTotal ?? 0;
        if (order.currency) {
          currencyTally[order.currency] =
            (currencyTally[order.currency] ?? 0) + 1;
        }
      } else if (FAILED_STATUSES.includes(s)) {
        issueCount++;
      }
    }

    const topCurrency =
      Object.entries(currencyTally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    return { revenue, paidCount, issueCount, topCurrency };
  }, [orders]);

  const statusOptions = useMemo(() => {
    const statuses = new Set<string>();
    for (const order of orders) {
      const v = order.paymentStatus.trim().toLowerCase();
      if (v) statuses.add(v);
    }
    return ["all", ...Array.from(statuses).sort((a, b) => a.localeCompare(b))];
  }, [orders]);

  const visibleOrders = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" ||
        order.paymentStatus.trim().toLowerCase() === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      return [
        order.customerName,
        order.customerEmail,
        order.serviceName,
        order.paymentStatus,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "createdAt") {
        const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return sortDirection === "asc" ? at - bt : bt - at;
      }
      if (sortBy === "amountTotal") {
        const av = a.amountTotal ?? Number.NEGATIVE_INFINITY;
        const bv = b.amountTotal ?? Number.NEGATIVE_INFINITY;
        return sortDirection === "asc" ? av - bv : bv - av;
      }
      const av = ((a[sortBy] as string | null) ?? "").toLowerCase();
      const bv = ((b[sortBy] as string | null) ?? "").toLowerCase();
      return sortDirection === "asc"
        ? av.localeCompare(bv)
        : bv.localeCompare(av);
    });
  }, [orders, query, sortBy, sortDirection, statusFilter]);

  const hasActiveFilters = query.trim().length > 0 || statusFilter !== "all";

  const getDetailsForRow = (orderId: string): OrderDetails | null =>
    expandedOrder?.id === orderId
      ? expandedOrder
      : (orderDetailsCache[orderId] ?? null);

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <div className="cms-form-shell mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="cms-page-header">
        <h1 className="cms-page-title">Orders</h1>
        <p className="cms-page-subtitle">
          Monitor customer payments and service purchases.
        </p>
      </div>

      {/* Feedback toast */}
      {feedback && (
        <div
          className={`mb-4 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="shrink-0 rounded-md p-0.5 opacity-60 hover:opacity-100"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Stats bar */}
      {!loading && orders.length > 0 && (
        <StatsBar stats={stats} totalOrders={totalOrders} />
      )}

      {/* Table section */}
      <section className="rounded-xl border border-slate-200 bg-white p-2">
        {/* Toolbar */}
        <div className="mb-3 flex flex-wrap items-center  gap-3">
          <p className="text-xs font-semibold text-slate-500">
            {hasActiveFilters
              ? `${visibleOrders.length} of ${totalOrders} orders`
              : `${totalOrders} orders`}
          </p>

          <div className="flex flex-row items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, service…"
              className="max-w-64 shrink-0"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="shrink-0 max-w-64"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All statuses" : formatStatusLabel(s)}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                className="cms-btn-link shrink-0"
                onClick={clearFilters}
              >
                Clear
              </button>
            )}

            <button
              type="button"
              className="cms-btn-secondary shrink-0"
              onClick={refreshOrders}
              disabled={loading}
            >
              {loading ? "Loading…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <TableSkeleton />
        ) : visibleOrders.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-slate-400">
            {hasActiveFilters
              ? "No orders match your filters."
              : "No orders found."}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[780px] border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {SORTABLE_COLUMNS.map(({ key, label }) => (
                    <th
                      key={key}
                      className="cursor-pointer select-none px-4 py-3 text-left font-semibold hover:text-slate-800"
                      onClick={() => handleColumnSort(key)}
                    >
                      {label}
                      <SortArrow
                        column={key}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                      />
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="w-10 px-4 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {visibleOrders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const isRowLoading = loadingDetailsById === order.id;
                  const rowDetails = getDetailsForRow(order.id);

                  return (
                    <Fragment key={order.id}>
                      {/* Main row — click anywhere to expand */}
                      <tr
                        className={`cursor-pointer align-middle transition-colors ${
                          isExpanded
                            ? "bg-indigo-50/60"
                            : "hover:bg-slate-50/70"
                        }`}
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-800">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.customerEmail}
                          </p>
                        </td>

                        <td className="px-4 py-3 text-slate-700">
                          {order.serviceName}
                        </td>

                        <td className="px-4 py-3 font-semibold text-slate-800">
                          {formatAmount(order.amountTotal, order.currency)}
                        </td>

                        <td className="px-4 py-3 text-xs text-slate-500">
                          {formatDate(order.createdAt)}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(order.paymentStatus)}`}
                          >
                            {formatStatusLabel(order.paymentStatus)}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-center">
                          {isRowLoading ? (
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-600" />
                          ) : (
                            <span
                              className={`inline-block text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            >
                              ▾
                            </span>
                          )}
                        </td>
                      </tr>

                      {/* Expanded detail panel */}
                      {isExpanded && (
                        <tr className="bg-indigo-50/40">
                          <td colSpan={6} className="px-4 py-4">
                            <OrderDetailPanel
                              details={rowDetails}
                              isLoading={isRowLoading}
                              onCopyId={copyOrderId}
                            />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;
