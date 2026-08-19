import { createAsyncThunk } from "@reduxjs/toolkit";

import { reviewApi } from "./reviewApi";

/* =========================================================
   GET REVIEWS OF CURRENT LOGGED-IN SALON OWNER
========================================================= */

/*
 * Backend:
 *
 * GET /api/reviews/salon_owner
 *
 * The salon owner is identified from JWT.
 */

export const getReviewsBySalonOwner = createAsyncThunk(
  "review/getReviewsBySalonOwner",

  async (_, thunkAPI) => {
    try {
      const response = await reviewApi.getReviewsBySalonOwner();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch reviews",
        },
      );
    }
  },
);
