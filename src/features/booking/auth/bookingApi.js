import api from "../../../api/axios";

/* =========================================================
   BASE URL
========================================================= */

const BASE_URL = "/booking";

/* =========================================================
   BOOKING API
========================================================= */

export const bookingApi = {
  /* =======================================================
     CREATE BOOKING
     
     POST /booking
     
     Backend:
     @PostMapping
     @RequestParam PaymentMethod paymentMethod
     
     Body:
     BookingRequest
     
     Response:
     PaymentLinkResponse
  ======================================================= */

  createBooking(bookingRequest, paymentMethod) {
    return api.post(BASE_URL, bookingRequest, {
      params: {
        paymentMethod,
      },
    });
  },

  /* =======================================================
     GET CUSTOMER BOOKINGS
     
     GET /booking/customer
     
     JWT is automatically sent by the shared Axios
     interceptor.
  ======================================================= */

  getCustomerBookings() {
    return api.get(`${BASE_URL}/customer`);
  },

  /* =======================================================
     GET BOOKINGS BY SALON
     
     GET /booking/salon?salonId={salonId}
  ======================================================= */

  getSalonBookings(salonId) {
    return api.get(`${BASE_URL}/salon`, {
      params: {
        salonId,
      },
    });
  },

  /* =======================================================
     GET BOOKING BY ID
     
     GET /booking/{bookingId}
  ======================================================= */

  getBookingById(bookingId) {
    return api.get(`${BASE_URL}/${bookingId}`);
  },

  /* =======================================================
     UPDATE BOOKING STATUS
     
     PUT /booking/{bookingId}/status?status={status}
  ======================================================= */

  updateBookingStatus(bookingId, status) {
    return api.put(`${BASE_URL}/${bookingId}/status`, null, {
      params: {
        status,
      },
    });
  },

  /* =======================================================
     GET BOOKED SLOTS
     
     GET /booking/slot/salon/{salonId}/date/{date}
     
     Example:
     /booking/slot/salon/10/date/2026-08-10
  ======================================================= */

  getBookedSlots(salonId, date) {
    return api.get(`${BASE_URL}/slot/salon/${salonId}/date/${date}`);
  },

  /* =======================================================
     GET SALON BOOKING REPORT
     
     GET /booking/report?salonId={salonId}
  ======================================================= */

  getBookingReport(salonId) {
    return api.get(`${BASE_URL}/report`, {
      params: {
        salonId,
      },
    });
  },
};
