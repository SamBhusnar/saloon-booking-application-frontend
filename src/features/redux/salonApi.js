import api from "../../api/axios";

const BASE_URL = "/salons";

export const salonApi = {
  createSalon(formData) {
    return api.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateSalon(id, formData) {
    return api.patch(`${BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getOwnerSalons() {
    return api.get(`${BASE_URL}/owner`);
  },

  getSalonById(id) {
    return api.get(`${BASE_URL}/${id}`);
  },

  getAllSalons() {
    return api.get(BASE_URL);
  },

  searchSalon(city) {
    return api.get(`${BASE_URL}/search`, {
      params: {
        city,
      },
    });
  },

  deleteSalon(id) {
    return api.delete(`${BASE_URL}/${id}`);
  },

  deleteSalonImage(salonId, publicId) {
    return api.delete(`${BASE_URL}/image/${salonId}/${publicId}`);
  },
};
