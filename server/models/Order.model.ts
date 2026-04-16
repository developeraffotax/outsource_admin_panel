import mongoose from "mongoose";

// ── API output types (used by the service layer) ──────────────────────────
export type IOrderSummary = {
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

export type IOrderDetails = IOrderSummary & {
  updatedAt: string | null;
  raw: Record<string, unknown>;
};

// ── Mongoose document type (matches the real DB shape) ────────────────────
export type IOrderDocument = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string | null;
  serviceName?: string;
  serviceAmount?: number;
  serviceAmountPence?: number;
  amountTotal?: number;
  amountTotalPence?: number;
  currency?: string;
  status?: string;
  processingFee?: number;
  processingFeePence?: number;
  feePercent?: number;
  feeFixedPence?: number;
  receiptUrl?: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string | null;
  billingAddress?: Record<string, unknown>;
  stripeEventIds?: string[];
  stripePayload?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
};

const OrderSchema = new mongoose.Schema<IOrderDocument>(
  {
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    serviceName: String,
    serviceAmount: Number,
    serviceAmountPence: Number,
    amountTotal: Number,
    amountTotalPence: Number,
    currency: String,
    status: String,
    processingFee: Number,
    processingFeePence: Number,
    feePercent: Number,
    feeFixedPence: Number,
    receiptUrl: String,
    stripeSessionId: String,
    stripePaymentIntentId: String,
    stripeCustomerId: String,
    billingAddress: mongoose.Schema.Types.Mixed,
    stripeEventIds: [String],
    stripePayload: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
    collection: "orders",
  },
);

OrderSchema.index({ createdAt: -1 });

const Order = mongoose.model<IOrderDocument>("Order", OrderSchema);

export default Order;
