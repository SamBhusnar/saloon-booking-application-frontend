import { createAsyncThunk } from "@reduxjs/toolkit";
import { paymentApi } from "./paymentApi";

/* =========================================================
   GET SALON OWNER PAYMENTS
========================================================= */

/*
 * Backend:
 *
 * GET /api/payments/salon_owner
 *
 * The current salon owner is identified from JWT.
 *
 * Returns payments belonging to all salons owned by
 * the currently authenticated salon owner.
 */

export const getSalonOwnerPayments = createAsyncThunk(
  "payment/getSalonOwnerPayments",

  async (_, thunkAPI) => {
    try {
      const response = await paymentApi.getSalonOwnerPayments();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch salon owner payments",
        },
      );
    }
  },
);
