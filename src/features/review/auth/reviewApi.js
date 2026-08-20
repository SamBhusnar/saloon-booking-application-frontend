import api from "../../../api/axios";

/* =========================================================
   BASE URL
========================================================= */

const BASE_URL = "reviews";

/* =========================================================
   REVIEW API
========================================================= */

/*
 * GET /api/reviews/salon_owner
 *
 * Returns all reviews belonging to salons owned
 * by the currently authenticated salon owner.
 */
export const getReviewsByOwner = async () => {
  const response = await api.get(`/${BASE_URL}/salon_owner`);

  return response.data;
};

/*
 * GET /api/reviews/salon/{salonIds}
 *
 * Example:
 * /reviews/salon/18,19
 *
 * salonIds = [18, 19]
 */
export const getReviewsBySalonIds = async (salonIds) => {
  const ids = salonIds.join(",");

  const response = await api.get(`/${BASE_URL}/salon/${ids}`);

  return response.data;
};

/*
 * DELETE /api/reviews/{reviewId}
 */
export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/${BASE_URL}/${reviewId}`);

  return response.data;
};
