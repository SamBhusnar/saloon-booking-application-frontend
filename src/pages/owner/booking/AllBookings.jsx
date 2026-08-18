import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  CalendarDays,
  Clock3,
  UserRound,
  Store,
  Scissors,
  RefreshCw,
  AlertCircle,
  CalendarX2,
  ChevronRight,
} from "lucide-react";

import { getBookingsBySalonIdAndAuth } from "../../../features/booking/auth/bookingThunk";

// Change this import path later if your hook is located elsewhere.
import useBookingBasePath from "../../../hooks/useBookingBasePath";

function AllBookings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bookingBasePath = useBookingBasePath();

  const { ownerBookings, loading, error } = useSelector(
    (state) => state.booking,
  );

  /* =========================================================
     FETCH ALL BOOKINGS OF OWNER'S SALONS

     Backend:
     
     GET /booking/salons

     The backend uses the JWT to determine the currently
     authenticated salon owner and returns bookings belonging
     to that owner's salons.

     Therefore the frontend does NOT need:
     - ownerId
     - customerId
     - salonId
  ========================================================= */

  useEffect(() => {
    dispatch(getBookingsBySalonIdAndAuth());
  }, [dispatch]);

  /* =========================================================
     NAVIGATION

     The complete booking information is displayed on:

     BookingInformationPage.jsx

     Only the booking ID is required here.
  ========================================================= */

  const handleBookingClick = (bookingId) => {
    if (!bookingId) {
      return;
    }

    navigate(`${bookingBasePath}/booking/information/${bookingId}`, {
      state: { from: location.pathname },
    });
  };

  /* =========================================================
     RETRY
  ========================================================= */

  const handleRetry = () => {
    dispatch(getBookingsBySalonIdAndAuth());
  };

  /* =========================================================
     SORT BOOKINGS

     Newest booking/start time first.

     A new array is created so Redux state is never mutated.
  ========================================================= */

  const sortedBookings = useMemo(() => {
    return [...(ownerBookings || [])].sort((a, b) => {
      const dateA = new Date(a?.startTime || 0).getTime();
      const dateB = new Date(b?.startTime || 0).getTime();

      return dateB - dateA;
    });
  }, [ownerBookings]);

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (value) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
     FORMAT TIME

     Uses startTime because the list only needs to provide
     a quick overview of the appointment.
  ========================================================= */

  const formatTime = (value) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================================================
     GET CUSTOMER NAME

     BookingDto contains user/customer information according
     to the backend response structure.
  ========================================================= */

  const getCustomerName = (booking) => {
    const user = booking?.userDto;

    if (!user) {
      return "Unknown Customer";
    }

    return (
      user.name ||
      user.fullName ||
      user.username ||
      user.email ||
      "Unknown Customer"
    );
  };

  /* =========================================================
     GET SALON NAME
  ========================================================= */

  const getSalonName = (booking) => {
    return (
      booking?.salonDto?.name || booking?.salonDto?.salonName || "Unknown Salon"
    );
  };

  /* =========================================================
     GET SERVICE NAMES

     A booking can contain multiple service offerings.

     Only a compact summary is shown in the table.
     Complete service information belongs to
     BookingInformationPage.jsx.
  ========================================================= */

  const getServiceSummary = (booking) => {
    const services = booking?.serviceOfferings;

    if (!services || !Array.isArray(services) || services.length === 0) {
      return "No service information";
    }

    const names = services
      .map((service) => service?.name || service?.serviceName || service?.title)
      .filter(Boolean);

    if (names.length === 0) {
      return "Service information unavailable";
    }

    if (names.length === 1) {
      return names[0];
    }

    return `${names[0]} + ${names.length - 1} more`;
  };

  /* =========================================================
     STATUS STYLING
  ========================================================= */

  const getStatusClasses = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";

      case "COMPLETED":
        return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";

      case "PENDING":
        return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";

      case "CANCELLED":
      case "CANCELED":
        return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";

      case "REJECTED":
        return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";

      default:
        return "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200";
    }
  };

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading.fetchOwnerBookings && sortedBookings.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header skeleton */}

          <div className="animate-pulse">
            <div className="h-8 w-52 rounded-lg bg-slate-200" />

            <div className="mt-3 h-4 w-80 rounded bg-slate-200" />
          </div>

          {/* Table skeleton */}

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-12 bg-slate-100" />

            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="animate-pulse px-5 py-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="h-5 rounded bg-slate-200" />
                    <div className="h-5 rounded bg-slate-200" />
                    <div className="h-5 rounded bg-slate-200" />
                    <div className="h-5 rounded bg-slate-200" />
                    <div className="h-5 rounded bg-slate-200" />
                    <div className="h-5 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
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
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertCircle size={28} className="text-red-500" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              Unable to load bookings
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We couldn't retrieve the bookings for your salons right now.
              Please try again.
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
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CalendarX2 size={32} className="text-emerald-600" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              No bookings found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are currently no bookings associated with your salons.
            </p>
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
            PAGE HEADER
        =================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                <CalendarDays size={23} className="text-emerald-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  All Bookings
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View bookings made at your salons.
                </p>
              </div>
            </div>
          </div>

          {/* Booking count */}

          <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm sm:self-auto">
            <CalendarDays size={16} className="text-emerald-600" />

            <span>
              {sortedBookings.length}{" "}
              {sortedBookings.length === 1 ? "Booking" : "Bookings"}
            </span>
          </div>
        </div>

        {/* ===================================================
            REFRESHING INDICATOR
        =================================================== */}

        {loading.fetchOwnerBookings && sortedBookings.length > 0 && (
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
            <RefreshCw size={14} className="animate-spin" />
            Updating bookings...
          </div>
        )}

        {/* ===================================================
            BOOKING TABLE
        =================================================== */}

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* =================================================
              DESKTOP TABLE HEADER
          ================================================= */}

          <div className="hidden border-b border-slate-200 bg-slate-50 px-5 py-4 lg:grid lg:grid-cols-[1.5fr_1.4fr_1.5fr_1.2fr_1fr_0.8fr_32px] lg:items-center lg:gap-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Customer
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Salon
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Service
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Date
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Time
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </div>

            <div />
          </div>

          {/* =================================================
              BOOKING ROWS
          ================================================= */}

          <div className="divide-y divide-slate-100">
            {sortedBookings.map((booking) => {
              const bookingId = booking?.id;
              const status = booking?.status || "UNKNOWN";

              return (
                <button
                  key={bookingId}
                  type="button"
                  onClick={() => handleBookingClick(bookingId)}
                  className="group block w-full text-left transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                >
                  {/* =========================================
                      DESKTOP ROW
                  ========================================= */}

                  <div className="hidden min-h-[112px] px-5 py-5 lg:grid lg:grid-cols-[1.5fr_1.4fr_1.5fr_1.2fr_1fr_0.8fr_32px] lg:items-center lg:gap-4">
                    {/* Customer */}

                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                          <UserRound size={18} className="text-emerald-600" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {getCustomerName(booking)}
                          </p>

                          {booking?.userDto?.email && (
                            <p className="mt-1 truncate text-xs text-slate-400">
                              {booking.userDto.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Salon */}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Store size={17} className="shrink-0 text-slate-400" />

                        <span className="truncate text-sm font-medium text-slate-700">
                          {getSalonName(booking)}
                        </span>
                      </div>
                    </div>

                    {/* Service */}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Scissors
                          size={17}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="truncate text-sm text-slate-700">
                          {getServiceSummary(booking)}
                        </span>
                      </div>
                    </div>

                    {/* Date */}

                    <div>
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={16}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="text-sm text-slate-700">
                          {formatDate(booking?.startTime)}
                        </span>
                      </div>
                    </div>

                    {/* Time */}

                    <div>
                      <div className="flex items-center gap-2">
                        <Clock3 size={16} className="shrink-0 text-slate-400" />

                        <span className="text-sm text-slate-700">
                          {formatTime(booking?.startTime)}
                        </span>
                      </div>
                    </div>

                    {/* Status */}

                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          status,
                        )}`}
                      >
                        {status}
                      </span>
                    </div>

                    {/* Arrow */}

                    <div className="flex justify-end">
                      <ChevronRight
                        size={20}
                        className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600"
                      />
                    </div>
                  </div>

                  {/* =========================================
                      MOBILE / TABLET ROW

                      The same essential information is shown
                      in a more compact card-like row.
                  ========================================= */}

                  <div className="px-4 py-5 lg:hidden">
                    <div className="flex items-start justify-between gap-4">
                      {/* Customer */}

                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                          <UserRound size={18} className="text-emerald-600" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {getCustomerName(booking)}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            Booking #{bookingId}
                          </p>
                        </div>
                      </div>

                      {/* Status */}

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          status,
                        )}`}
                      >
                        {status}
                      </span>
                    </div>

                    {/* Booking information */}

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {/* Salon */}

                      <div className="flex items-center gap-2">
                        <Store size={16} className="shrink-0 text-slate-400" />

                        <span className="truncate text-sm text-slate-600">
                          {getSalonName(booking)}
                        </span>
                      </div>

                      {/* Service */}

                      <div className="flex items-center gap-2">
                        <Scissors
                          size={16}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="truncate text-sm text-slate-600">
                          {getServiceSummary(booking)}
                        </span>
                      </div>

                      {/* Date */}

                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={16}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="text-sm text-slate-600">
                          {formatDate(booking?.startTime)}
                        </span>
                      </div>

                      {/* Time */}

                      <div className="flex items-center gap-2">
                        <Clock3 size={16} className="shrink-0 text-slate-400" />

                        <span className="text-sm text-slate-600">
                          {formatTime(booking?.startTime)}
                        </span>
                      </div>
                    </div>

                    {/* View details */}

                    <div className="mt-4 flex items-center justify-end gap-1 text-xs font-semibold text-emerald-600">
                      View booking
                      <ChevronRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================
            FOOTER INFORMATION
        =================================================== */}

        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center text-xs text-slate-400 sm:flex-row">
          <Clock3 size={14} />

          <span>Select a booking to view complete booking information.</span>
        </div>
      </div>
    </div>
  );
}

export default AllBookings;
