import { createSlice } from "@reduxjs/toolkit";

import {
  createCategory,
  getCategoriesBySalonId,
  getCategoryById,
  deleteCategory,
} from "./categoryThunk";

const initialState = {
  // List of categories
  categories: [],

  // Currently selected category
  currentCategory: null,

  // Loading states
  loading: {
    create: false,
    fetch: false,
    fetchById: false,
    delete: false,
  },

  // API error
  error: null,

  // Overall status
  status: "idle",
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    // =========================================
    // CLEAR CURRENT CATEGORY
    // =========================================

    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },

    // =========================================
    // CLEAR ERROR
    // =========================================

    clearCategoryError: (state) => {
      state.error = null;
    },

    // =========================================
    // RESET CATEGORY STATE
    // =========================================

    resetCategoryState: (state) => {
      state.categories = [];
      state.currentCategory = null;

      state.loading = {
        create: false,
        fetch: false,
        fetchById: false,
        delete: false,
      };

      state.error = null;
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================================
      // CREATE CATEGORY
      // =========================================

      .addCase(createCategory.pending, (state) => {
        state.loading.create = true;
        state.error = null;
        state.status = "loading";
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading.create = false;
        state.error = null;
        state.status = "succeeded";

        // Add newly created category to list
        state.categories.push(action.payload);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // =========================================
      // GET ALL CATEGORIES BY SALON ID
      // =========================================

      .addCase(getCategoriesBySalonId.pending, (state) => {
        state.loading.fetch = true;
        state.error = null;
        state.status = "loading";
      })

      .addCase(getCategoriesBySalonId.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.error = null;
        state.status = "succeeded";

        state.categories = action.payload;
      })

      .addCase(getCategoriesBySalonId.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // =========================================
      // GET CATEGORY BY ID
      // =========================================

      .addCase(getCategoryById.pending, (state) => {
        state.loading.fetchById = true;
        state.error = null;
        state.status = "loading";
      })

      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading.fetchById = false;
        state.error = null;
        state.status = "succeeded";

        state.currentCategory = action.payload;
      })

      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading.fetchById = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // =========================================
      // DELETE CATEGORY
      // =========================================

      .addCase(deleteCategory.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
        state.status = "loading";
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.error = null;
        state.status = "succeeded";

        const { categoryId } = action.payload;

        // Remove deleted category from Redux state
        state.categories = state.categories.filter(
          (category) => category.id !== categoryId,
        );

        // If deleted category was currently selected,
        // clear it as well.
        if (state.currentCategory?.id === categoryId) {
          state.currentCategory = null;
        }
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearCurrentCategory, clearCategoryError, resetCategoryState } =
  categorySlice.actions;

export default categorySlice.reducer;
