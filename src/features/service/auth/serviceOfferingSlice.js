import { createSlice } from "@reduxjs/toolkit";

import {
  createService,
  updateService,
  getServicesBySalonId,
  getServiceById,
  getServicesByIds,
  getServicesByCategoryId,
  getServicesByCategoryAndSalon,
  deleteService,
  deleteServicesByCategoryId,
} from "./serviceOfferingThunk";

// =========================================
// INITIAL STATE
// =========================================

const initialState = {
  // All services currently loaded
  services: [],

  // Currently selected service
  selectedService: null,

  // Services grouped/loaded for a particular category
  categoryServices: [],

  // =========================================
  // LOADING STATES
  // =========================================

  loading: {
    fetch: false,
    fetchById: false,
    fetchByIds: false,
    fetchByCategory: false,
    fetchByCategoryAndSalon: false,
    create: false,
    update: false,
    delete: false,
    deleteByCategory: false,
  },

  // =========================================
  // ERROR STATES
  // =========================================

  error: {
    fetch: null,
    fetchById: null,
    fetchByIds: null,
    fetchByCategory: null,
    fetchByCategoryAndSalon: null,
    create: null,
    update: null,
    delete: null,
    deleteByCategory: null,
  },

  // =========================================
  // SUCCESS STATES
  // =========================================

  success: {
    create: false,
    update: false,
    delete: false,
    deleteByCategory: false,
  },
};

// =========================================
// HELPER
// =========================================

const getErrorMessage = (payload, fallback) => {
  if (typeof payload === "string") {
    return payload;
  }

  return payload?.message || fallback;
};

// =========================================
// SLICE
// =========================================

const serviceOfferingSlice = createSlice({
  name: "serviceOffering",

  initialState,

  reducers: {
    // =========================================
    // CLEAR SELECTED SERVICE
    // =========================================

    clearSelectedService: (state) => {
      state.selectedService = null;
    },

    // =========================================
    // CLEAR ERRORS
    // =========================================

    clearServiceErrors: (state) => {
      state.error = {
        fetch: null,
        fetchById: null,
        fetchByIds: null,
        fetchByCategory: null,
        fetchByCategoryAndSalon: null,
        create: null,
        update: null,
        delete: null,
        deleteByCategory: null,
      };
    },

    // =========================================
    // CLEAR SUCCESS STATES
    // =========================================

    clearServiceSuccess: (state) => {
      state.success = {
        create: false,
        update: false,
        delete: false,
        deleteByCategory: false,
      };
    },

    // =========================================
    // RESET SERVICE STATE
    // =========================================

    resetServiceOfferingState: () => initialState,
  },

  extraReducers: (builder) => {
    // =========================================
    // CREATE SERVICE
    // =========================================

    builder
      .addCase(createService.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
        state.success.create = false;
      })

      .addCase(createService.fulfilled, (state, action) => {
        state.loading.create = false;
        state.success.create = true;

        // Add newly created service to current list
        if (action.payload) {
          state.services.push(action.payload);
        }
      })

      .addCase(createService.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = getErrorMessage(
          action.payload,
          "Failed to create service.",
        );
        state.success.create = false;
      });

    // =========================================
    // UPDATE SERVICE
    // =========================================

    builder
      .addCase(updateService.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
        state.success.update = false;
      })

      .addCase(updateService.fulfilled, (state, action) => {
        state.loading.update = false;
        state.success.update = true;

        const updatedService = action.payload;

        if (!updatedService?.id) {
          return;
        }

        const index = state.services.findIndex(
          (service) => service.id === updatedService.id,
        );

        if (index !== -1) {
          state.services[index] = updatedService;
        }

        // Also update selected service if it is currently selected
        if (state.selectedService?.id === updatedService.id) {
          state.selectedService = updatedService;
        }
      })

      .addCase(updateService.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = getErrorMessage(
          action.payload,
          "Failed to update service.",
        );
        state.success.update = false;
      });

    // =========================================
    // GET SERVICES BY SALON ID
    // =========================================

    builder
      .addCase(getServicesBySalonId.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })

      .addCase(getServicesBySalonId.fulfilled, (state, action) => {
        state.loading.fetch = false;

        state.services = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(getServicesBySalonId.rejected, (state, action) => {
        state.loading.fetch = false;

        state.error.fetch = getErrorMessage(
          action.payload,
          "Failed to fetch services.",
        );
      });

    // =========================================
    // GET SERVICE BY ID
    // =========================================

    builder
      .addCase(getServiceById.pending, (state) => {
        state.loading.fetchById = true;
        state.error.fetchById = null;
      })

      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading.fetchById = false;

        state.selectedService = action.payload;
      })

      .addCase(getServiceById.rejected, (state, action) => {
        state.loading.fetchById = false;

        state.error.fetchById = getErrorMessage(
          action.payload,
          "Failed to fetch service.",
        );
      });

    // =========================================
    // GET SERVICES BY IDS
    // =========================================

    builder
      .addCase(getServicesByIds.pending, (state) => {
        state.loading.fetchByIds = true;
        state.error.fetchByIds = null;
      })

      .addCase(getServicesByIds.fulfilled, (state, action) => {
        state.loading.fetchByIds = false;

        state.services = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(getServicesByIds.rejected, (state, action) => {
        state.loading.fetchByIds = false;

        state.error.fetchByIds = getErrorMessage(
          action.payload,
          "Failed to fetch services.",
        );
      });

    // =========================================
    // GET SERVICES BY CATEGORY ID
    // =========================================

    builder
      .addCase(getServicesByCategoryId.pending, (state) => {
        state.loading.fetchByCategory = true;
        state.error.fetchByCategory = null;
      })

      .addCase(getServicesByCategoryId.fulfilled, (state, action) => {
        state.loading.fetchByCategory = false;

        state.categoryServices = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(getServicesByCategoryId.rejected, (state, action) => {
        state.loading.fetchByCategory = false;

        state.error.fetchByCategory = getErrorMessage(
          action.payload,
          "Failed to fetch category services.",
        );
      });

    // =========================================
    // GET SERVICES BY CATEGORY + SALON
    // =========================================

    builder
      .addCase(getServicesByCategoryAndSalon.pending, (state) => {
        state.loading.fetchByCategoryAndSalon = true;
        state.error.fetchByCategoryAndSalon = null;
      })

      .addCase(getServicesByCategoryAndSalon.fulfilled, (state, action) => {
        state.loading.fetchByCategoryAndSalon = false;

        state.categoryServices = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(getServicesByCategoryAndSalon.rejected, (state, action) => {
        state.loading.fetchByCategoryAndSalon = false;

        state.error.fetchByCategoryAndSalon = getErrorMessage(
          action.payload,
          "Failed to fetch category services.",
        );
      });

    // =========================================
    // DELETE SERVICE
    // =========================================

    builder
      .addCase(deleteService.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
        state.success.delete = false;
      })

      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.success.delete = true;

        const serviceId = action.payload?.serviceId;

        // Remove from main services list
        state.services = state.services.filter(
          (service) => service.id !== serviceId,
        );

        // Remove from category services list
        state.categoryServices = state.categoryServices.filter(
          (service) => service.id !== serviceId,
        );

        // Clear selected service if deleted
        if (state.selectedService?.id === serviceId) {
          state.selectedService = null;
        }
      })

      .addCase(deleteService.rejected, (state, action) => {
        state.loading.delete = false;

        state.error.delete = getErrorMessage(
          action.payload,
          "Failed to delete service.",
        );

        state.success.delete = false;
      });

    // =========================================
    // DELETE ALL SERVICES BY CATEGORY
    // =========================================

    builder
      .addCase(deleteServicesByCategoryId.pending, (state) => {
        state.loading.deleteByCategory = true;
        state.error.deleteByCategory = null;
        state.success.deleteByCategory = false;
      })

      .addCase(deleteServicesByCategoryId.fulfilled, (state, action) => {
        state.loading.deleteByCategory = false;
        state.success.deleteByCategory = true;

        const categoryId = action.payload?.categoryId;

        // Remove all services belonging to category
        state.services = state.services.filter(
          (service) => service.categoryId !== categoryId,
        );

        state.categoryServices = state.categoryServices.filter(
          (service) => service.categoryId !== categoryId,
        );

        // Clear selected service if it belongs to deleted category
        if (state.selectedService?.categoryId === categoryId) {
          state.selectedService = null;
        }
      })

      .addCase(deleteServicesByCategoryId.rejected, (state, action) => {
        state.loading.deleteByCategory = false;

        state.error.deleteByCategory = getErrorMessage(
          action.payload,
          "Failed to delete category services.",
        );

        state.success.deleteByCategory = false;
      });
  },
});

// =========================================
// EXPORT ACTIONS
// =========================================

export const {
  clearSelectedService,
  clearServiceErrors,
  clearServiceSuccess,
  resetServiceOfferingState,
} = serviceOfferingSlice.actions;

// =========================================
// EXPORT REDUCER
// =========================================

export default serviceOfferingSlice.reducer;
