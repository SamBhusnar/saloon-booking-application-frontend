import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  Mail,
  User,
  Scissors,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock4,
  XCircle,
  AlertCircle,
  RefreshCw,
  Store,
  Timer,
  IndianRupee,
} from "lucide-react";

import { getBookingById } from "../../features/booking/auth/bookingThunk";

// Change this import path later to the correct location.
import useBookingBasePath from "../../hooks/useBookingBasePath";

function BookingInformationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Current location:", location.pathname);
  console.log("Current location.from :", location.state?.from);

  const { bookingId } = useParams();

  const bookingBasePath = useBookingBasePath();

  const { selectedBooking, loading, error } = useSelector(
    (state) => state.booking,
  );

  /* =========================================================
     FETCH BOOKING

     Backend:

     GET /booking/{bookingId}

     Backend already returns:

     BookingDto
       ├── booking information
       ├── UserDto
       ├── SalonDto
       └── Set<ServiceOfferingDto>

     Therefore this page does NOT need separate API calls
     for user, salon, or services.
     ========================================================= */

  useEffect(() => {
    if (!bookingId) {
      return;
    }

    dispatch(getBookingById(bookingId));
  }, [dispatch, bookingId]);

  /* =========================================================
     RETRY
     ========================================================= */

  const handleRetry = () => {
    if (!bookingId) {
      return;
    }

    dispatch(getBookingById(bookingId));
  };

  /* =========================================================
     BACK TO BOOKINGS
     ========================================================= */


  const handleBackToBookings = () => {
    const from = location.state?.from;
    if (from) {
      navigate(from); // Navigate back to the previous page
    }
    navigate(-1); // Go back to the previous page
  };

  /* =========================================================
     INVALID BOOKING ID
     ========================================================= */

  if (!bookingId) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertCircle size={28} className="text-red-500" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              Invalid booking
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The booking information could not be found because the booking ID
              is missing.
            </p>

            <button
              type="button"
              onClick={handleBackToBookings}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <ArrowLeft size={17} />
              Back to My Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     LOADING STATE
     ========================================================= */

  if (loading.fetchById && !selectedBooking) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Back button skeleton */}

          <div className="animate-pulse">
            <div className="h-5 w-36 rounded bg-slate-200" />

            {/* Header skeleton */}

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="h-48 bg-slate-200" />

              <div className="p-6">
                <div className="h-8 w-64 rounded bg-slate-200" />

                <div className="mt-3 h-4 w-80 rounded bg-slate-200" />
              </div>
            </div>

            {/* Content skeleton */}

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="h-64 rounded-3xl bg-slate-200 lg:col-span-2" />

              <div className="h-64 rounded-3xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR STATE
     ========================================================= */

  if (error && !selectedBooking) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertCircle size={28} className="text-red-500" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              Unable to load booking
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We couldn't retrieve this booking right now. Please try again.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <RefreshCw size={17} />
                Try Again
              </button>

              <button
                type="button"
                onClick={handleBackToBookings}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft size={17} />
                Back to Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     NO BOOKING
     ========================================================= */

  if (!selectedBooking) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <CalendarDays size={28} className="text-slate-500" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              Booking not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The requested booking could not be found.
            </p>

            <button
              type="button"
              onClick={handleBackToBookings}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <ArrowLeft size={17} />
              Back to My Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     BOOKING DATA
     ========================================================= */

  const {
    id,
    salonId,
    customerId,
    startTime,
    endTime,
    status,
    totalPrice,
    serviceOfferings = [],
    userDto,
    salonDto,
  } = selectedBooking;

  /* =========================================================
     FORMAT DATE / TIME
     ========================================================= */

  const startDate = startTime ? new Date(startTime) : null;

  const endDate = endTime ? new Date(endTime) : null;

  const formattedDate = startDate
    ? startDate.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  const formattedStartTime = startDate
    ? startDate.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "N/A";

  const formattedEndTime = endDate
    ? endDate.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "N/A";

  /* =========================================================
     BOOKING STATUS
     ========================================================= */

  const normalizedStatus = String(status || "PENDING").toUpperCase();

  const getStatusConfig = () => {
    switch (normalizedStatus) {
      case "CONFIRMED":
        return {
          label: "Confirmed",
          icon: CheckCircle2,
          className: "bg-emerald-100 text-emerald-700 border-emerald-200",
          iconClassName: "text-emerald-600",
        };

      case "PENDING":
        return {
          label: "Pending",
          icon: Clock4,
          className: "bg-amber-100 text-amber-700 border-amber-200",
          iconClassName: "text-amber-600",
        };

      case "CANCELLED":
      case "CANCELED":
        return {
          label: "Cancelled",
          icon: XCircle,
          className: "bg-red-100 text-red-700 border-red-200",
          iconClassName: "text-red-600",
        };

      default:
        return {
          label: normalizedStatus,
          icon: Clock4,
          className: "bg-slate-100 text-slate-700 border-slate-200",
          iconClassName: "text-slate-500",
        };
    }
  };

  const statusConfig = getStatusConfig();

  const StatusIcon = statusConfig.icon;

  /* =========================================================
     TOTAL SERVICE DURATION
     ========================================================= */

  const totalDuration = serviceOfferings.reduce(
    (total, service) => total + Number(service?.duration || 0),
    0,
  );

  /* =========================================================
     IMAGE

     SalonDto.images is:

     Map<String, String>

     Convert it into an array and use the first
     available image.
     ========================================================= */

  const salonImages =
    salonDto?.images && typeof salonDto.images === "object"
      ? Object.values(salonDto.images).filter(Boolean)
      : [];

  const salonImage = salonImages[0] || null;

  /* =========================================================
     PAGE
     ========================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ===================================================
            BACK NAVIGATION
        =================================================== */}

        <Link
          to={`${location.state?.from || `${bookingBasePath}/bookings/all`}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
        >
          <ArrowLeft size={17} />
          Back to My Bookings
        </Link>

        {/* ===================================================
            MAIN HEADER
        =================================================== */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Salon image / header */}

          <div className="relative h-52 bg-slate-100 sm:h-64">
            {salonImage ? (
              <img
                src={salonImage}
                alt={salonDto?.name || "Salon"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Store size={55} className="text-slate-300" />
              </div>
            )}

            {/* Image overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Booking status */}

            <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm ${statusConfig.className}`}
              >
                <StatusIcon size={17} className={statusConfig.iconClassName} />

                {statusConfig.label}
              </div>
            </div>

            {/* Salon name */}

            <div className="absolute bottom-5 left-5 text-white sm:bottom-7 sm:left-7">
              <p className="text-sm font-medium text-white/80">Salon</p>

              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                {salonDto?.name || "Salon"}
              </h1>
            </div>
          </div>

          {/* Header information */}

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 sm:p-7">
            {/* Date */}

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <CalendarDays size={19} className="text-emerald-600" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Appointment
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Time */}

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Clock3 size={19} className="text-blue-600" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Time
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {formattedStartTime} - {formattedEndTime}
                </p>
              </div>
            </div>

            {/* Total */}

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                <IndianRupee size={19} className="text-amber-600" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total Amount
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  ₹{Number(totalPrice || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-6 lg:col-span-2">
            {/* =================================================
                SERVICES
            ================================================= */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <Scissors size={19} className="text-emerald-600" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">Services</h2>

                    <p className="text-xs text-slate-400">
                      {serviceOfferings.length}{" "}
                      {serviceOfferings.length === 1 ? "service" : "services"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 divide-y divide-slate-100">
                {serviceOfferings.length > 0 ? (
                  serviceOfferings.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        {/* Service image */}

                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          {service.image ? (
                            <img
                              src={service.image}
                              alt={service.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Scissors size={20} className="text-slate-300" />
                            </div>
                          )}
                        </div>

                        {/* Service details */}

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-slate-900">
                            {service.name || "Unnamed service"}
                          </h3>

                          {service.description && (
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                              {service.description}
                            </p>
                          )}

                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1">
                              <Timer size={13} />
                              {service.duration || 0} min
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Service price */}

                      <div className="shrink-0 text-left sm:text-right">
                        <p className="text-base font-bold text-slate-900">
                          ₹{Number(service.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-sm text-slate-400">
                    No service information available.
                  </div>
                )}
              </div>

              {/* Service total */}

              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Total service duration</span>

                  <span className="font-semibold text-slate-800">
                    {totalDuration} min
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Total</span>

                  <span className="text-lg font-bold text-emerald-600">
                    ₹{Number(totalPrice || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </section>

            {/* =================================================
                APPOINTMENT INFORMATION
            ================================================= */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <CalendarDays size={19} className="text-blue-600" />
                </div>

                <h2 className="font-bold text-slate-900">
                  Appointment Information
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Booking ID */}

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Booking ID
                  </p>

                  <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                    #{id}
                  </p>
                </div>

                {/* Salon ID */}

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Salon ID
                  </p>

                  <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                    #{salonId}
                  </p>
                </div>

                {/* Customer ID */}

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Customer ID
                  </p>

                  <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                    #{customerId}
                  </p>
                </div>

                {/* Duration */}

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Appointment Duration
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {startDate && endDate
                      ? Math.max(
                          0,
                          Math.round(
                            (endDate.getTime() - startDate.getTime()) / 60000,
                          ),
                        )
                      : totalDuration}{" "}
                    minutes
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="space-y-6">
            {/* =================================================
                SALON INFORMATION
            ================================================= */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <Store size={19} className="text-emerald-600" />
                </div>

                <h2 className="font-bold text-slate-900">Salon Information</h2>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-bold text-slate-900">
                  {salonDto?.name || "Salon"}
                </h3>

                {/* Address */}

                <div className="mt-4 flex items-start gap-3">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {salonDto?.city || "City not available"}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {salonDto?.address || "Address not available"}
                    </p>
                  </div>
                </div>

                {/* Phone */}

                {salonDto?.phoneNumber && (
                  <div className="mt-4 flex items-center gap-3">
                    <Phone size={17} className="shrink-0 text-emerald-600" />

                    <span className="truncate text-sm text-slate-600">
                      {salonDto.phoneNumber}
                    </span>
                  </div>
                )}

                {/* Email */}

                {salonDto?.email && (
                  <div className="mt-4 flex items-center gap-3">
                    <Mail size={17} className="shrink-0 text-emerald-600" />

                    <span className="truncate text-sm text-slate-600">
                      {salonDto.email}
                    </span>
                  </div>
                )}

                {/* Opening hours */}

                {(salonDto?.openTime || salonDto?.closeTime) && (
                  <div className="mt-4 flex items-center gap-3">
                    <Clock3 size={17} className="shrink-0 text-emerald-600" />

                    <span className="text-sm text-slate-600">
                      {salonDto?.openTime || "N/A"} -{" "}
                      {salonDto?.closeTime || "N/A"}
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* =================================================
                CUSTOMER INFORMATION
            ================================================= */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                  <User size={19} className="text-purple-600" />
                </div>

                <h2 className="font-bold text-slate-900">
                  Customer Information
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                {/* Name */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {userDto?.fullName || "Name not available"}
                  </p>
                </div>

                {/* Email */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-slate-600">
                    {userDto?.email || "Email not available"}
                  </p>
                </div>

                {/* Phone */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {userDto?.phone || "Phone not available"}
                  </p>
                </div>

                {/* Role */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Account Role
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {userDto?.role || "Not available"}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                PAYMENT / VERIFICATION
            ================================================= */}

            <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <h2 className="text-sm font-bold text-blue-900">
                    Booking verification
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Booking status is updated automatically after the payment
                    verification process completes.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ===================================================
            BOTTOM NAVIGATION 
        =================================================== */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            to={`${location.state?.from || `${bookingBasePath}/bookings/all`}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Back to My Bookings
          </Link>

          <div className="inline-flex items-center justify-center gap-2 text-xs text-slate-400">
            <CreditCard size={15} />

            <span>Booking ID #{id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingInformationPage;
