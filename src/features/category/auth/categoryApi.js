import api from "../../../api/axios";

const BASE_URL = "/categories";

export const categoryApi = {
  // =========================================
  // CREATE CATEGORY
  // POST /api/categories/salon-owner
  // =========================================
  createCategory(formData) {
    return api.post(`${BASE_URL}/salon-owner`, formData);
  },

  // =========================================
  // GET ALL CATEGORIES OF A SALON
  // GET /api/categories/salon/{salonId}
  // =========================================
  getCategoriesBySalonId(salonId) {
    return api.get(`${BASE_URL}/salon/${salonId}`);
  },

  // =========================================
  // GET CATEGORY BY ID
  // GET /api/categories/{id}
  // =========================================
  getCategoryById(categoryId) {
    return api.get(`${BASE_URL}/${categoryId}`);
  },

  // =========================================
  // DELETE CATEGORY
  // DELETE /api/categories/salon-owner/{salonId}/{categoryId}
  // =========================================
  deleteCategory(salonId, categoryId) {
    return api.delete(`${BASE_URL}/salon-owner/${salonId}/${categoryId}`);
  },
};
