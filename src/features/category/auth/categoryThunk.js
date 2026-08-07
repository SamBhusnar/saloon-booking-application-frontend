import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "./categoryApi";

// =========================================
// CREATE CATEGORY
// =========================================

export const createCategory = createAsyncThunk(
  "category/createCategory",

  async (formData, thunkAPI) => {
    try {
      const response = await categoryApi.createCategory(formData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to create category",
        },
      );
    }
  },
);

// =========================================
// GET ALL CATEGORIES BY SALON ID
// =========================================

export const getCategoriesBySalonId = createAsyncThunk(
  "category/getCategoriesBySalonId",

  async (salonId, thunkAPI) => {
    try {
      const response = await categoryApi.getCategoriesBySalonId(salonId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch categories",
        },
      );
    }
  },
);

// =========================================
// GET CATEGORY BY ID
// =========================================

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",

  async (categoryId, thunkAPI) => {
    try {
      const response = await categoryApi.getCategoryById(categoryId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch category",
        },
      );
    }
  },
);

// =========================================
// DELETE CATEGORY
// =========================================

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",

  async ({ salonId, categoryId }, thunkAPI) => {
    try {
      await categoryApi.deleteCategory(salonId, categoryId);

      return {
        salonId,
        categoryId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to delete category",
        },
      );
    }
  },
);
