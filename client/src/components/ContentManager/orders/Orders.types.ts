// ── Data types ───────────────────────────────────────────────────────────
export type OrdersFeedbackState = {
  type: "success" | "error";
  message: string;
};

export type OrderListItem = {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  serviceAmount: number | null;
  amountTotal: number | null;
  currency: string | null;
  paymentStatus: string;
  createdAt: string | null;
};

export type OrderDetails = OrderListItem & {
  updatedAt: string | null;
  // raw contains all original DB fields: processingFee, receiptUrl,
  // billingAddress, stripePaymentIntentId, customerPhone, etc.
  raw: Record<string, unknown>;
};

export type OrdersListResponse = {
  orders: OrderListItem[];
  total: number;
  page: number;
  limit: number;
};

export type OrderDetailsResponse = {
  order: OrderDetails;
};

// ── UI types ─────────────────────────────────────────────────────────────
export type SortBy = "createdAt" | "amountTotal" | "customerName" | "serviceName";
export type SortDirection = "asc" | "desc";

export type OrderStats = {
  revenue: number;
  paidCount: number;
  issueCount: number;
  topCurrency: string | null;
};
