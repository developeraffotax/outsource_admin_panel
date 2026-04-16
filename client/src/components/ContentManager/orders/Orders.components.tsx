import { formatAmount } from "./Orders.utils";
import type { OrderStats, SortBy, SortDirection } from "./Orders.types";

// ── Sort arrow ────────────────────────────────────────────────────────────

type SortArrowProps = {
  column: SortBy;
  sortBy: SortBy;
  sortDirection: SortDirection;
};

export const SortArrow = ({ column, sortBy, sortDirection }: SortArrowProps) => {
  if (sortBy !== column)
    return <span className="ml-1 select-none text-slate-300">↕</span>;
  return (
    <span className="ml-1 select-none text-indigo-500">
      {sortDirection === "asc" ? "↑" : "↓"}
    </span>
  );
};

// ── Stat card ─────────────────────────────────────────────────────────────

type StatCardAccent = "default" | "green" | "red" | "amber";

const accentClass: Record<StatCardAccent, string> = {
  default: "text-slate-800",
  green: "text-emerald-700",
  red: "text-rose-600",
  amber: "text-amber-600",
};

type StatCardProps = {
  label: string;
  value: string;
  accent: StatCardAccent;
};

export const StatCard = ({ label, value, accent }: StatCardProps) => (
  <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3">
    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
      {label}
    </p>
    <p className={`text-xl font-bold ${accentClass[accent]}`}>{value}</p>
  </div>
);

// ── Stats bar ─────────────────────────────────────────────────────────────

type StatsBarProps = {
  stats: OrderStats;
  totalOrders: number;
};

export const StatsBar = ({ stats, totalOrders }: StatsBarProps) => (
  <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
    <StatCard
      label="Total Orders"
      value={totalOrders.toLocaleString()}
      accent="default"
    />
    <StatCard
      label="Revenue"
      value={formatAmount(stats.revenue, stats.topCurrency)}
      accent="green"
    />
    <StatCard
      label="Paid"
      value={stats.paidCount.toLocaleString()}
      accent="green"
    />
    <StatCard
      label="Issues"
      value={stats.issueCount.toLocaleString()}
      accent={stats.issueCount > 0 ? "red" : "default"}
    />
  </div>
);

// ── Table skeleton ────────────────────────────────────────────────────────

const SKELETON_ROW_COUNT = 5;

export const TableSkeleton = () => (
  <div className="space-y-2 p-2">
    {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
      <div
        key={i}
        className="h-11 animate-pulse rounded-lg bg-slate-100"
        style={{ opacity: 1 - i * 0.15 }}
      />
    ))}
  </div>
);
