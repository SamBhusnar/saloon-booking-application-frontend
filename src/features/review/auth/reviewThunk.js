import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReviewsByOwner,
  getReviewsBySalonIds,
  deleteReview,
} from "./reviewApi";

/* =========================================================
   GET ALL REVIEWS BY CURRENT SALON OWNER
========================================================= */

export const fetchReviewsByOwner = createAsyncThunk(
  "reviews/fetchByOwner",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getReviewsByOwner();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews.",
      );
    }
  },
);

/* =========================================================
   GET REVIEWS BY SELECTED SALONS
========================================================= */

export const fetchReviewsBySalonIds = createAsyncThunk(
  "reviews/fetchBySalonIds",
  async (salonIds, { rejectWithValue }) => {
    try {
      if (!salonIds || salonIds.length === 0) {
        return [];
      }

      const data = await getReviewsBySalonIds(salonIds);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch filtered reviews.",
      );
    }
  },
);

/* =========================================================
   DELETE REVIEW
========================================================= */

export const removeReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await deleteReview(reviewId);

      return reviewId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review.",
      );
    }
  },
);
