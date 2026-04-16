import type { OrderDetails } from "./Orders.types";
import {
  formatAmount,
  formatBillingAddress,
  formatDate,
  formatStatusLabel,
  getRawNumber,
  getRawString,
  getStatusBadgeClass,
} from "./Orders.utils";

// ── Reusable detail field card ────────────────────────────────────────────

type DetailFieldProps = {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
};

const DetailField = ({ label, children, wide }: DetailFieldProps) => (
  <div
    className={`rounded-lg border border-slate-100 bg-slate-50 p-3 ${wide ? "sm:col-span-2" : ""}`}
  >
    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-slate-400">
      {label}
    </p>
    <div className="mt-1">{children}</div>
  </div>
);

const FieldText = ({ value }: { value: string }) => (
  <p className="text-sm font-semibold text-slate-800">{value}</p>
);

const FieldMono = ({ value }: { value: string }) => (
  <p className="break-all font-mono text-xs font-semibold text-slate-700">
    {value}
  </p>
);

// ── Main component ────────────────────────────────────────────────────────

type OrderDetailPanelProps = {
  details: OrderDetails | null;
  isLoading: boolean;
  onCopyId: (id: string) => void;
};

export const OrderDetailPanel = ({
  details,
  isLoading,
  onCopyId,
}: OrderDetailPanelProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-2 text-sm text-slate-500">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-600" />
        Loading details…
      </div>
    );
  }

  if (!details) {
    return (
      <p className="py-2 text-sm text-slate-400">
        Could not load order details.
      </p>
    );
  }

  const { raw } = details;

  // ── Extract extra fields from raw ───────────────────────────────────
  const phone = getRawString(raw, "customerPhone");
  const receiptUrl = getRawString(raw, "receiptUrl");
  const paymentIntentId = getRawString(raw, "stripePaymentIntentId");
  const processingFee = getRawNumber(raw, "processingFee");
  const billingAddress = formatBillingAddress(raw);

  return (
    <div className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm">
      {/* ── Customer header ─────────────────────────────────────────── */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-slate-800">
            {details.customerName}
          </p>
          <a
            href={`mailto:${details.customerEmail}`}
            className="text-sm text-indigo-600 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {details.customerEmail}
          </a>
          {phone && (
            <p className="mt-0.5 text-xs text-slate-500">{phone}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(details.paymentStatus)}`}
          >
            {formatStatusLabel(details.paymentStatus)}
          </span>

          {receiptUrl && (
            <a
              href={receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cms-btn-secondary text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              View Receipt ↗
            </a>
          )}

          <button
            type="button"
            className="cms-btn-secondary text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onCopyId(details.id);
            }}
          >
            Copy ID
          </button>
        </div>
      </div>

      {/* ── Payment breakdown ────────────────────────────────────────── */}
      <div className="mb-3">
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-slate-400">
          Payment Breakdown
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <DetailField label="Service Amount">
            <FieldText
              value={formatAmount(details.serviceAmount, details.currency)}
            />
          </DetailField>

          <DetailField label="Processing Fee">
            <FieldText
              value={
                processingFee !== null
                  ? formatAmount(processingFee, details.currency)
                  : "N/A"
              }
            />
          </DetailField>

          <DetailField label="Total Charged">
            <FieldText
              value={formatAmount(details.amountTotal, details.currency)}
            />
          </DetailField>
        </div>
      </div>

      {/* ── Order details ────────────────────────────────────────────── */}
      <div className="mb-3">
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-slate-400">
          Order Details
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <DetailField label="Service" wide>
            <FieldText value={details.serviceName} />
          </DetailField>

          <DetailField label="Currency">
            <FieldText value={details.currency ?? "N/A"} />
          </DetailField>

          <DetailField label="Ordered">
            <FieldText value={formatDate(details.createdAt)} />
          </DetailField>

          <DetailField label="Last Updated">
            <FieldText value={formatDate(details.updatedAt)} />
          </DetailField>
        </div>
      </div>

      {/* ── Reference ───────────────────────────────────────────────── */}
      {(paymentIntentId ?? billingAddress) && (
        <div>
          <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-slate-400">
            Reference
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {paymentIntentId && (
              <DetailField label="Stripe Payment ID">
                <FieldMono value={paymentIntentId} />
              </DetailField>
            )}
            {billingAddress && (
              <DetailField label="Billing Address">
                <FieldText value={billingAddress} />
              </DetailField>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
