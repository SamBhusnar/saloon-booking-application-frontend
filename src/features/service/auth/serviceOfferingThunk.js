import { createAsyncThunk } from "@reduxjs/toolkit";

import { serviceOfferingApi } from "./serviceOfferingApi";

// =========================================
// CREATE SERVICE OFFERING
// =========================================

export const createService = createAsyncThunk(
  "serviceOffering/createService",

  async ({ serviceOffering, image }, thunkAPI) => {
    try {
      const response = await serviceOfferingApi.createService(
        serviceOffering,
        image,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to create service offering.",
        },
      );
    }
  },
);

// =========================================
// UPDATE SERVICE OFFERING
// =========================================

export const updateService = createAsyncThunk(
  "serviceOffering/updateService",

  async ({ serviceId, serviceOffering, image }, thunkAPI) => {
    try {
      const response = await serviceOfferingApi.updateService(
        serviceId,
        serviceOffering,
        image,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to update service offering.",
        },
      );
    }
  },
);

// =========================================
// GET ALL SERVICES OF A SALON
// =========================================

export const getServicesBySalonId = createAsyncThunk(
  "serviceOffering/getServicesBySalonId",

  async ({ salonId, categoryId = null }, thunkAPI) => {
    try {
      const response = await serviceOfferingApi.getServicesBySalonId(
        salonId,
        categoryId,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch services.",
        },
      );
    }
  },
);

// =========================================
// GET SERVICE BY ID
// =========================================

export const getServiceById = createAsyncThunk(
  "serviceOffering/getServiceById",

  async (serviceId, thunkAPI) => {
    try {
      const response = await serviceOfferingApi.getServiceById(serviceId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch service.",
        },
      );
    }
  },
);

// =========================================
// GET SERVICES BY IDS
// =========================================

export const getServicesByIds = createAsyncThunk(
  "serviceOffering/getServicesByIds",

  async (ids, thunkAPI) => {
    try {
      const response = await serviceOfferingApi.getServicesByIds(ids);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch services.",
        },
      );
    }
  },
);

// =========================================
// GET SERVICES BY CATEGORY ID
// =========================================

export const getServicesByCategoryId = createAsyncThunk(
  "serviceOffering/getServicesByCategoryId",

  async (categoryId, thunkAPI) => {
    try {
      const response =
        await serviceOfferingApi.getServicesByCategoryId(categoryId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch category services.",
        },
      );
    }
  },
);

// =========================================
// GET SERVICES BY CATEGORY + SALON
// =========================================

export const getServicesByCategoryAndSalon = createAsyncThunk(
  "serviceOffering/getServicesByCategoryAndSalon",

  async ({ categoryId, salonId }, thunkAPI) => {
    try {
      const response = await serviceOfferingApi.getServicesByCategoryAndSalon(
        categoryId,
        salonId,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch services.",
        },
      );
    }
  },
);

// =========================================
// DELETE SERVICE OFFERING
// =========================================

export const deleteService = createAsyncThunk(
  "serviceOffering/deleteService",

  async ({ serviceId, salonId, categoryId }, thunkAPI) => {
    try {
      const response = await serviceOfferingApi.deleteService(
        serviceId,
        salonId,
        categoryId,
      );

      return {
        serviceId,
        salonId,
        categoryId,
        message: response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to delete service offering.",
        },
      );
    }
  },
);

// =========================================
// DELETE ALL SERVICES OF A CATEGORY
//
// This is primarily an internal operation used
// when a category is deleted.
// =========================================

export const deleteServicesByCategoryId = createAsyncThunk(
  "serviceOffering/deleteServicesByCategoryId",

  async (categoryId, thunkAPI) => {
    try {
      const response =
        await serviceOfferingApi.deleteServicesByCategoryId(categoryId);

      return {
        categoryId,
        message: response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to delete category services.",
        },
      );
    }
  },
);

 
