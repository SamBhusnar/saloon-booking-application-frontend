import { createSlice } from "@reduxjs/toolkit";

import {
  createBooking,
  getCustomerBookings,
  getSalonBookings,
  getBookingById,
  updateBookingStatus,
  getBookedSlots,
  getBookingReport,
} from "./bookingThunk";

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  /* =======================================================
     BOOKING COLLECTIONS
  ======================================================= */

  bookings: [],

  customerBookings: [],

  salonBookings: [],

  /* =======================================================
     SELECTED BOOKING
  ======================================================= */

  selectedBooking: null,

  /* =======================================================
     PAYMENT LINK RESPONSE
     
     POST /api/booking returns PaymentLinkResponse.
     
     This is NOT payment-success information.
     It is the response containing the payment URL/link.
  ======================================================= */

  paymentLinkResponse: null,

  /* =======================================================
     BOOKED SLOTS
  ======================================================= */

  bookedSlots: [],

  /* =======================================================
     SALON REPORT
  ======================================================= */

  bookingReport: null,

  /* =======================================================
     GENERAL STATUS
  ======================================================= */

  status: "idle",

  error: null,

  /* =======================================================
     LOADING STATES
  ======================================================= */

  loading: {
    create: false,

    fetchCustomer: false,

    fetchSalon: false,

    fetchById: false,

    updateStatus: false,

    fetchSlots: false,

    fetchReport: false,
  },
};

/* =========================================================
   SLICE
========================================================= */

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    /* =====================================================
       CLEAR ERROR
    ===================================================== */

    clearBookingError(state) {
      state.error = null;
    },

    /* =====================================================
       CLEAR SELECTED BOOKING
    ===================================================== */

    clearSelectedBooking(state) {
      state.selectedBooking = null;
    },

    /* =====================================================
       CLEAR PAYMENT LINK
       
       Useful after navigating away from payment flow.
    ===================================================== */

    clearPaymentLink(state) {
      state.paymentLinkResponse = null;
    },

    /* =====================================================
       CLEAR BOOKED SLOTS
    ===================================================== */

    clearBookedSlots(state) {
      state.bookedSlots = [];
    },

    /* =====================================================
       CLEAR BOOKING REPORT
    ===================================================== */

    clearBookingReport(state) {
      state.bookingReport = null;
    },

    /* =====================================================
       RESET BOOKING STATE
       
       Useful when leaving the booking flow.
    ===================================================== */

    resetBookingState(state) {
      state.bookings = [];
      state.customerBookings = [];
      state.salonBookings = [];

      state.selectedBooking = null;

      state.paymentLinkResponse = null;

      state.bookedSlots = [];

      state.bookingReport = null;

      state.status = "idle";
      state.error = null;

      state.loading = {
        create: false,
        fetchCustomer: false,
        fetchSalon: false,
        fetchById: false,
        updateStatus: false,
        fetchSlots: false,
        fetchReport: false,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===================================================
         CREATE BOOKING
         
         POST /api/booking
         
         Response:
         PaymentLinkResponse
      =================================================== */

      .addCase(createBooking.pending, (state) => {
        state.loading.create = true;

        state.status = "loading";

        state.error = null;

        /*
         * Remove an old payment link before creating
         * another booking/payment request.
         */
        state.paymentLinkResponse = null;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading.create = false;

        state.status = "succeeded";

        /*
         * IMPORTANT:
         *
         * Backend returns PaymentLinkResponse,
         * not BookingDto.
         *
         * Therefore do NOT push action.payload
         * into bookings.
         */
        state.paymentLinkResponse = action.payload;
      })

      .addCase(createBooking.rejected, (state, action) => {
        state.loading.create = false;

        state.status = "failed";

        state.error = action.payload;
      })

      /* ===================================================
         GET CUSTOMER BOOKINGS
         
         GET /api/booking/customer
      =================================================== */

      .addCase(getCustomerBookings.pending, (state) => {
        state.loading.fetchCustomer = true;

        state.status = "loading";

        state.error = null;
      })

      .addCase(getCustomerBookings.fulfilled, (state, action) => {
        state.loading.fetchCustomer = false;

        state.status = "succeeded";

        state.customerBookings = action.payload || [];

        /*
         * Keep a general collection as well.
         *
         * This can be useful if your customer booking
         * pages consume state.booking.bookings.
         */
        state.bookings = action.payload || [];
      })

      .addCase(getCustomerBookings.rejected, (state, action) => {
        state.loading.fetchCustomer = false;

        state.status = "failed";

        state.error = action.payload;
      })

      /* ===================================================
         GET BOOKINGS BY SALON
         
         GET /api/booking/salon?salonId=...
      =================================================== */

      .addCase(getSalonBookings.pending, (state) => {
        state.loading.fetchSalon = true;

        state.status = "loading";

        state.error = null;
      })

      .addCase(getSalonBookings.fulfilled, (state, action) => {
        state.loading.fetchSalon = false;

        state.status = "succeeded";

        state.salonBookings = action.payload || [];

        /*
         * Keep general booking collection synchronized
         * with the latest salon booking request.
         */
        state.bookings = action.payload || [];
      })

      .addCase(getSalonBookings.rejected, (state, action) => {
        state.loading.fetchSalon = false;

        state.status = "failed";

        state.error = action.payload;
      })

      /* ===================================================
         GET BOOKING BY ID
         
         GET /api/booking/{bookingId}
      =================================================== */

      .addCase(getBookingById.pending, (state) => {
        state.loading.fetchById = true;

        state.status = "loading";

        state.error = null;
      })

      .addCase(getBookingById.fulfilled, (state, action) => {
        state.loading.fetchById = false;

        state.status = "succeeded";

        state.selectedBooking = action.payload;
      })

      .addCase(getBookingById.rejected, (state, action) => {
        state.loading.fetchById = false;

        state.status = "failed";

        state.error = action.payload;
      })

      /* ===================================================
         UPDATE BOOKING STATUS
         
         PUT /api/booking/{bookingId}/status
      =================================================== */

      .addCase(updateBookingStatus.pending, (state) => {
        state.loading.updateStatus = true;

        state.status = "loading";

        state.error = null;
      })

      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading.updateStatus = false;

        state.status = "succeeded";

        const updatedBooking = action.payload;

        /*
         * Update selected booking.
         */
        state.selectedBooking = updatedBooking;

        /*
         * Update general bookings collection.
         */
        const bookingIndex = state.bookings.findIndex(
          (booking) => booking.id === updatedBooking?.id,
        );

        if (bookingIndex !== -1) {
          state.bookings[bookingIndex] = updatedBooking;
        }

        /*
         * Update customer bookings.
         */
        const customerBookingIndex = state.customerBookings.findIndex(
          (booking) => booking.id === updatedBooking?.id,
        );

        if (customerBookingIndex !== -1) {
          state.customerBookings[customerBookingIndex] = updatedBooking;
        }

        /*
         * Update salon bookings.
         */
        const salonBookingIndex = state.salonBookings.findIndex(
          (booking) => booking.id === updatedBooking?.id,
        );

        if (salonBookingIndex !== -1) {
          state.salonBookings[salonBookingIndex] = updatedBooking;
        }
      })

      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading.updateStatus = false;

        state.status = "failed";

        state.error = action.payload;
      })

      /* ===================================================
         GET BOOKED SLOTS
         
         GET /api/booking/slot/salon/{salonId}/date/{date}
      =================================================== */

      .addCase(getBookedSlots.pending, (state) => {
        state.loading.fetchSlots = true;

        state.error = null;
      })

      .addCase(getBookedSlots.fulfilled, (state, action) => {
        state.loading.fetchSlots = false;

        state.status = "succeeded";

        state.bookedSlots = action.payload || [];
      })

      .addCase(getBookedSlots.rejected, (state, action) => {
        state.loading.fetchSlots = false;

        state.status = "failed";

        state.error = action.payload;
      })

      /* ===================================================
         GET SALON BOOKING REPORT
         
         GET /api/booking/report?salonId=...
      =================================================== */

      .addCase(getBookingReport.pending, (state) => {
        state.loading.fetchReport = true;

        state.error = null;
      })

      .addCase(getBookingReport.fulfilled, (state, action) => {
        state.loading.fetchReport = false;

        state.status = "succeeded";

        state.bookingReport = action.payload;
      })

      .addCase(getBookingReport.rejected, (state, action) => {
        state.loading.fetchReport = false;

        state.status = "failed";

        state.error = action.payload;
      });
  },
});

/* =========================================================
   ACTIONS
========================================================= */

export const {
  clearBookingError,
  clearSelectedBooking,
  clearPaymentLink,
  clearBookedSlots,
  clearBookingReport,
  resetBookingState,
} = bookingSlice.actions;

/* =========================================================
   REDUCER
========================================================= */

export default bookingSlice.reducer;