import { createSlice } from "@reduxjs/toolkit";

import { getReviewsBySalonOwner } from "./reviewThunk";

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  /* =======================================================
     REVIEW COLLECTION
  ======================================================= */

  reviews: [],

  /* =======================================================
     GENERAL STATUS
  ======================================================= */

  status: "idle",

  error: null,

  /* =======================================================
     LOADING STATES
  ======================================================= */

  loading: {
    fetchReviews: false,
  },
};

/* =========================================================
   SLICE
========================================================= */

const reviewSlice = createSlice({
  name: "review",

  initialState,

  reducers: {
    /* =====================================================
       CLEAR ERROR
    ===================================================== */

    clearReviewError(state) {
      state.error = null;
    },

    /* =====================================================
       RESET REVIEW STATE
    ===================================================== */

    resetReviewState(state) {
      state.reviews = [];

      state.status = "idle";

      state.error = null;

      state.loading = {
        fetchReviews: false,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===================================================
         GET REVIEWS OF CURRENT SALON OWNER
      =================================================== */

      .addCase(getReviewsBySalonOwner.pending, (state) => {
        state.loading.fetchReviews = true;

        state.status = "loading";

        state.error = null;
      })

      .addCase(getReviewsBySalonOwner.fulfilled, (state, action) => {
        state.loading.fetchReviews = false;

        state.status = "succeeded";

        state.reviews = action.payload || [];
      })

      .addCase(getReviewsBySalonOwner.rejected, (state, action) => {
        state.loading.fetchReviews = false;

        state.status = "failed";

        state.error = action.payload;
      });
  },
});

/* =========================================================
   ACTIONS
========================================================= */

export const { clearReviewError, resetReviewState } = reviewSlice.actions;

/* =========================================================
   REDUCER
========================================================= */

export default reviewSlice.reducer;
