import api from "../../../api/axios";

/* =========================================================
   BASE URL
========================================================= */

const BASE_URL = "/payments";

/* =========================================================
   PAYMENT API
========================================================= */

export const paymentApi = {
  /* =======================================================
     GET ALL PAYMENTS OF CURRENT LOGGED-IN SALON OWNER

     GET /payments/salon_owner

     Backend identifies the salon owner from JWT.

     The salon owner can have multiple salons, therefore
     backend returns payments belonging to all salons
     owned by the currently authenticated salon owner.

     JWT is automatically sent by the shared Axios
     interceptor.
  ======================================================= */

  getSalonOwnerPayments() {
    return api.get(`${BASE_URL}/salon_owner`);
  },
};
