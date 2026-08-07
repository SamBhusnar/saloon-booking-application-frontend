import { createSlice } from "@reduxjs/toolkit";

import {
  createSalon,
  updateSalon,
  getOwnerSalons,
  deleteSalon,
  deleteSalonImage,
  getSalonById,
} from "./salonThunk";

const initialState = {
  salons: [],

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

      /* ============================
            CREATE
    ============================ */

      .addCase(createSalon.pending, (state) => {
        state.loading.create = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(createSalon.fulfilled, (state, action) => {
        state.loading.create = false;
        state.status = "succeeded";

        state.salons.push(action.payload);
      })

      .addCase(createSalon.rejected, (state, action) => {
        state.loading.create = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* ============================
            FETCH OWNER SALONS
    ============================ */

      .addCase(getOwnerSalons.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(getOwnerSalons.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";

        state.salons = action.payload;
      })

      .addCase(getOwnerSalons.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* ============================
            GET SALON BY ID
    ============================ */

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

      /* ============================
            UPDATE
    ============================ */

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

      /* ============================
            DELETE SALON
    ============================ */

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

        if (state.currentSalon?.id === action.payload) {
          state.currentSalon = null;
        }
      })

      .addCase(deleteSalon.rejected, (state, action) => {
        state.loading.delete = false;
        state.status = "failed";
        state.error = action.payload;
      })

      /* ============================
          DELETE SALON IMAGE
    ============================ */

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
