
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  CalendarDays,
  Clock3,
  RefreshCw,
  AlertCircle,
  CalendarX2,
} from "lucide-react";

import { getCustomerBookings } from "../../features/booking/auth/bookingThunk";
// Change this import path later to the correct location.
import useBookingBasePath from "../../hooks/useBookingBasePath";

// BookingCard is intentionally kept as a separate reusable component.
import BookingCard from "./BookingCard";

function BookingListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookingBasePath = useBookingBasePath();

  const { customerBookings, loading, error } = useSelector(
    (state) => state.booking,
  );

  /* =========================================================
     FETCH USER BOOKINGS

     Backend:

     GET /booking/customer

     The backend identifies the current user from JWT.

     Therefore the frontend does NOT need:
     - customerId
     - salonId
     - role
     ========================================================= */

  useEffect(() => {
    dispatch(getCustomerBookings());
  }, [dispatch]);

  /* =========================================================
     RETRY
     ========================================================= */

  const handleRetry = () => {
    dispatch(getCustomerBookings());
  };

  /* =========================================================
     SORT BOOKINGS

     Newest appointment first.

     We create a new array so Redux state itself
     is never mutated.
     ========================================================= */

  const sortedBookings = [...(customerBookings || [])].sort((a, b) => {
    const dateA = new Date(a?.startTime || 0).getTime();
    const dateB = new Date(b?.startTime || 0).getTime();

    return dateB - dateA;
  });

  /* =========================================================
     LOADING STATE
     ========================================================= */

  if (loading.fetchCustomer && sortedBookings.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page heading skeleton */}

          <div className="animate-pulse">
            <div className="h-8 w-48 rounded-lg bg-slate-200" />

            <div className="mt-3 h-4 w-72 rounded bg-slate-200" />
          </div>

          {/* Booking cards skeleton */}

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {/* Salon header */}

                <div className="flex items-center justify-between">
                  <div className="h-6 w-40 rounded bg-slate-200" />

                  <div className="h-6 w-20 rounded-full bg-slate-200" />
                </div>

                {/* Appointment information */}

                <div className="mt-6 space-y-4">
                  <div className="h-16 w-full rounded-xl bg-slate-200" />

                  <div className="h-4 w-3/4 rounded bg-slate-200" />

                  <div className="flex gap-2">
                    <div className="h-7 w-20 rounded-lg bg-slate-200" />
                    <div className="h-7 w-24 rounded-lg bg-slate-200" />
                  </div>
                </div>

                {/* Bottom section */}

                <div className="mt-6 flex justify-between">
                  <div className="h-6 w-20 rounded bg-slate-200" />

                  <div className="h-9 w-28 rounded-xl bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR STATE
     ========================================================= */

  if (error && sortedBookings.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertCircle size={28} className="text-red-500" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              Unable to load bookings
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We couldn't retrieve your bookings right now. Please try again.
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     EMPTY STATE
     ========================================================= */

  if (sortedBookings.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CalendarX2 size={32} className="text-emerald-600" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              No bookings yet
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You don't have any bookings yet. Once you book a salon, your
              appointments will appear here.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(`${bookingBasePath}/booking/salons`)
              }
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <CalendarDays size={18} />
              Book a Salon
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN PAGE
     ========================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                <CalendarDays
                  size={23}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  My Bookings
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View your salon appointments and booking details.
                </p>
              </div>
            </div>
          </div>

          {/* Booking count */}

          <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm sm:self-auto">
            <CalendarDays
              size={16}
              className="text-emerald-600"
            />

            <span>
              {sortedBookings.length}{" "}
              {sortedBookings.length === 1 ? "Booking" : "Bookings"}
            </span>
          </div>
        </div>

        {/* ===================================================
            REFRESHING INDICATOR
        =================================================== */}

        {loading.fetchCustomer && sortedBookings.length > 0 && (
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
            <RefreshCw
              size={14}
              className="animate-spin"
            />

            Updating bookings...
          </div>
        )}

        {/* ===================================================
            BOOKING LIST
        =================================================== */}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedBookings.map((booking) => {
            /*
             * Each booking card is a navigation target.
             *
             * Example:
             *
             * /customer/booking/information/15
             * /owner/booking/information/15
             * /admin/booking/information/15
             *
             * bookingBasePath comes from useBookingBasePath().
             */

            const bookingInformationPath =
              `${bookingBasePath}/booking/information/${booking.id}`;

            return (
              <Link
                key={booking.id}
                to={bookingInformationPath}
                className="
                  group
                  block
                  rounded-2xl
                  outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  focus-visible:ring-offset-2
                "
                aria-label={`View details for booking ${booking.id}`}
              >
                <BookingCard booking={booking} />
              </Link>
            );
          })}
        </div>

        {/* ===================================================
            FOOTER INFORMATION
        =================================================== */}

        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center text-xs text-slate-400 sm:flex-row">
          <Clock3 size={14} />

          <span>
            Your booking status is updated automatically after payment
            verification.
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookingListPage;
