import { createAsyncThunk } from "@reduxjs/toolkit";
import { salonApi } from "./salonApi";

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

export const getOwnerSalons = createAsyncThunk(
  "salon/getOwnerSalons",
  async (_, thunkAPI) => {
    try {
      const response = await salonApi.getOwnerSalons();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch salons",
        },
      );
    }
  },
);

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

export const deleteSalonImage = createAsyncThunk(
  "salon/deleteSalonImage",
  async ({ salonId, publicId }, thunkAPI) => {
    try {
      await salonApi.deleteSalonImage(salonId, publicId);

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