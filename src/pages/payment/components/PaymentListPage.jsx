import React, { useEffect, useMemo, useState } from "react";
import { CreditCard, RefreshCw, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { getSalonOwnerPayments } from "../../../features/payment/auth/paymentThunk";

import PaymentCard from "./PaymentCard";








/* =========================================================
   PAYMENT LIST PAGE
========================================================= */

function PaymentListPage() {
  const dispatch = useDispatch();

  const { payments, loading, error } = useSelector((state) => state.payments);

  const [searchTerm, setSearchTerm] = useState("");

  /* =======================================================
     FETCH PAYMENTS
  ======================================================= */

  useEffect(() => {
    dispatch(getSalonOwnerPayments());
  }, [dispatch]);

  /* =======================================================
     SEARCH / FILTER
  ======================================================= */

  const filteredPayments = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return payments;
    }

    return payments.filter((payment) => {
      return (
        String(payment.id ?? "")
          .toLowerCase()
          .includes(search) ||
        String(payment.userId ?? "")
          .toLowerCase()
          .includes(search) ||
        String(payment.bookingId ?? "")
          .toLowerCase()
          .includes(search) ||
        String(payment.salonId ?? "")
          .toLowerCase()
          .includes(search) ||
        String(payment.paymentMethod ?? "")
          .toLowerCase()
          .includes(search) ||
        String(payment.status ?? "")
          .toLowerCase()
          .includes(search)
      );
    });
  }, [payments, searchTerm]);

  /* =======================================================
     REFRESH
  ======================================================= */

  const handleRefresh = () => {
    dispatch(getSalonOwnerPayments());
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="space-y-6">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CreditCard size={22} strokeWidth={1.8} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Payments
            </h1>

            <p className="mt-0.5 text-sm text-slate-500">
              Payments received from customers of your salons
            </p>
          </div>
        </div>

        {/* =================================================
            REFRESH
        ================================================= */}

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading.fetchSalonOwnerPayments}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={loading.fetchSalonOwnerPayments ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* ===================================================
          SEARCH / SUMMARY
      =================================================== */}

      <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by payment, user, booking, salon..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <p className="shrink-0 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredPayments.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {payments.length}
          </span>{" "}
          payments
        </p>
      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error?.message || "Failed to load payments."}
        </div>
      )}

      {/* ===================================================
          PAYMENT TABLE
      =================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* =================================================
            TABLE HEADER
        ================================================= */}

        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr] items-center border-b border-slate-200 bg-slate-50 px-5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Payment
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Customer
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Salon
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Method
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Amount
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Status
          </p>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading.fetchSalonOwnerPayments ? (
          <div className="flex min-h-48 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

              <p className="mt-3 text-sm text-slate-500">Loading payments...</p>
            </div>
          </div>
        ) : filteredPayments.length === 0 ? (
          /* ===============================================
             EMPTY STATE
          =============================================== */

          <div className="flex min-h-48 items-center justify-center px-6">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <CreditCard size={21} strokeWidth={1.8} />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-700">
                {searchTerm ? "No payments found" : "No payments available"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {searchTerm
                  ? "Try a different search term."
                  : "Payments will appear here when customers make payments."}
              </p>
            </div>
          </div>
        ) : (
          /* ===============================================
             PAYMENT ROWS
          =============================================== */

          filteredPayments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        )}
      </div>
    </div>
  );
}

export default PaymentListPage;
