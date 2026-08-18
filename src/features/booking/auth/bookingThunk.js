import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingApi } from "./bookingApi";

/* =========================================================
   CREATE BOOKING
========================================================= */

/*
 * Backend:
 *
 * POST /api/booking
 *
 * Request body:
 * {
 *   salonId,
 *   categoryId,
 *   startTime,
 *   endTime,
 *   serviceIds
 * }
 *
 * Query parameter:
 * paymentMethod
 *
 * Response:
 * PaymentLinkResponse
 */

export const createBooking = createAsyncThunk(
  "booking/createBooking",

  async ({ bookingRequest, paymentMethod }, thunkAPI) => {
    try {
      const response = await bookingApi.createBooking(
        bookingRequest,
        paymentMethod,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to create booking",
        },
      );
    }
  },
);


/* =========================================================
   GET CUSTOMER BOOKINGS
========================================================= */

/*
 * Backend:
 *
 * GET /api/booking/customer
 *
 * Customer is identified from JWT on backend.
 */

export const getCustomerBookings = createAsyncThunk(
  "booking/getCustomerBookings",

  async (_, thunkAPI) => {
    try {
      const response = await bookingApi.getCustomerBookings();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch customer bookings",
        },
      );
    }
  },
);


/* =========================================================
   GET salon's BOOKINGS
========================================================= */

/*
 * Backend:
 * 
 * GET /api/booking/salons
 *
 * salon are did identified from JWT on backend.
 */

export const getBookingsBySalonIdAndAuth = createAsyncThunk(
  "booking/getBookingsBySalonIdAndAuth",

  async (_, thunkAPI) => {
    try {
      const response = await bookingApi.getBookingsBySalonIdAndAuth();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch salon bookings",
        },
      );
    }
  },
);

/* =========================================================
   GET salon's BOOKINGS
========================================================= */

/*
 * Backend:
 * 
 * GET /api/booking/salons
 *
 * salon are did identified from JWT on backend.
 */

export const getCustomersOfSalonAndAuth = createAsyncThunk(
  "booking/getCustomersOfSalonAndAuth",

  async (_, thunkAPI) => {
    try {
      const response = await bookingApi.getCustomersOfSalonAndAuth();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch salon's customers",
        },
      );
    }
  },
);


/* =========================================================
   GET BOOKINGS BY SALON
========================================================= */

/*
 * Backend:
 *
 * GET /api/booking/salon?salonId={salonId}
 */

export const getSalonBookings = createAsyncThunk(
  "booking/getSalonBookings",

  async (salonId, thunkAPI) => {
    try {
      const response = await bookingApi.getSalonBookings(salonId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch salon bookings",
        },
      );
    }
  },
);


/* =========================================================
   GET BOOKING BY ID
========================================================= */

/*
 * Backend:
 *
 * GET /api/booking/{bookingId}
 */

export const getBookingById = createAsyncThunk(
  "booking/getBookingById",

  async (bookingId, thunkAPI) => {
    try {
      const response = await bookingApi.getBookingById(bookingId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch booking",
        },
      );
    }
  },
);


/* =========================================================
   UPDATE BOOKING STATUS
========================================================= */

/*
 * Backend:
 *
 * PUT /api/booking/{bookingId}/status?status={status}
 *
 * Example:
 *
 * updateBookingStatus({
 *   bookingId: 10,
 *   status: "CONFIRMED"
 * })
 */

export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",

  async ({ bookingId, status }, thunkAPI) => {
    try {
      const response = await bookingApi.updateBookingStatus(
        bookingId,
        status,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to update booking status",
        },
      );
    }
  },
);


/* =========================================================
   GET BOOKED SLOTS
========================================================= */

/*
 * Backend:
 *
 * GET /api/booking/slot/salon/{salonId}/date/{date}
 *
 * Example:
 *
 * getBookedSlots({
 *   salonId: 5,
 *   date: "2026-08-10"
 * })
 */

export const getBookedSlots = createAsyncThunk(
  "booking/getBookedSlots",

  async ({ salonId, date }, thunkAPI) => {
    try {
      const response = await bookingApi.getBookedSlots(
        salonId,
        date,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch booked slots",
        },
      );
    }
  },
);


/* =========================================================
   GET BOOKING REPORT
========================================================= */

/*
 * Backend:
 *
 * GET /api/booking/report?salonId={salonId}
 */

export const getBookingReport = createAsyncThunk(
  "booking/getBookingReport",

  async (salonId, thunkAPI) => {
    try {
      const response = await bookingApi.getBookingReport(
        salonId,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch booking report",
        },
      );
    }
  },
);