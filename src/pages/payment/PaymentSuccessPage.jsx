import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  CheckCircle2,
  Clock3,
  Home,
  CreditCard,
  Receipt,
  CalendarCheck2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

/*
 * Change this import path later if required.
 */
import { useBookingBasePath } from "../../hooks/useBookingBasePath";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /*
   * =========================================================
   * BOOKING BASE PATH
   * =========================================================
   *
   * Example:
   *
   * Owner:
   * bookingBasePath = "/owner/booking"
   *
   * Customer:
   * bookingBasePath = "/customer/booking"
   *
   * homePath = "/owner"
   * or
   * homePath = "/customer"
   *
   * bookingsPath = "/owner/bookings"
   * or
   * "/customer/bookings"
   */
  const bookingBasePath = useBookingBasePath();

  /*
   * =========================================================
   * RAZORPAY PAYMENT PARAMETERS
   * =========================================================
   */

  const paymentStatus = searchParams.get("razorpay_payment_link_status");

  const paymentId = searchParams.get("razorpay_payment_id");

  const paymentLinkId = searchParams.get("razorpay_payment_link_id");

  const paymentReferenceId = searchParams.get(
    "razorpay_payment_link_reference_id",
  );

  /*
   * =========================================================
   * AUTO REDIRECT TIMER
   * =========================================================
   */

  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(timer);

          /*
           * Reusable home route.
           */
          navigate(`${bookingBasePath}/booking/salons`);

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  /*
   * =========================================================
   * PAYMENT STATE
   *
   * IMPORTANT:
   * This status comes from Razorpay redirect parameters.
   *
   * Actual payment confirmation should still be handled
   * by your backend webhook.
   * =========================================================
   */

  const isPaid = paymentStatus?.toLowerCase() === "paid";

  const statusText = useMemo(() => {
    if (isPaid) {
      return "Payment received successfully";
    }

    return "Payment is being processed";
  }, [isPaid]);

  /*
   * =========================================================
   * NAVIGATION
   * =========================================================
   */

  const handleGoHome = () => {
    navigate(`${bookingBasePath}/booking/salons`);
  };

  const handleViewBookings = () => {
    navigate(`${bookingBasePath}/booking/list`);
  };

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
        <div className="w-full">
          {/* =================================================
              MAIN CARD
          ================================================= */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            {/* =================================================
                SUCCESS HEADER
            ================================================= */}

            <div className="bg-emerald-600 px-6 py-10 text-center text-white sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                {isPaid ? (
                  <CheckCircle2 size={48} className="text-emerald-600" />
                ) : (
                  <Clock3 size={48} className="text-amber-500" />
                )}
              </div>

              <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                {isPaid ? "Payment Successful!" : "Payment Processing"}
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-emerald-50 sm:text-base">
                {isPaid
                  ? "Your payment has been received. Your booking confirmation will be updated shortly."
                  : "We have received your payment response. Your booking is being verified."}
              </p>
            </div>

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="p-6 sm:p-10">
              {/* =================================================
                  BOOKING CONFIRMATION MESSAGE
              ================================================= */}

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <CalendarCheck2 size={22} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Appointment booking
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Your payment has been received. Our payment webhook will
                      verify the transaction and update your booking status.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  PAYMENT DETAILS
              ================================================= */}

              <div className="mt-8">
                <div className="mb-4 flex items-center gap-2">
                  <Receipt size={19} className="text-slate-500" />

                  <h2 className="font-semibold text-slate-900">
                    Payment Details
                  </h2>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  {/* Payment Status */}

                  <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-slate-500">
                      Payment Status
                    </span>

                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        isPaid
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isPaid ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Clock3 size={14} />
                      )}

                      {statusText}
                    </span>
                  </div>

                  {/* Payment ID */}

                  {paymentId && (
                    <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="flex items-center gap-2 text-sm text-slate-500">
                        <CreditCard size={16} />
                        Payment ID
                      </span>

                      <span className="break-all font-mono text-xs font-medium text-slate-700 sm:text-right">
                        {paymentId}
                      </span>
                    </div>
                  )}

                  {/* Payment Link ID */}

                  {paymentLinkId && (
                    <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-slate-500">
                        Payment Link ID
                      </span>

                      <span className="break-all font-mono text-xs font-medium text-slate-700 sm:text-right">
                        {paymentLinkId}
                      </span>
                    </div>
                  )}

                  {/* Reference ID */}

                  {paymentReferenceId && (
                    <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-slate-500">
                        Reference ID
                      </span>

                      <span className="break-all font-mono text-xs font-medium text-slate-700 sm:text-right">
                        {paymentReferenceId}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================
                  WEBHOOK INFORMATION
              ================================================= */}

              <div className="mt-6 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Payment verification in progress
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Your booking is confirmed by our server only after
                    Razorpay's webhook verifies the payment. You don't need to
                    refresh this page.
                  </p>
                </div>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleGoHome}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  <Home size={18} />
                  Go to Home
                </button>

                <button
                  type="button"
                  onClick={handleViewBookings}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View My Bookings
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* =================================================
                  AUTO REDIRECT
              ================================================= */}

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-400">
                  You will be redirected to the home page in{" "}
                  <span className="font-semibold text-slate-600">
                    {countdown}
                  </span>{" "}
                  seconds.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <p className="mt-6 text-center text-xs text-slate-400">
            If your booking status does not update immediately, please check
            your bookings after a few moments.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
