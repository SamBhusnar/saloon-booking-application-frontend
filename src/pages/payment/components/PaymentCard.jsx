import { CreditCard, ReceiptText, User, Store } from "lucide-react";

/* =========================================================
   STATUS STYLE
========================================================= */

function getStatusClass(status) {
  switch (status) {
    case "SUCCESS":
    case "COMPLETED":
      return "bg-emerald-50 text-emerald-700";

    case "PENDING":
      return "bg-amber-50 text-amber-700";

    case "FAILED":
      return "bg-red-50 text-red-700";

    case "REFUNDED":
      return "bg-blue-50 text-blue-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

/* =========================================================
   PAYMENT CARD / TABLE ROW
========================================================= */

function PaymentCard({ payment }) {
  return (
    <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr] items-center border-b border-slate-100 px-5 py-4 last:border-b-0">
      {/* =================================================
          PAYMENT
      ================================================= */}

      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CreditCard size={18} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">
            Payment #{payment.id}
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            Booking #{payment.bookingId}
          </p>
        </div>
      </div>

      {/* =================================================
          CUSTOMER
      ================================================= */}

      <div className="flex items-center gap-2 text-sm text-slate-600">
        <User size={16} strokeWidth={1.8} className="shrink-0 text-slate-400" />

        <span>User #{payment.userId}</span>
      </div>

      {/* =================================================
          SALON
      ================================================= */}

      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Store
          size={16}
          strokeWidth={1.8}
          className="shrink-0 text-slate-400"
        />

        <span>Salon #{payment.salonId}</span>
      </div>

      {/* =================================================
          PAYMENT METHOD
      ================================================= */}

      <div className="flex items-center gap-2 text-sm text-slate-600">
        <ReceiptText
          size={16}
          strokeWidth={1.8}
          className="shrink-0 text-slate-400"
        />

        <span>{payment.paymentMethod || "—"}</span>
      </div>

      {/* =================================================
          AMOUNT
      ================================================= */}

      <div>
        <p className="text-sm font-semibold text-slate-800">
          ₹{Number(payment.amount || 0).toLocaleString("en-IN")}
        </p>
      </div>

      {/* =================================================
          STATUS
      ================================================= */}

      <div>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
            payment.status,
          )}`}
        >
          {payment.status || "UNKNOWN"}
        </span>
      </div>
    </div>
  );
}

export default PaymentCard;
