import api from "../../../api/axios";

/* =========================================================
   BASE URL
========================================================= */

const BASE_URL = "/reviews";

/* =========================================================
   REVIEW API
========================================================= */

export const reviewApi = {
  /* =======================================================
     GET ALL REVIEWS OF CURRENT LOGGED-IN SALON OWNER

     GET /reviews/salon_owner

     Backend identifies the salon owner from JWT.

     Returns:
     [
       {
         id,
         rating,
         reviewText,
         salonId,
         userId,
         userDto,
         createdAt,
         updatedAt
       }
     ]
  ======================================================= */

  getReviewsBySalonOwner() {
    return api.get(`${BASE_URL}/salon_owner`);
  },
};
