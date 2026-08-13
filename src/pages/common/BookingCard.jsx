import React from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Clock4,
  XCircle,
  AlertCircle,
  Scissors,
  IndianRupee,
} from "lucide-react";

/* =========================================================
   BOOKING CARD

   Purpose:
   ---------------------------------------------------------
   Displays only the essential information of a booking.

   Detailed information is intentionally NOT displayed here.

   Clicking the card is handled by BookingListPage.

   Expected booking structure:

   {
     id,
     salonId,
     customerId,
     startTime,
     endTime,
     status,
     totalPrice,
     serviceOfferings: [],
     salonDto: {
       id,
       name,
       city,
       address,
       ...
     }
   }
========================================================= */

function BookingCard({ booking }) {
  /* =======================================================
     INVALID BOOKING
  ======================================================= */

  if (!booking) {
    return null;
  }

  /* =======================================================
     BASIC BOOKING DATA
  ======================================================= */

  const bookingId = booking?.id;

  const status = booking?.status || "PENDING";

  const totalPrice = Number(booking?.totalPrice ?? 0);

  const salonName = booking?.salonDto?.name || "Salon not available";

  const city = booking?.salonDto?.city || "City not available";

  const address = booking?.salonDto?.address || "Address not available";

  /* =======================================================
     SERVICES
  ======================================================= */

  const services = Array.isArray(booking?.serviceOfferings)
    ? booking.serviceOfferings
    : [];

  /* =======================================================
     DATE / TIME

     Backend sends LocalDateTime.

     Example:
     2026-08-10T14:30:00
  ======================================================= */

  const startDate = booking?.startTime ? new Date(booking.startTime) : null;

  const endDate = booking?.endTime ? new Date(booking.endTime) : null;

  const isValidStartDate = startDate && !Number.isNaN(startDate.getTime());

  const isValidEndDate = endDate && !Number.isNaN(endDate.getTime());

  const formattedDate = isValidStartDate
    ? startDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date not available";

  const formattedStartTime = isValidStartDate
    ? startDate.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "N/A";

  const formattedEndTime = isValidEndDate
    ? endDate.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "N/A";

  /* =======================================================
     STATUS CONFIGURATION
  ======================================================= */

  const statusConfig = {
    CONFIRMED: {
      label: "Confirmed",
      icon: CheckCircle2,
      className: "bg-emerald-100 text-emerald-700",
      iconClassName: "text-emerald-600",
    },

    PENDING: {
      label: "Pending",
      icon: Clock4,
      className: "bg-amber-100 text-amber-700",
      iconClassName: "text-amber-600",
    },

    CANCELLED: {
      label: "Cancelled",
      icon: XCircle,
      className: "bg-red-100 text-red-700",
      iconClassName: "text-red-600",
    },

    COMPLETED: {
      label: "Completed",
      icon: CheckCircle2,
      className: "bg-blue-100 text-blue-700",
      iconClassName: "text-blue-600",
    },

    FAILED: {
      label: "Failed",
      icon: AlertCircle,
      className: "bg-red-100 text-red-700",
      iconClassName: "text-red-600",
    },
  };

  const currentStatus = statusConfig[status] || {
    label: status,
    icon: AlertCircle,
    className: "bg-slate-100 text-slate-700",
    iconClassName: "text-slate-500",
  };

  const StatusIcon = currentStatus.icon;

  /* =======================================================
     SERVICES SUMMARY

     Show a maximum of 3 services on the card.

     The complete list belongs to BookingInformationPage.
  ======================================================= */

  const visibleServices = services.slice(0, 3);

  const remainingServices = Math.max(
    services.length - visibleServices.length,
    0,
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-emerald-200
        hover:shadow-lg
      "
    >
      {/* ===================================================
          TOP SECTION
      =================================================== */}

      <div className="border-b border-slate-100 p-5">
        {/* Salon + Status */}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                <Scissors size={18} className="text-emerald-600" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-slate-900">
                  {salonName}
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Booking #{bookingId ?? "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}

          <div
            className={`
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              px-2.5
              py-1
              text-xs
              font-semibold
              ${currentStatus.className}
            `}
          >
            <StatusIcon size={13} className={currentStatus.iconClassName} />

            {currentStatus.label}
          </div>
        </div>
      </div>

      {/* ===================================================
          BOOKING INFORMATION
      =================================================== */}

      <div className="flex flex-1 flex-col p-5">
        {/* =================================================
            DATE & TIME
        ================================================= */}

        <div className="rounded-xl bg-slate-50 p-4">
          {/* Date */}

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <CalendarDays size={18} className="text-emerald-600" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Appointment
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-800">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Time */}

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <Clock3 size={18} className="text-emerald-600" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Time
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-800">
                {formattedStartTime} - {formattedEndTime}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            LOCATION
        ================================================= */}

        <div className="mt-5 flex items-start gap-3">
          <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-600" />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800">{city}</p>

            <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">
              {address}
            </p>
          </div>
        </div>

        {/* =================================================
            SERVICES
        ================================================= */}

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Services
            </p>

            <span className="text-xs text-slate-400">
              {services.length} {services.length === 1 ? "service" : "services"}
            </span>
          </div>

          {services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {visibleServices.map((service) => (
                <span
                  key={service?.id}
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-2.5
                    py-1.5
                    text-xs
                    font-medium
                    text-slate-600
                  "
                >
                  <span className="truncate">
                    {service?.name || "Unnamed service"}
                  </span>
                </span>
              ))}

              {remainingServices > 0 && (
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-lg
                    bg-slate-100
                    px-2.5
                    py-1.5
                    text-xs
                    font-semibold
                    text-slate-500
                  "
                >
                  +{remainingServices} more
                </span>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400">
              No service information available.
            </p>
          )}
        </div>

        {/* =================================================
            PRICE + DETAILS
        ================================================= */}

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-slate-100 pt-5">
            {/* Total */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total
              </p>

              <div className="mt-1 flex items-center gap-0.5">
                <IndianRupee size={17} className="text-slate-700" />

                <span className="text-lg font-bold text-slate-900">
                  {totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Details indicator */}

            <div
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-xs
                font-semibold
                text-slate-600
                transition
                group-hover:border-emerald-200
                group-hover:bg-emerald-50
                group-hover:text-emerald-700
              "
            >
              View details
              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BookingCard;
