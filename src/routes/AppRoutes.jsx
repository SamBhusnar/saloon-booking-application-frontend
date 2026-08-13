import { Routes, Route } from "react-router-dom";

// ================= PUBLIC PAGES =================

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BecomeMemberPage from "../pages/BecomeMemberPage";

// ================= LAYOUTS =================

import OwnerLayout from "../layouts/OwnerLayout";

// ================= PROTECTED ROUTES =================

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

// ================= SHARED SALON / BOOKING PAGES =================
// These pages are available to CUSTOMER, SALON_OWNER and ADMIN.

import SalonDiscoveryPage from "../pages/common/SalonDiscoveryPage";
import SalonDetailsPage from "../pages/common/SalonDetailsPage";
import BookingDetailsPage from "../pages/common/BookingDetailsPage";
import BookingListPage from "../pages/common/BookingListPage";
import BookingInformationPage from "../pages/common/BookingInformationPage";

// ================= PAYMENT PAGES =================

import PaymentSuccessPage from "../pages/payment/PaymentSuccessPage";

// ================= OWNER SALON PAGES =================

import SalonListPage from "../pages/owner/salon/SalonListPage";
import CreateSalonPage from "../pages/owner/salon/CreateSalonPage";
import EditSalonPage from "../pages/owner/salon/EditSalonPage";

// ================= OWNER CATEGORY PAGES =================

import CategoryListPage from "../pages/owner/category/CategoryListPage";
import CreateCategoryPage from "../pages/owner/category/CreateCategoryPage";

// ================= OWNER SERVICE PAGES =================

import ServiceListPage from "../pages/owner/service/ServiceListPage";
import CreateServicePage from "../pages/owner/service/CreateServicePage";
import EditServicePage from "../pages/owner/service/EditServicePage";

function AppRoutes() {
  return (
    <Routes>
      {/* =========================================================
          PUBLIC ROUTES
      ========================================================= */}

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/become-member" element={<BecomeMemberPage />} />

      {/* =========================================================
          ALL AUTHENTICATED USERS
          
          CUSTOMER
          SALON_OWNER
          ADMIN
      ========================================================= */}

      <Route element={<ProtectedRoute />}>
        {/* =======================================================
            CUSTOMER ROUTES
        ======================================================= */}

        <Route path="/customer">
          {/* Salon discovery */}

          <Route path="booking/salons" element={<SalonDiscoveryPage />} />

          <Route
            path="booking/salons/:salonId"
            element={<SalonDetailsPage />}
          />

          {/* Booking creation */}

          <Route
            path="salons/booking/details"
            element={<BookingDetailsPage />}
          />

          {/* My bookings */}

          <Route path="booking/list" element={<BookingListPage />} />

          {/* Booking information */}

          <Route
            path="booking/information/:bookingId"
            element={<BookingInformationPage />}
          />

          {/* Payment */}

          <Route
            path="payment-success/:bookingId"
            element={<PaymentSuccessPage />}
          />
        </Route>

        {/* =======================================================
            ADMIN ROUTES
        ======================================================= */}

        <Route path="/admin">
          {/* Salon discovery */}

          <Route path="booking/salons" element={<SalonDiscoveryPage />} />

          <Route
            path="booking/salons/:salonId"
            element={<SalonDetailsPage />}
          />

          {/* Booking creation */}

          <Route
            path="salons/booking/details"
            element={<BookingDetailsPage />}
          />

          {/* My bookings */}

          <Route path="booking/list" element={<BookingListPage />} />

          {/* Booking information */}

          <Route
            path="booking/information/:bookingId"
            element={<BookingInformationPage />}
          />

          {/* Payment */}

          <Route
            path="payment-success/:bookingId"
            element={<PaymentSuccessPage />}
          />
        </Route>

        {/* =======================================================
            SALON OWNER + ADMIN
            OWNER MANAGEMENT AREA
        ======================================================= */}

        <Route
          element={
            <RoleProtectedRoute allowedRoles={["SALON_OWNER", "ADMIN"]} />
          }
        >
          <Route path="/owner" element={<OwnerLayout />}>
            {/* =================================================
                OWNER SALON MANAGEMENT
            ================================================= */}

            <Route path="salons" element={<SalonListPage />} />

            <Route path="salons/create" element={<CreateSalonPage />} />

            <Route path="salons/edit/:salonId" element={<EditSalonPage />} />

            {/* =================================================
                OWNER CATEGORY MANAGEMENT
            ================================================= */}

            <Route
              path="salons/:salonId/categories"
              element={<CategoryListPage />}
            />

            <Route
              path="salons/:salonId/categories/create"
              element={<CreateCategoryPage />}
            />

            {/* =================================================
                OWNER SERVICE MANAGEMENT
            ================================================= */}

            <Route
              path="salons/:salonId/categories/:categoryId/services"
              element={<ServiceListPage />}
            />

            <Route
              path="salons/:salonId/categories/:categoryId/services/create"
              element={<CreateServicePage />}
            />

            <Route
              path="salons/:salonId/categories/:categoryId/services/edit/:serviceId"
              element={<EditServicePage />}
            />

            {/* =================================================
                OWNER BOOKING FLOW
            ================================================= */}

            <Route path="booking/salons" element={<SalonDiscoveryPage />} />

            <Route
              path="booking/salons/:salonId"
              element={<SalonDetailsPage />}
            />

            <Route
              path="salons/booking/details"
              element={<BookingDetailsPage />}
            />

            {/* My bookings */}

            <Route path="booking/list" element={<BookingListPage />} />

            {/* Booking information */}

            <Route
              path="booking/information/:bookingId"
              element={<BookingInformationPage />}
            />

            {/* Payment */}

            <Route
              path="payment-success/:bookingId"
              element={<PaymentSuccessPage />}
            />
          </Route>
        </Route>
      </Route>

      {/* =========================================================
          FUTURE COMMON ROUTES
      ========================================================= */}

      {/* <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      /> */}

      {/* <Route
        path="*"
        element={<NotFoundPage />}
      /> */}
    </Routes>
  );
}

export default AppRoutes;
