import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  IndianRupee,
  Scissors,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/booking/auth/bookingThunk";

/*
 * Change this import path later according to your project structure.
 */
import useBookingBasePath from "../../hooks/useBookingBasePath";

/* =========================================================
   HELPERS
========================================================= */

/**
 * Converts "HH:mm" into minutes from midnight.
 *
 * Example:
 *
 * "10:30" -> 630
 */
const timeToMinutes = (time) => {
  if (!time) return null;

  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

/**
 * Converts minutes from midnight back into "HH:mm".
 *
 * Example:
 *
 * 630 -> "10:30"
 */
const minutesToTime = (minutes) => {
  if (minutes === null || Number.isNaN(minutes)) {
    return "";
  }

  /*
   * Keep the value inside a 24-hour range.
   */
  const normalizedMinutes = minutes % (24 * 60);

  const hours = Math.floor(normalizedMinutes / 60);
  const mins = normalizedMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

/**
 * Converts a Date object into YYYY-MM-DD.
 */
const formatDateForInput = (date) => {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Creates LocalDateTime expected by Spring.
 *
 * Example:
 *
 * 2026-08-10 + 10:30
 *
 * becomes:
 *
 * 2026-08-10T10:30:00
 */
const createLocalDateTime = (date, time) => {
  if (!date || !time) return null;

  return `${date}T${time}:00`;
};

/**
 * Formats minutes into human-readable duration.
 *
 * 30  -> "30 min"
 * 90  -> "1 hr 30 min"
 * 120 -> "2 hr"
 */
const formatDuration = (minutes) => {
  if (!minutes || minutes <= 0) {
    return "0 min";
  }

  const hours = Math.floor(minutes / 60);

  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
};

/* =========================================================
   PAGE
========================================================= */

function BookingDetailsPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  /*
   * =======================================================
   * BOOKING ROUTES
   * =======================================================
   *
   * All route/path decisions now come from this hook.
   */
  const  bookingBasePath = useBookingBasePath();

  /*
   * =======================================================
   * NAVIGATION STATE
   * =======================================================
   */

  const bookingState = location.state || {};

  const {
    salonId,
    categoryId,
    serviceIds: stateServiceIds = [],
    selectedServices: stateSelectedServices = [],
    totalPrice: stateTotalPrice = 0,
  } = bookingState;

  /*
   * =======================================================
   * REDUX
   * =======================================================
   */

  const { loading, error } = useSelector((state) => state.booking || {});

  /*
   * =======================================================
   * LOCAL STATE
   * =======================================================
   */

  const [bookingDate, setBookingDate] = useState(
    formatDateForInput(new Date()),
  );

  const [startTime, setStartTime] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

  /*
   * =======================================================
   * NORMALIZE SERVICE IDS
   * =======================================================
   */

  const serviceIds = useMemo(() => {
    return stateServiceIds
      .map((id) => Number(id))
      .filter((id) => !Number.isNaN(id));
  }, [stateServiceIds]);

  /*
   * =======================================================
   * CALCULATE TOTAL DURATION
   * =======================================================
   */

  const totalDuration = useMemo(() => {
    return stateSelectedServices.reduce((total, service) => {
      return total + Number(service?.duration || 0);
    }, 0);
  }, [stateSelectedServices]);

  /*
   * =======================================================
   * CALCULATE TOTAL PRICE
   * =======================================================
   */

  const totalPrice = useMemo(() => {
    /*
     * Prefer recalculating from selected services.
     *
     * This prevents the UI from depending only on
     * the value passed through navigation state.
     */

    if (stateSelectedServices.length > 0) {
      return stateSelectedServices.reduce((total, service) => {
        return total + Number(service?.price || 0);
      }, 0);
    }

    return Number(stateTotalPrice || 0);
  }, [stateSelectedServices, stateTotalPrice]);

  /*
   * =======================================================
   * AUTOMATIC END TIME
   * =======================================================
   */

  const endTime = useMemo(() => {
    if (!startTime || totalDuration <= 0) {
      return "";
    }

    const startMinutes = timeToMinutes(startTime);

    if (startMinutes === null) {
      return "";
    }

    return minutesToTime(startMinutes + totalDuration);
  }, [startTime, totalDuration]);

  /*
   * =======================================================
   * MINIMUM DATE
   * =======================================================
   */

  const minimumDate = useMemo(() => {
    return formatDateForInput(new Date());
  }, []);

  /*
   * =======================================================
   * INVALID NAVIGATION STATE
   * =======================================================
   */

  if (!salonId || !categoryId || serviceIds.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <CalendarDays size={30} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Invalid Booking Details
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Salon, category or selected service information is missing. Please
            select at least one service before proceeding.
          </p>

          <button
            type="button"
            onClick={() => {
              console.log("Navigating back to salons:", salons);
              return navigate(`${bookingBasePath}/booking/salons`);
            }}
            className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Back to salons
          </button>
        </div>
      </div>
    );
  }

  /*
   * =======================================================
   * BOOK APPOINTMENT
   * =======================================================
   */

  const handleBookAppointment = async () => {
    /*
     * -------------------------------------------------------
     * VALIDATION
     * -------------------------------------------------------
     */

    if (!bookingDate) {
      toast.error("Please select a booking date.");
      return;
    }

    if (!startTime) {
      toast.error("Please select a start time.");
      return;
    }

    if (!endTime) {
      toast.error("Unable to calculate the appointment end time.");
      return;
    }

    if (totalDuration <= 0) {
      toast.error("Selected services do not have a valid duration.");
      return;
    }

    if (serviceIds.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    /*
     * -------------------------------------------------------
     * BOOKING REQUEST
     * -------------------------------------------------------
     *
     * Matches backend BookingRequest:
     *
     * {
     *   salonId,
     *   categoryId,
     *   startTime,
     *   endTime,
     *   serviceIds
     * }
     */

    const bookingRequest = {
      salonId: Number(salonId),

      categoryId: Number(categoryId),

      startTime: createLocalDateTime(bookingDate, startTime),

      endTime: createLocalDateTime(bookingDate, endTime),

      serviceIds,
    };

    try {
      /*
       * -----------------------------------------------------
       * CREATE BOOKING
       * -----------------------------------------------------
       */

      const response = await dispatch(
        createBooking({
          bookingRequest,
          paymentMethod,
        }),
      ).unwrap();

      console.log("Create booking response:", response);

      /*
       * -----------------------------------------------------
       * PAYMENT LINK
       * -----------------------------------------------------
       *
       * Backend property is `urlLink`.
       *
       * Additional fallbacks are kept for compatibility.
       */

      const paymentLink =
        response?.urlLink ||
        response?.paymentLink ||
        response?.paymentUrl ||
        response?.url;

      /*
       * -----------------------------------------------------
       * PAYMENT LINK NOT FOUND
       * -----------------------------------------------------
       */

      if (!paymentLink) {
        console.error("Booking created but payment link missing:", response);

        toast.error("Appointment created, but payment link was not received.");

        return;
      }

      /*
       * -----------------------------------------------------
       * BOOKING + PAYMENT LINK SUCCESS
       * -----------------------------------------------------
       */

      toast.success("Appointment created. Redirecting to payment...");

      /*
       * -----------------------------------------------------
       * OPEN PAYMENT PAGE
       * -----------------------------------------------------
       */

      window.open(paymentLink, "_blank", "noopener,noreferrer");

      /*
       * -----------------------------------------------------
       * NAVIGATE CURRENT TAB
       * -----------------------------------------------------
       */

      // console.log("Navigating to payment page:", payment);
      // navigate(payment);
    } catch (err) {
      console.error("Create booking error:", err);

      toast.error(
        err?.message || err?.error || "Failed to create appointment.",
      );
    }
  };

  /*
   * =======================================================
   * BACK
   * =======================================================
   */

  const handleBack = () => {
    console.log("Navigating back to salon details : ", salonId);
    navigate(`${bookingBasePath}/booking/salons/${salonId}`);
  };

  /*
   * =======================================================
   * PAGE
   * =======================================================
   */

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ===================================================
          BACK
      =================================================== */}

      <button
        type="button"
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Salon
      </button>

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CalendarDays size={25} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Booking Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Select your appointment date and start time. The end time will be
              calculated automatically.
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* =================================================
            LEFT
        ================================================= */}

        <div className="space-y-6 lg:col-span-2">
          {/* ===============================================
              APPOINTMENT TIME
          =============================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Appointment Time
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose when you want your appointment to start.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* DATE */}

              <div>
                <label
                  htmlFor="bookingDate"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Appointment Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="bookingDate"
                    type="date"
                    min={minimumDate}
                    value={bookingDate}
                    onChange={(event) => setBookingDate(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* START TIME */}

              <div>
                <label
                  htmlFor="startTime"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Start Time
                </label>

                <div className="relative">
                  <Clock
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </div>

            {/* AUTOMATIC END TIME */}

            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Automatically calculated
                  </p>

                  <p className="mt-1 text-sm font-medium text-emerald-900">
                    Appointment End Time
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-700">
                    {endTime || "--:--"}
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    {formatDuration(totalDuration)}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-emerald-700">
                You cannot select the end time manually. It is automatically
                calculated from your selected services.
              </p>
            </div>
          </div>

          {/* ===============================================
              SELECTED SERVICES
          =============================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Selected Services
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Services included in this appointment.
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {stateSelectedServices.length}{" "}
                {stateSelectedServices.length === 1 ? "Service" : "Services"}
              </span>
            </div>

            <div className="space-y-3">
              {stateSelectedServices.map((service, index) => (
                <div
                  key={service?.id ?? service?.serviceId ?? index}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Scissors size={18} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {service?.name || "Unnamed Service"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {Number(service?.duration || 0)} min
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-slate-900">
                    ₹{Number(service?.price || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ===============================================
              PAYMENT METHOD
          =============================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Payment Method</h2>

            <p className="mt-1 text-sm text-slate-500">
              Select how you want to pay for this appointment.
            </p>

            <div className="mt-5">
              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                  paymentMethod === "RAZORPAY"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="RAZORPAY"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="h-4 w-4 accent-emerald-600"
                />

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <CreditCard size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Online Payment
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    You will be redirected to the payment page after booking.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT — BOOKING SUMMARY
        ================================================= */}

        <div>
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Booking Summary
            </h2>

            {/* DATE */}

            <div className="mt-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">Date</span>

                <span className="text-right text-sm font-semibold text-slate-900">
                  {bookingDate || "--"}
                </span>
              </div>

              {/* START */}

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">Start Time</span>

                <span className="text-sm font-semibold text-slate-900">
                  {startTime || "--:--"}
                </span>
              </div>

              {/* END */}

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">End Time</span>

                <span className="text-sm font-semibold text-emerald-700">
                  {endTime || "--:--"}
                </span>
              </div>

              {/* DURATION */}

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">Total Duration</span>

                <span className="text-sm font-semibold text-slate-900">
                  {formatDuration(totalDuration)}
                </span>
              </div>

              {/* SERVICE COUNT */}

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">Services</span>

                <span className="text-sm font-semibold text-slate-900">
                  {stateSelectedServices.length}
                </span>
              </div>
            </div>

            {/* DIVIDER */}

            <div className="my-5 border-t border-slate-200" />

            {/* TOTAL */}

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Total Amount</p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <IndianRupee size={20} />
              </div>
            </div>

            {/* SUCCESS INDICATOR */}

            {startTime && endTime && (
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-emerald-50 p-3">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-xs leading-5 text-emerald-700">
                  Your appointment will run from <strong>{startTime}</strong> to{" "}
                  <strong>{endTime}</strong>.
                </p>
              </div>
            )}

            {/* BOOK BUTTON */}

            <button
              type="button"
              disabled={
                loading?.create ||
                !bookingDate ||
                !startTime ||
                !endTime ||
                totalDuration <= 0
              }
              onClick={handleBookAppointment}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading?.create ? (
                "Creating Appointment..."
              ) : (
                <>
                  <CalendarDays size={18} />
                  Book Appointment
                </>
              )}
            </button>

            {/* ERROR */}

            {error && (
              <p className="mt-3 text-center text-xs leading-5 text-red-600">
                {error?.message ||
                  error?.error ||
                  "Unable to create appointment."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetailsPage;
