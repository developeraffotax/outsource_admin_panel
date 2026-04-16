import type { OrderDetails, OrderListItem, OrderStats, SortBy, SortDirection } from "./Orders.types";

const getString = (val: unknown, fallback: string): string =>
  typeof val === "string" ? val : fallback;

export const PAID_STATUSES = ["paid", "completed", "succeeded"];
export const FAILED_STATUSES = ["failed", "cancelled", "canceled", "refunded"];

// ── Parsers ───────────────────────────────────────────────────────────────
// These trust the already-normalized API response and just apply
// a runtime type-safety layer before putting data into React state.

export const parseOrderItem = (value: unknown): OrderListItem | null => {
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;
  if (typeof v.id !== "string" || !v.id) return null;
  return {
    id: v.id,
    customerName: getString(v.customerName, "N/A"),
    customerEmail: getString(v.customerEmail, "N/A"),
    serviceName: getString(v.serviceName, "N/A"),
    serviceAmount: typeof v.serviceAmount === "number" ? v.serviceAmount : null,
    amountTotal: typeof v.amountTotal === "number" ? v.amountTotal : null,
    currency: typeof v.currency === "string" ? v.currency : null,
    paymentStatus: getString(v.paymentStatus, "unknown"),
    createdAt: typeof v.createdAt === "string" ? v.createdAt : null,
  };
};

export const parseOrderDetails = (value: unknown): OrderDetails | null => {
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;
  const item = parseOrderItem(v);
  if (!item) return null;
  return {
    ...item,
    updatedAt: typeof v.updatedAt === "string" ? v.updatedAt : null,
    raw:
      typeof v.raw === "object" && v.raw !== null
        ? (v.raw as Record<string, unknown>)
        : {},
  };
};

// ── Formatters ────────────────────────────────────────────────────────────

export const formatAmount = (
  amount: number | null,
  currency: string | null,
): string => {
  if (amount === null) return "N/A";
  if (currency) {
    try {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${amount.toLocaleString("en-GB", { maximumFractionDigits: 2 })} ${currency}`;
    }
  }
  return amount.toLocaleString("en-GB", { maximumFractionDigits: 2 });
};

export const formatDate = (value: string | null): string => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatStatusLabel = (status: string): string => {
  const normalized = status.trim().toLowerCase();
  if (!normalized) return "Unknown";
  return normalized
    .split("_")
    .join(" ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getStatusBadgeClass = (status: string): string => {
  const normalizedStatus = status.trim().toLowerCase();
  if (PAID_STATUSES.includes(normalizedStatus)) return "bg-emerald-100 text-emerald-700";
  if (FAILED_STATUSES.includes(normalizedStatus)) return "bg-rose-100 text-rose-700";
  return "bg-amber-100 text-amber-700";
};

// ── Raw-field helpers ─────────────────────────────────────────────────────
// Safe accessors for fields that live in OrderDetails.raw

export const getRawString = (
  raw: Record<string, unknown>,
  key: string,
): string | null => {
  const v = raw[key];
  return typeof v === "string" && v.trim() ? v.trim() : null;
};

export const getRawNumber = (
  raw: Record<string, unknown>,
  key: string,
): number | null => {
  const v = raw[key];
  return typeof v === "number" && Number.isFinite(v) ? v : null;
};

const isNonEmptyString = (val: unknown): val is string =>
  typeof val === "string" && val.trim().length > 0;

export const formatBillingAddress = (
  raw: Record<string, unknown>,
): string | null => {
  const addr = raw.billingAddress;
  if (typeof addr !== "object" || addr === null) return null;
  const a = addr as Record<string, unknown>;
  const parts = [a.line1, a.line2, a.city, a.state, a.postal_code, a.country]
    .filter(isNonEmptyString);
  return parts.length > 0 ? parts.join(", ") : null;
};

// ── Derived-data helpers ──────────────────────────────────────────────────

export const calculateOrderStats = (orders: OrderListItem[]): OrderStats => {
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
};

export const sortOrders = (
  orders: OrderListItem[],
  sortBy: SortBy,
  direction: SortDirection,
): OrderListItem[] =>
  [...orders].sort((a, b) => {
    if (sortBy === "createdAt") {
      const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return direction === "asc" ? at - bt : bt - at;
    }
    if (sortBy === "amountTotal") {
      const av = a.amountTotal ?? Number.NEGATIVE_INFINITY;
      const bv = b.amountTotal ?? Number.NEGATIVE_INFINITY;
      return direction === "asc" ? av - bv : bv - av;
    }
    const av = ((a[sortBy] as string | null) ?? "").toLowerCase();
    const bv = ((b[sortBy] as string | null) ?? "").toLowerCase();
    return direction === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });
