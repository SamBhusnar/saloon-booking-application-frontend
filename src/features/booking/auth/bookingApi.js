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
     GET ALL BOOKINGS OF A SALON WHICH BELONG TO THE CURRENT LOGGED IN USER
     
     GET /booking/salons
     
     JWT is automatically sent by the shared Axios
     interceptor.
  ======================================================= */

  getBookingsBySalonIdAndAuth() {
    return api.get(`${BASE_URL}/salons`);
  },

  /* =======================================================
     GET ALL customer of all salons which belong to the current logged in salon owner
     
     GET /booking/users
     
     JWT is automatically sent by the shared Axios
     interceptor.
  ======================================================= */

  getCustomersOfSalonAndAuth() {
    return api.get(`${BASE_URL}/users`);
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

  /* =======================================================
     GET CURRENT DAY BOOKING CHART

     GET /booking/chart?salonId={salonId}

     Returns:
     BookingChartDto
  ======================================================= */

  getBookingChart(salonId) {
    return api.get(`${BASE_URL}/chart/bookings/today`, {
      params: {
        salonId,
      },
    });
  },

  /* =======================================================
     GET BOOKING CHART BY DATE

     GET /booking/chart/date
         ?salonId={salonId}
         &date={date}

     Example:
     /booking/chart/date?salonId=18&date=2026-08-22

     Returns:
     BookingChartDto
  ======================================================= */

  getBookingChartByDate(salonId, date) {
    return api.get(`${BASE_URL}/chart/bookings/date`, {
      params: {
        salonId,
        date,
      },
    });
  },

  /* =======================================================
     GET BOOKING CHART BY DATE RANGE

     GET /booking/chart/range
         ?salonId={salonId}
         &startDate={startDate}
         &endDate={endDate}

     Example:
     /booking/chart/range
         ?salonId=18
         &startDate=2026-08-01
         &endDate=2026-08-22

     Returns:
     BookingChartDto
  ======================================================= */

  getBookingChartByDateRange(salonId, startDate, endDate) {
    return api.get(`${BASE_URL}/chart/bookings/range`, {
      params: {
        salonId,
        startDate,
        endDate,
      },
    });
  },

  /* =======================================================
     GET CURRENT DAY EARNING CHART

     GET /booking/earning?salonId={salonId}

     Returns:
     EarningChartDto
  ======================================================= */

  getEarningChart(salonId) {
    return api.get(`${BASE_URL}/chart/earnings/today`, {
      params: {
        salonId,
      },
    });
  },

  /* =======================================================
     GET EARNING CHART BY DATE

     GET /booking/earning/date
         ?salonId={salonId}
         &date={date}

     Example:
     /booking/earning/date?salonId=18&date=2026-08-22

     Returns:
     EarningChartDto
  ======================================================= */

  getEarningChartByDate(salonId, date) {
    return api.get(`${BASE_URL}/chart/earnings/date`, {
      params: {
        salonId,
        date,
      },
    });
  },

  /* =======================================================
     GET EARNING CHART BY DATE RANGE

     GET /booking/earning/range
         ?salonId={salonId}
         &startDate={startDate}
         &endDate={endDate}

     Example:
     /booking/earning/range
         ?salonId=18
         &startDate=2026-08-01
         &endDate=2026-08-22

     Returns:
     EarningChartDto
  ======================================================= */

  getEarningChartByDateRange(salonId, startDate, endDate) {
    return api.get(`${BASE_URL}/chart/earnings/range`, {
      params: {
        salonId,
        startDate,
        endDate,
      },
    });
  },
};

// charts
