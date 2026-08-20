import { createSlice } from "@reduxjs/toolkit";

import {
  fetchReviewsByOwner,
  fetchReviewsBySalonIds,
  removeReview,
} from "./reviewThunk";

const initialState = {
  reviews: [],

  loading: false,

  filterLoading: false,

  deletingReviewId: null,

  error: null,
};

const reviewSlice = createSlice({
  name: "review",

  initialState,

  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =====================================================
         FETCH REVIEWS BY OWNER
      ===================================================== */

      .addCase(fetchReviewsByOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReviewsByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = null;
      })

      .addCase(fetchReviewsByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* =====================================================
         FETCH REVIEWS BY SELECTED SALONS
      ===================================================== */

      .addCase(fetchReviewsBySalonIds.pending, (state) => {
        state.filterLoading = true;
        state.error = null;
      })

      .addCase(fetchReviewsBySalonIds.fulfilled, (state, action) => {
        state.filterLoading = false;
        state.reviews = action.payload;
        state.error = null;
      })

      .addCase(fetchReviewsBySalonIds.rejected, (state, action) => {
        state.filterLoading = false;
        state.error = action.payload;
      })

      /* =====================================================
         DELETE REVIEW
      ===================================================== */

      .addCase(removeReview.pending, (state, action) => {
        state.deletingReviewId = action.meta.arg;
        state.error = null;
      })

      .addCase(removeReview.fulfilled, (state, action) => {
        state.deletingReviewId = null;

        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload,
        );
      })

      .addCase(removeReview.rejected, (state, action) => {
        state.deletingReviewId = null;
        state.error = action.payload;
      });
  },
});

export const { clearReviewError } = reviewSlice.actions;

export default reviewSlice.reducer;
