import api from "../../../api/axios";

const BASE_URL = "/service-offering";

export const serviceOfferingApi = {
  // =========================================
  // CREATE SERVICE OFFERING
  // POST /api/service-offering/salon-owner
  // multipart/form-data
  // =========================================
  createService(serviceOffering, image) {
    const formData = new FormData();

    formData.append(
      "serviceOfferingDto",
      new Blob([JSON.stringify(serviceOffering)], {
        type: "application/json",
      }),
    );

    if (image) {
      formData.append("image", image);
    }

    return api.post(`${BASE_URL}/salon-owner`, formData);
  },

  // =========================================
  // UPDATE SERVICE OFFERING
  // PUT /api/service-offering/salon-owner/{serviceId}
  // multipart/form-data
  // =========================================
  updateService(serviceId, serviceOffering, image) {
    const formData = new FormData();

    formData.append(
      "serviceOfferingDto",
      new Blob([JSON.stringify(serviceOffering)], {
        type: "application/json",
      }),
    );

    if (image) {
      formData.append("image", image);
    }

    return api.put(`${BASE_URL}/salon-owner/${serviceId}`, formData);
  },

  // =========================================
  // GET ALL SERVICES OF A SALON
  // GET /api/service-offering/salon/{salonId}
  //
  // Optional:
  // ?categoryId={categoryId}
  // =========================================
  getServicesBySalonId(salonId, categoryId = null) {
    return api.get(`${BASE_URL}/salon/${salonId}`, {
      params: categoryId ? { categoryId } : {},
    });
  },

  // =========================================
  // GET SERVICE BY ID
  // GET /api/service-offering/{id}
  // =========================================
  getServiceById(serviceId) {
    return api.get(`${BASE_URL}/${serviceId}`);
  },

  // =========================================
  // GET SERVICES BY IDS
  // GET /api/service-offering/list/{ids}
  //
  // Example:
  // /list/1,2,3
  // =========================================
  getServicesByIds(ids) {
    return api.get(`${BASE_URL}/list/${ids.join(",")}`);
  },

  // =========================================
  // GET ALL SERVICES OF A CATEGORY
  // GET /api/service-offering/category/{categoryId}
  // =========================================
  getServicesByCategoryId(categoryId) {
    return api.get(`${BASE_URL}/category/${categoryId}`);
  },

  // =========================================
  // GET SERVICES BY CATEGORY + SALON
  // GET /api/service-offering/category/{categoryId}/salon/{salonId}
  // =========================================
  getServicesByCategoryAndSalon(categoryId, salonId) {
    return api.get(`${BASE_URL}/category/${categoryId}/salon/${salonId}`);
  },

  // =========================================
  // DELETE SERVICE OFFERING
  // DELETE /api/service-offering/salon-owner/{serviceId}/{salonId}/{categoryId}
  // =========================================
  deleteService(serviceId, salonId, categoryId) {
    return api.delete(
      `${BASE_URL}/salon-owner/${serviceId}/${salonId}/${categoryId}`,
    );
  },

  // =========================================
  // DELETE ALL SERVICES OF A CATEGORY
  //
  // DELETE /api/service-offering/salon-owner/{categoryId}
  //
  // Used internally by category-service when
  // deleting a category.
  // =========================================
  deleteServicesByCategoryId(categoryId) {
    return api.delete(`${BASE_URL}/salon-owner/${categoryId}`);
  },
};
