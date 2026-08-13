
import { createAsyncThunk } from "@reduxjs/toolkit";
import { salonApi } from "./salonApi";

/* =========================================================
   CREATE SALON
========================================================= */

export const createSalon = createAsyncThunk(
  "salon/createSalon",
  async (formData, thunkAPI) => {
    try {
      const response = await salonApi.createSalon(formData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to create salon",
        },
      );
    }
  },
);

/* =========================================================
   UPDATE SALON
========================================================= */

export const updateSalon = createAsyncThunk(
  "salon/updateSalon",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await salonApi.updateSalon(id, formData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to update salon",
        },
      );
    }
  },
);

/* =========================================================
   GET OWNER SALONS
========================================================= */

/*
 * Returns ONLY salons created by the currently
 * authenticated salon owner.
 *
 * Existing owner-side functionality should continue
 * using this thunk.
 */

export const getOwnerSalons = createAsyncThunk(
  "salon/getOwnerSalons",
  async (_, thunkAPI) => {
    try {
      const response = await salonApi.getOwnerSalons();

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch owner salons",
        },
      );
    }
  },
);

/* =========================================================
   GET ALL SALONS
========================================================= */

/*
 * Returns the RAW list returned by:
 *
 * GET /salons
 *
 * IMPORTANT:
 *
 * This endpoint may contain the current owner's
 * salons as well.
 *
 * Therefore this thunk does NOT perform filtering.
 *
 * Use getSalonDirectory() when you need:
 *
 *     mySalons
 *     otherSalons
 *
 * for the Salon / Service discovery module.
 */

export const getAllSalons = createAsyncThunk(
  "salon/getAllSalons",
  async (_, thunkAPI) => {
    try {
      const response = await salonApi.getAllSalons();

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch all salons",
        },
      );
    }
  },
);

/* =========================================================
   GET SALON DIRECTORY
========================================================= */

/*
 * Used by the Salon Discovery / Services module.
 *
 * It combines:
 *
 *     GET /salons/owner
 *             +
 *     GET /salons
 *
 * and returns:
 *
 * {
 *   mySalons: [],
 *   otherSalons: []
 * }
 *
 *
 * mySalons:
 *     Only salons belonging to the currently
 *     authenticated owner.
 *
 * otherSalons:
 *     Every salon that does NOT belong to the
 *     currently authenticated owner.
 *
 *
 * Example:
 *
 * Owner salons:
 *
 * [
 *   { id: 15, name: "Sam Salon" },
 *   { id: 18, name: "Royal Salon" }
 * ]
 *
 * All salons:
 *
 * [
 *   { id: 15, name: "Sam Salon" },
 *   { id: 18, name: "Royal Salon" },
 *   { id: 21, name: "Style Studio" },
 *   { id: 25, name: "Urban Cuts" }
 * ]
 *
 * Result:
 *
 * mySalons:
 * [
 *   { id: 15, ... },
 *   { id: 18, ... }
 * ]
 *
 * otherSalons:
 * [
 *   { id: 21, ... },
 *   { id: 25, ... }
 * ]
 */

export const getSalonDirectory = createAsyncThunk(
  "salon/getSalonDirectory",
  async (_, thunkAPI) => {
    try {
      /*
       * Fetch both APIs simultaneously.
       *
       * This is better than waiting for one request
       * before starting the second request.
       */
      const [ownerResponse, allResponse] = await Promise.all([
        salonApi.getOwnerSalons(),
        salonApi.getAllSalons(),
      ]);

      /*
       * Always normalize API responses to arrays.
       *
       * This prevents errors such as:
       *
       * allSalons.filter is not a function
       */
      const mySalons = Array.isArray(ownerResponse.data)
        ? ownerResponse.data
        : [];

      const allSalons = Array.isArray(allResponse.data)
        ? allResponse.data
        : [];

      /*
       * ==========================================
       * CREATE OWNER SALON ID SET
       * ==========================================
       *
       * Example:
       *
       * mySalons = [
       *   { id: 15 },
       *   { id: 18 }
       * ]
       *
       * ownerSalonIds:
       *
       * Set { 15, 18 }
       */

      const ownerSalonIds = new Set(
        mySalons
          .map((salon) => salon?.id)
          .filter(
            (id) =>
              id !== null &&
              id !== undefined,
          ),
      );

      /*
       * ==========================================
       * FILTER OTHER SALONS
       * ==========================================
       *
       * Remove every salon whose ID exists
       * inside ownerSalonIds.
       */

      const otherSalons = allSalons.filter((salon) => {
        const salonId = salon?.id;

        /*
         * Ignore malformed salon objects.
         */
        if (salonId === null || salonId === undefined) {
          return false;
        }

        /*
         * Keep only salons that don't belong
         * to the current owner.
         */
        return !ownerSalonIds.has(salonId);
      });

      /*
       * ==========================================
       * RETURN DIRECTORY
       * ==========================================
       */

      return {
        mySalons,
        otherSalons,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to load salon directory",
        },
      );
    }
  },
);

/* =========================================================
   DELETE SALON
========================================================= */

export const deleteSalon = createAsyncThunk(
  "salon/deleteSalon",
  async (id, thunkAPI) => {
    try {
      await salonApi.deleteSalon(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to delete salon",
        },
      );
    }
  },
);

/* =========================================================
   DELETE SALON IMAGE
========================================================= */

export const deleteSalonImage = createAsyncThunk(
  "salon/deleteSalonImage",
  async ({ salonId, publicId }, thunkAPI) => {
    try {
      await salonApi.deleteSalonImage(
        salonId,
        publicId,
      );

      return {
        salonId,
        publicId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to delete image",
        },
      );
    }
  },
);

/* =========================================================
   GET SALON BY ID
========================================================= */

export const getSalonById = createAsyncThunk(
  "salon/getSalonById",
  async (id, thunkAPI) => {
    try {
      const response = await salonApi.getSalonById(id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch salon",
        },
      );
    }
  },
);

/* =========================================================
   SEARCH SALON
========================================================= */

export const searchSalon = createAsyncThunk(
  "salon/searchSalon",
  async (city, thunkAPI) => {
    try {
      const response = await salonApi.searchSalon(city);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to search salons",
        },
      );
    }
  },
);

