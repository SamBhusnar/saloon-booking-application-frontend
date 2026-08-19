import { createSlice } from "@reduxjs/toolkit";

import { getSalonOwnerPayments } from "./paymentThunk";

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  /* =======================================================
     PAYMENT COLLECTION
  ======================================================= */

  payments: [],

  /* =======================================================
     GENERAL STATUS
  ======================================================= */

  status: "idle",

  error: null,

  /* =======================================================
     LOADING STATES
  ======================================================= */

  loading: {
    fetchSalonOwnerPayments: false,
  },
};

/* =========================================================
   SLICE
========================================================= */

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    /* =====================================================
       CLEAR ERROR
    ===================================================== */

    clearPaymentError(state) {
      state.error = null;
    },

    /* =====================================================
       RESET PAYMENT STATE
    ===================================================== */

    resetPaymentState(state) {
      state.payments = [];

      state.status = "idle";

      state.error = null;

      state.loading = {
        fetchSalonOwnerPayments: false,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===================================================
         GET SALON OWNER PAYMENTS
      =================================================== */

      .addCase(getSalonOwnerPayments.pending, (state) => {
        state.loading.fetchSalonOwnerPayments = true;

        state.status = "loading";

        state.error = null;
      })

      .addCase(getSalonOwnerPayments.fulfilled, (state, action) => {
        state.loading.fetchSalonOwnerPayments = false;

        state.status = "succeeded";

        state.payments = action.payload || [];
      })

      .addCase(getSalonOwnerPayments.rejected, (state, action) => {
        state.loading.fetchSalonOwnerPayments = false;

        state.status = "failed";

        state.error = action.payload;
      });
  },
});

/* =========================================================
   ACTIONS
========================================================= */

export const { clearPaymentError, resetPaymentState } = paymentSlice.actions;

/* =========================================================
   REDUCER
========================================================= */

export default paymentSlice.reducer;
