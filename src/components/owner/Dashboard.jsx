import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Loader2,
  RefreshCw,
  Store,
  TrendingUp,
  Users,
  XCircle,
  CheckCircle2,
  Search,
} from "lucide-react";

import {
  getBookingChart,
  getBookingChartByDate,
  getBookingChartByDateRange,
  getEarningChart,
  getEarningChartByDate,
  getEarningChartByDateRange,
  getAllBookingReport,
} from "../../features/booking/auth/bookingThunk";

import { getOwnerSalons } from "../../features/redux/salonThunk";

/* =========================================================
   HELPERS
========================================================= */

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getYesterday = () => {
  const date = new Date();

  date.setDate(date.getDate() - 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return value;
  }

  return number.toLocaleString("en-IN");
};

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") {
    return "₹0";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return `₹${value}`;
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SalonSelector({ salons, value, onChange }) {
  return (
    <div className="relative w-full sm:w-64">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          w-full appearance-none rounded-xl
          border border-slate-200
          bg-white
          px-4 py-3 pr-10
          text-sm font-medium text-slate-700
          outline-none
          transition
          focus:border-emerald-500
          focus:ring-2
          focus:ring-emerald-100
        "
      >
        <option value="">Select salon</option>

        {salons.map((salon) => (
          <option key={salon.id} value={salon.id}>
            {salon.name}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="
          pointer-events-none
          absolute right-3 top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />
    </div>
  );
}

/* =========================================================
   BOOKING RESULT
========================================================= */

function BookingResult({ data, loading }) {
  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <div className="text-center">
          <Loader2
            size={30}
            className="mx-auto animate-spin text-emerald-600"
          />

          <p className="mt-3 text-sm text-slate-500">Loading booking data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <div className="text-center">
          <CalendarDays size={36} className="mx-auto text-slate-300" />

          <p className="mt-3 text-sm text-slate-400">
            Select a salon to view booking data.
          </p>
        </div>
      </div>
    );
  }

  const pending = Number(data.pendingBookings || 0);
  const confirmed = Number(data.confirmedBookings || 0);

  const total = pending + confirmed;

  const pendingPercentage = total > 0 ? (pending / total) * 100 : 0;

  const confirmedPercentage = total > 0 ? (confirmed / total) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Period
          </p>

          <p className="text-lg font-bold text-slate-900">{data.period}</p>
        </div>

        <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
          {data.salonName}
        </div>
      </div>

      {/* TOTAL */}

      <div className="rounded-2xl bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Total Bookings
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900">
          {formatNumber(total)}
        </p>
      </div>

      {/* STATUS BARS */}

      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />

              <span className="text-sm font-medium text-slate-600">
                Pending
              </span>
            </div>

            <span className="text-sm font-bold text-slate-800">
              {formatNumber(pending)}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-500"
              style={{
                width: `${pendingPercentage}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

              <span className="text-sm font-medium text-slate-600">
                Confirmed
              </span>
            </div>

            <span className="text-sm font-bold text-slate-800">
              {formatNumber(confirmed)}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{
                width: `${confirmedPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
          <p className="text-xs font-medium text-amber-700">Pending</p>

          <p className="mt-1 text-xl font-bold text-amber-900">
            {formatNumber(pending)}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-xs font-medium text-emerald-700">Confirmed</p>

          <p className="mt-1 text-xl font-bold text-emerald-900">
            {formatNumber(confirmed)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EARNING RESULT
========================================================= */

function EarningResult({ data, loading }) {
  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <div className="text-center">
          <Loader2
            size={30}
            className="mx-auto animate-spin text-emerald-600"
          />

          <p className="mt-3 text-sm text-slate-500">Loading earning data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <div className="text-center">
          <CircleDollarSign size={36} className="mx-auto text-slate-300" />

          <p className="mt-3 text-sm text-slate-400">
            Select a salon to view earning data.
          </p>
        </div>
      </div>
    );
  }

  const pending = Number(data.pendingEarning || 0);
  const confirmed = Number(data.confirmedEarning || 0);

  const total = pending + confirmed;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Period
          </p>

          <p className="text-lg font-bold text-slate-900">{data.period}</p>
        </div>

        <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
          {data.salonName}
        </div>
      </div>

      {/* TOTAL EARNING */}

      <div className="rounded-2xl bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Total Earnings
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900">
          {formatCurrency(total)}
        </p>
      </div>

      {/* EARNING BREAKDOWN */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-amber-700">
              Pending Earnings
            </p>

            <Clock3 size={19} className="text-amber-600" />
          </div>

          <p className="mt-3 text-2xl font-bold text-amber-900">
            {formatCurrency(pending)}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-emerald-700">
              Confirmed Earnings
            </p>

            <CheckCircle2 size={19} className="text-emerald-600" />
          </div>

          <p className="mt-3 text-2xl font-bold text-emerald-900">
            {formatCurrency(confirmed)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

function Dashboard() {
  const dispatch = useDispatch();

  /* =======================================================
     SALON STATE
  ======================================================= */

  const salonState = useSelector((state) => state.salon);

  const salons = salonState?.mySalons || salonState?.ownerSalons || [];

  /* =======================================================
     BOOKING STATE
  ======================================================= */

  const { bookingChart, earningChart, allBookingReport, loading, error } =
    useSelector((state) => state.booking);

  /* =======================================================
     LOCAL CHART DATA
     
     IMPORTANT:
     
     Redux has only:
     
     bookingChart
     earningChart
     
     But dashboard has six independent charts.
     
     Therefore each card keeps its own latest result
     locally.
  ======================================================= */

  const [todayBooking, setTodayBooking] = useState(null);

  const [customBooking, setCustomBooking] = useState(null);

  const [rangeBooking, setRangeBooking] = useState(null);

  const [todayEarning, setTodayEarning] = useState(null);

  const [customEarning, setCustomEarning] = useState(null);

  const [rangeEarning, setRangeEarning] = useState(null);

  /* =======================================================
     SALON SELECTIONS
     
     Every chart has its OWN salon selector.
  ======================================================= */

  const [todayBookingSalon, setTodayBookingSalon] = useState("");

  const [customBookingSalon, setCustomBookingSalon] = useState("");

  const [rangeBookingSalon, setRangeBookingSalon] = useState("");

  const [todayEarningSalon, setTodayEarningSalon] = useState("");

  const [customEarningSalon, setCustomEarningSalon] = useState("");

  const [rangeEarningSalon, setRangeEarningSalon] = useState("");

  /* =======================================================
     DATES
  ======================================================= */

  const [customBookingDate, setCustomBookingDate] = useState(getYesterday());

  const [rangeBookingStartDate, setRangeBookingStartDate] = useState("");

  const [rangeBookingEndDate, setRangeBookingEndDate] = useState("");

  const [customEarningDate, setCustomEarningDate] = useState(getYesterday());

  const [rangeEarningStartDate, setRangeEarningStartDate] = useState("");

  const [rangeEarningEndDate, setRangeEarningEndDate] = useState("");

  /* =======================================================
     LOAD OWNER SALONS
  ======================================================= */

  useEffect(() => {
    dispatch(getOwnerSalons());
  }, [dispatch]);

  /* =======================================================
     LOAD ALL SALON REPORT
  ======================================================= */

  useEffect(() => {
    dispatch(getAllBookingReport());
  }, [dispatch]);

  /* =======================================================
     SALON DROPDOWN DEFAULT
     
     We do NOT automatically make chart requests.
     
     User must select salon.
  ======================================================= */

  /* =======================================================
     ALL REPORT VALUES
  ======================================================= */

  const report = allBookingReport || {};

  const totalBookings = report["total bookings"] ?? 0;

  const cancelledBookings = report["cancelled bookings"] ?? 0;

  const totalEarnings = report["total earnings"] ?? 0;

  const totalRefundAmount = report["total refund amount"] ?? 0;

  /* =======================================================
     RANGE VALIDATION
  ======================================================= */

  const isBookingRangeValid =
    rangeBookingSalon &&
    rangeBookingStartDate &&
    rangeBookingEndDate &&
    rangeBookingStartDate <= rangeBookingEndDate;

  const isEarningRangeValid =
    rangeEarningSalon &&
    rangeEarningStartDate &&
    rangeEarningEndDate &&
    rangeEarningStartDate <= rangeEarningEndDate;

  /* =======================================================
     TODAY BOOKING
     
     Required:
     salon only
  ======================================================= */

  const handleTodayBooking = async (salonId) => {
    setTodayBookingSalon(salonId);

    if (!salonId) {
      setTodayBooking(null);

      return;
    }

    try {
      const result = await dispatch(getBookingChart(Number(salonId))).unwrap();

      setTodayBooking(result);
    } catch (err) {
      setTodayBooking(null);
    }
  };

  /* =======================================================
     CUSTOM BOOKING
     
     Required:
     salon + date
  ======================================================= */

  const handleCustomBookingSalon = async (salonId) => {
    setCustomBookingSalon(salonId);

    if (!salonId || !customBookingDate) {
      setCustomBooking(null);

      return;
    }

    try {
      const result = await dispatch(
        getBookingChartByDate({
          salonId: Number(salonId),
          date: customBookingDate,
        }),
      ).unwrap();

      setCustomBooking(result);
    } catch (err) {
      setCustomBooking(null);
    }
  };

  const handleCustomBookingDate = async (date) => {
    setCustomBookingDate(date);

    if (!customBookingSalon || !date) {
      setCustomBooking(null);

      return;
    }

    try {
      const result = await dispatch(
        getBookingChartByDate({
          salonId: Number(customBookingSalon),
          date,
        }),
      ).unwrap();

      setCustomBooking(result);
    } catch (err) {
      setCustomBooking(null);
    }
  };

  /* =======================================================
     RANGE BOOKING
     
     Required:
     salon + start date + end date
  ======================================================= */

  const handleBookingRangeSearch = async () => {
    if (!isBookingRangeValid) {
      return;
    }

    try {
      const result = await dispatch(
        getBookingChartByDateRange({
          salonId: Number(rangeBookingSalon),
          startDate: rangeBookingStartDate,
          endDate: rangeBookingEndDate,
        }),
      ).unwrap();

      setRangeBooking(result);
    } catch (err) {
      setRangeBooking(null);
    }
  };

  /* =======================================================
     TODAY EARNING
  ======================================================= */

  const handleTodayEarning = async (salonId) => {
    setTodayEarningSalon(salonId);

    if (!salonId) {
      setTodayEarning(null);

      return;
    }

    try {
      const result = await dispatch(getEarningChart(Number(salonId))).unwrap();

      setTodayEarning(result);
    } catch (err) {
      setTodayEarning(null);
    }
  };

  /* =======================================================
     CUSTOM EARNING
  ======================================================= */

  const handleCustomEarningSalon = async (salonId) => {
    setCustomEarningSalon(salonId);

    if (!salonId || !customEarningDate) {
      setCustomEarning(null);

      return;
    }

    try {
      const result = await dispatch(
        getEarningChartByDate({
          salonId: Number(salonId),
          date: customEarningDate,
        }),
      ).unwrap();

      setCustomEarning(result);
    } catch (err) {
      setCustomEarning(null);
    }
  };

  const handleCustomEarningDate = async (date) => {
    setCustomEarningDate(date);

    if (!customEarningSalon || !date) {
      setCustomEarning(null);

      return;
    }

    try {
      const result = await dispatch(
        getEarningChartByDate({
          salonId: Number(customEarningSalon),
          date,
        }),
      ).unwrap();

      setCustomEarning(result);
    } catch (err) {
      setCustomEarning(null);
    }
  };

  /* =======================================================
     RANGE EARNING
  ======================================================= */

  const handleEarningRangeSearch = async () => {
    if (!isEarningRangeValid) {
      return;
    }

    try {
      const result = await dispatch(
        getEarningChartByDateRange({
          salonId: Number(rangeEarningSalon),
          startDate: rangeEarningStartDate,
          endDate: rangeEarningEndDate,
        }),
      ).unwrap();

      setRangeEarning(result);
    } catch (err) {
      setRangeEarning(null);
    }
  };

  /* =======================================================
     REPORT LOADING
  ======================================================= */

  const reportLoading = loading?.fetchAllReport;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-emerald-100
              text-emerald-600
            "
            >
              <TrendingUp size={25} />
            </div>

            <div>
              <h1
                className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
              "
              >
                Dashboard
              </h1>

              <p
                className="
                mt-1
                text-sm
                text-slate-500
              "
              >
                Overview of your salons, bookings and earnings.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            TOP SUMMARY
        ================================================= */}

        <section className="mb-12">
          <div
            className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            xl:grid-cols-4
          "
          >
            {/* TOTAL BOOKINGS */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                  >
                    Total Bookings
                  </p>

                  <p
                    className="
                    mt-2
                    text-3xl
                    font-bold
                    text-slate-900
                  "
                  >
                    {reportLoading ? "..." : formatNumber(totalBookings)}
                  </p>
                </div>

                <div
                  className="
                  rounded-xl
                  bg-blue-50
                  p-3
                  text-blue-600
                "
                >
                  <CalendarDays size={22} />
                </div>
              </div>

              <p
                className="
                mt-4
                text-xs
                text-slate-400
              "
              >
                Across all your salons
              </p>
            </div>

            {/* CANCELLED */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                  >
                    Cancelled Bookings
                  </p>

                  <p
                    className="
                    mt-2
                    text-3xl
                    font-bold
                    text-slate-900
                  "
                  >
                    {reportLoading ? "..." : formatNumber(cancelledBookings)}
                  </p>
                </div>

                <div
                  className="
                  rounded-xl
                  bg-red-50
                  p-3
                  text-red-600
                "
                >
                  <XCircle size={22} />
                </div>
              </div>

              <p
                className="
                mt-4
                text-xs
                text-slate-400
              "
              >
                Cancelled across all salons
              </p>
            </div>

            {/* REFUNDS */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                  >
                    Total Refunded
                  </p>

                  <p
                    className="
                    mt-2
                    text-3xl
                    font-bold
                    text-slate-900
                  "
                  >
                    {reportLoading ? "..." : formatCurrency(totalRefundAmount)}
                  </p>
                </div>

                <div
                  className="
                  rounded-xl
                  bg-orange-50
                  p-3
                  text-orange-600
                "
                >
                  <RefreshCw size={22} />
                </div>
              </div>

              <p
                className="
                mt-4
                text-xs
                text-slate-400
              "
              >
                Total refund amount
              </p>
            </div>

            {/* EARNINGS */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                  >
                    Total Earnings
                  </p>

                  <p
                    className="
                    mt-2
                    text-3xl
                    font-bold
                    text-slate-900
                  "
                  >
                    {reportLoading ? "..." : formatCurrency(totalEarnings)}
                  </p>
                </div>

                <div
                  className="
                  rounded-xl
                  bg-emerald-50
                  p-3
                  text-emerald-600
                "
                >
                  <CircleDollarSign size={22} />
                </div>
              </div>

              <p
                className="
                mt-4
                text-xs
                text-slate-400
              "
              >
                Total earnings across all salons
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            BOOKING ANALYTICS
        ================================================= */}

        <section>
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <CalendarDays size={24} className="text-emerald-600" />

              <div>
                <h2
                  className="
                  text-2xl
                  font-bold
                  text-slate-900
                "
                >
                  Booking Analytics
                </h2>

                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                "
                >
                  Analyze pending and confirmed bookings.
                </p>
              </div>
            </div>
          </div>

          <div
            className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-3
          "
          >
            {/* =================================================
                TODAY BOOKING
            ================================================= */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="mb-5">
                <h3
                  className="
                  text-lg
                  font-bold
                  text-slate-900
                "
                >
                  Today's Bookings
                </h3>

                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                "
                >
                  Current day booking overview.
                </p>
              </div>

              <SalonSelector
                salons={salons}
                value={todayBookingSalon}
                onChange={handleTodayBooking}
              />

              <div className="mt-6">
                <BookingResult
                  data={todayBooking}
                  loading={loading?.fetchBookingChart}
                />
              </div>
            </div>

            {/* =================================================
                CUSTOM DAY BOOKING
            ================================================= */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="mb-5">
                <h3
                  className="
                  text-lg
                  font-bold
                  text-slate-900
                "
                >
                  Custom Day
                </h3>

                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                "
                >
                  View bookings for a specific day.
                </p>
              </div>

              <div className="space-y-3">
                <SalonSelector
                  salons={salons}
                  value={customBookingSalon}
                  onChange={handleCustomBookingSalon}
                />

                <input
                  type="date"
                  value={customBookingDate}
                  onChange={(event) =>
                    handleCustomBookingDate(event.target.value)
                  }
                  className="
                    w-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    px-4 py-3
                    text-sm
                    font-medium
                    text-slate-700
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100
                  "
                />
              </div>

              <div className="mt-6">
                <BookingResult
                  data={customBooking}
                  loading={loading?.fetchBookingChart}
                />
              </div>
            </div>

            {/* =================================================
                RANGE BOOKING
            ================================================= */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="mb-5">
                <h3
                  className="
                  text-lg
                  font-bold
                  text-slate-900
                "
                >
                  Date Range
                </h3>

                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                "
                >
                  Analyze bookings across a period.
                </p>
              </div>

              <div className="space-y-3">
                <SalonSelector
                  salons={salons}
                  value={rangeBookingSalon}
                  onChange={(value) => {
                    setRangeBookingSalon(value);

                    if (!value) {
                      setRangeBooking(null);
                    }
                  }}
                />

                <input
                  type="date"
                  value={rangeBookingStartDate}
                  onChange={(event) => {
                    setRangeBookingStartDate(event.target.value);

                    setRangeBooking(null);
                  }}
                  className="
                    w-full
                    rounded-xl
                    border border-slate-200
                    px-4 py-3
                    text-sm
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100
                  "
                />

                <input
                  type="date"
                  value={rangeBookingEndDate}
                  min={rangeBookingStartDate || undefined}
                  onChange={(event) => {
                    setRangeBookingEndDate(event.target.value);

                    setRangeBooking(null);
                  }}
                  className="
                    w-full
                    rounded-xl
                    border border-slate-200
                    px-4 py-3
                    text-sm
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100
                  "
                />

                <button
                  type="button"
                  disabled={!isBookingRangeValid}
                  onClick={handleBookingRangeSearch}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-emerald-600
                    px-4 py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-emerald-700
                    disabled:cursor-not-allowed
                    disabled:bg-slate-200
                    disabled:text-slate-400
                  "
                >
                  <Search size={17} />
                  View Booking Report
                </button>
              </div>

              <div className="mt-6">
                <BookingResult
                  data={rangeBooking}
                  loading={loading?.fetchBookingChart}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            EARNING ANALYTICS
        ================================================= */}

        <section className="mt-14">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <CircleDollarSign size={24} className="text-emerald-600" />

              <div>
                <h2
                  className="
                  text-2xl
                  font-bold
                  text-slate-900
                "
                >
                  Earning Analytics
                </h2>

                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                "
                >
                  Analyze pending and confirmed earnings.
                </p>
              </div>
            </div>
          </div>

          <div
            className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-3
          "
          >
            {/* =================================================
                TODAY EARNING
            ================================================= */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="mb-5">
                <h3
                  className="
                  text-lg
                  font-bold
                  text-slate-900
                "
                >
                  Today's Earnings
                </h3>

                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                "
                >
                  Current day earning overview.
                </p>
              </div>

              <SalonSelector
                salons={salons}
                value={todayEarningSalon}
                onChange={handleTodayEarning}
              />

              <div className="mt-6">
                <EarningResult
                  data={todayEarning}
                  loading={loading?.fetchEarningChart}
                />
              </div>
            </div>

            {/* =================================================
                CUSTOM DAY EARNING
            ================================================= */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="mb-5">
                <h3
                  className="
                  text-lg
                  font-bold
                  text-slate-900
                "
                >
                  Custom Day
                </h3>

                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                "
                >
                  View earnings for a specific day.
                </p>
              </div>

              <div className="space-y-3">
                <SalonSelector
                  salons={salons}
                  value={customEarningSalon}
                  onChange={handleCustomEarningSalon}
                />

                <input
                  type="date"
                  value={customEarningDate}
                  onChange={(event) =>
                    handleCustomEarningDate(event.target.value)
                  }
                  className="
                    w-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    px-4 py-3
                    text-sm
                    font-medium
                    text-slate-700
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100
                  "
                />
              </div>

              <div className="mt-6">
                <EarningResult
                  data={customEarning}
                  loading={loading?.fetchEarningChart}
                />
              </div>
            </div>

            {/* =================================================
                RANGE EARNING
            ================================================= */}

            <div
              className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >
              <div className="mb-5">
                <h3
                  className="
                  text-lg
                  font-bold
                  text-slate-900
                "
                >
                  Date Range
                </h3>

                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                "
                >
                  Analyze earnings across a period.
                </p>
              </div>

              <div className="space-y-3">
                <SalonSelector
                  salons={salons}
                  value={rangeEarningSalon}
                  onChange={(value) => {
                    setRangeEarningSalon(value);

                    if (!value) {
                      setRangeEarning(null);
                    }
                  }}
                />

                <input
                  type="date"
                  value={rangeEarningStartDate}
                  onChange={(event) => {
                    setRangeEarningStartDate(event.target.value);

                    setRangeEarning(null);
                  }}
                  className="
                    w-full
                    rounded-xl
                    border border-slate-200
                    px-4 py-3
                    text-sm
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100
                  "
                />

                <input
                  type="date"
                  value={rangeEarningEndDate}
                  min={rangeEarningStartDate || undefined}
                  onChange={(event) => {
                    setRangeEarningEndDate(event.target.value);

                    setRangeEarning(null);
                  }}
                  className="
                    w-full
                    rounded-xl
                    border border-slate-200
                    px-4 py-3
                    text-sm
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100
                  "
                />

                <button
                  type="button"
                  disabled={!isEarningRangeValid}
                  onClick={handleEarningRangeSearch}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-emerald-600
                    px-4 py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-emerald-700
                    disabled:cursor-not-allowed
                    disabled:bg-slate-200
                    disabled:text-slate-400
                  "
                >
                  <Search size={17} />
                  View Earning Report
                </button>
              </div>

              <div className="mt-6">
                <EarningResult
                  data={rangeEarning}
                  loading={loading?.fetchEarningChart}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
