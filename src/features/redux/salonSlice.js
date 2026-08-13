import { createSlice } from "@reduxjs/toolkit";

import {
  createSalon,
  updateSalon,
  getOwnerSalons,
  getSalonDirectory,
  deleteSalon,
  deleteSalonImage,
  getSalonById,
} from "./salonThunk";

const initialState = {
  /*
   * =========================================================
   * OWNER SALON MANAGEMENT
   * =========================================================
   *
   * Existing functionality uses this.
   *
   * Do NOT replace this with salon directory data.
   */
  salons: [],

  /*
   * =========================================================
   * SALON DISCOVERY / SERVICES MODULE
   * =========================================================
   *
   * mySalons:
   * Salons created by the currently logged-in salon owner.
   *
   * otherSalons:
   * Salons belonging to other owners.
   */
  mySalons: [],
  otherSalons: [],

  selectedSalon: null,

  currentSalon: null,

  status: "idle",

  error: null,

  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
  },
};

const salonSlice = createSlice({
  name: "salon",

  initialState,

  reducers: {
    clearSalonError(state) {
      state.error = null;
    },

    clearSelectedSalon(state) {
      state.selectedSalon = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =====================================================
          CREATE SALON
      ===================================================== */

      .addCase(createSalon.pending, (state) => {
        state.loading.create = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(createSalon.fulfilled, (state, action) => {
        state.loading.create = false;
        state.status = "succeeded";

        /*
         * Existing owner functionality.
         */
        state.salons.push(action.payload);
      })

      .addCase(createSalon.rejected, (state, action) => {
        state.loading.create = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* =====================================================
          FETCH OWNER SALONS
      ===================================================== */

      .addCase(getOwnerSalons.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(getOwnerSalons.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";

        /*
         * Existing owner salon-management functionality.
         */
        state.salons = action.payload;
      })

      .addCase(getOwnerSalons.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* =====================================================
          FETCH SALON DIRECTORY
      ===================================================== */

      .addCase(getSalonDirectory.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(getSalonDirectory.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";

        /*
         * IMPORTANT:
         *
         * Do NOT assign this to state.salons.
         *
         * state.salons belongs to existing owner
         * salon-management functionality.
         */

        state.mySalons = action.payload.mySalons || [];
        state.otherSalons = action.payload.otherSalons || [];
      })

      .addCase(getSalonDirectory.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* =====================================================
          GET SALON BY ID
      ===================================================== */

      .addCase(getSalonById.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(getSalonById.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";

        state.currentSalon = action.payload;
      })

      .addCase(getSalonById.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* =====================================================
          UPDATE SALON
      ===================================================== */

      .addCase(updateSalon.pending, (state) => {
        state.loading.update = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateSalon.fulfilled, (state, action) => {
        state.loading.update = false;
        state.status = "succeeded";

        const index = state.salons.findIndex(
          (salon) => salon.id === action.payload.id,
        );

        if (index !== -1) {
          state.salons[index] = action.payload;
        }

        state.currentSalon = action.payload;
        state.selectedSalon = action.payload;
      })

      .addCase(updateSalon.rejected, (state, action) => {
        state.loading.update = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* =====================================================
          DELETE SALON
      ===================================================== */

      .addCase(deleteSalon.pending, (state) => {
        state.loading.delete = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(deleteSalon.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.status = "succeeded";

        state.salons = state.salons.filter(
          (salon) => salon.id !== action.payload,
        );

        /*
         * Also remove from directory's mySalons
         * if it exists there.
         *
         * This does not affect existing functionality.
         */
        state.mySalons = state.mySalons.filter(
          (salon) => salon.id !== action.payload,
        );

        if (state.currentSalon?.id === action.payload) {
          state.currentSalon = null;
        }
      })

      .addCase(deleteSalon.rejected, (state, action) => {
        state.loading.delete = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* =====================================================
          DELETE SALON IMAGE
      ===================================================== */

      .addCase(deleteSalonImage.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })

      .addCase(deleteSalonImage.fulfilled, (state, action) => {
        state.loading.update = false;
        state.status = "succeeded";

        const { salonId, publicId } = action.payload;

        const salon = state.salons.find((s) => s.id === salonId);

        if (salon?.images) {
          delete salon.images[publicId];
        }

        /*
         * Also update directory data if the salon
         * exists there.
         */
        const mySalon = state.mySalons.find((s) => s.id === salonId);

        if (mySalon?.images) {
          delete mySalon.images[publicId];
        }

        const otherSalon = state.otherSalons.find((s) => s.id === salonId);

        if (otherSalon?.images) {
          delete otherSalon.images[publicId];
        }

        if (
          state.currentSalon &&
          state.currentSalon.id === salonId &&
          state.currentSalon.images
        ) {
          delete state.currentSalon.images[publicId];
        }
      })

      .addCase(deleteSalonImage.rejected, (state, action) => {
        state.loading.update = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSalonError, clearSelectedSalon } = salonSlice.actions;

export default salonSlice.reducer;
