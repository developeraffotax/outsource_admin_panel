import mongoose from "mongoose";
import Order, {
  type IOrderDetails,
  type IOrderSummary,
} from "../models/Order.model.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

type ListOrdersOptions = {
  page?: number;
  limit?: number;
};

class OrderServiceError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "OrderServiceError";
    this.statusCode = statusCode;
  }
}

const trimOrFallback = (value: unknown, fallback = "N/A"): string => {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
};

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

const toIsoString = (value: unknown): string | null => {
  if (!(value instanceof Date)) return null;
  return Number.isNaN(value.getTime()) ? null : value.toISOString();
};

const normalizePageParam = (value: unknown): number =>
  typeof value === "number" && value > 0 ? Math.floor(value) : DEFAULT_PAGE;

const normalizeLimitParam = (value: unknown): number =>
  typeof value === "number" && value > 0
    ? Math.min(Math.floor(value), MAX_LIMIT)
    : DEFAULT_LIMIT;

const buildRawPayload = (
  doc: Record<string, unknown>,
  summaryId: string,
): Record<string, unknown> => {
  const raw = JSON.parse(JSON.stringify(doc)) as Record<string, unknown>;
  raw.id = summaryId;
  delete raw._id;
  delete raw.__v;
  return raw;
};

const normalizeDocument = (doc: Record<string, unknown>): IOrderSummary => ({
  id: String(doc._id ?? ""),
  customerName: trimOrFallback(doc.customerName),
  customerEmail: trimOrFallback(doc.customerEmail),
  serviceName: trimOrFallback(doc.serviceName),
  serviceAmount: toNumber(doc.serviceAmount),
  amountTotal: toNumber(doc.amountTotal),
  currency:
    typeof doc.currency === "string" && doc.currency.trim()
      ? doc.currency.trim().toUpperCase()
      : null,
  paymentStatus: trimOrFallback(doc.status, "unknown"),
  createdAt: toIsoString(doc.createdAt),
});

async function listOrdersService(options: ListOrdersOptions = {}): Promise<{
  orders: IOrderSummary[];
  total: number;
  page: number;
  limit: number;
}> {
  const page = normalizePageParam(options.page);
  const limit = normalizeLimitParam(options.limit);

  const skip = (page - 1) * limit;

  const [total, documents] = await Promise.all([
    Order.countDocuments(),
    Order.find()
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
  ]);

  const orders = (documents as Record<string, unknown>[])
    .map(normalizeDocument)
    .filter((order) => order.id.length > 0);

  return { orders, total, page, limit };
}

async function getOrderByIdService(orderId: string): Promise<IOrderDetails> {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new OrderServiceError("Invalid order id", 400);
  }

  const document = await Order.findById(orderId).lean();

  if (!document) {
    throw new OrderServiceError("Order not found", 404);
  }

  const doc = document as Record<string, unknown>;
  const summary = normalizeDocument(doc);

  if (!summary.id) {
    throw new OrderServiceError("Order not found", 404);
  }

  return {
    ...summary,
    updatedAt: toIsoString(doc.updatedAt),
    raw: buildRawPayload(doc, summary.id),
  };
}

const isOrderServiceError = (error: unknown): error is OrderServiceError =>
  error instanceof OrderServiceError;

export { getOrderByIdService, isOrderServiceError, listOrdersService };
