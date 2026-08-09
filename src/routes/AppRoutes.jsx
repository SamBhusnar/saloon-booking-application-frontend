
import { Routes, Route } from "react-router-dom";

// ================= PUBLIC PAGES =================

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BecomeMemberPage from "../pages/BecomeMemberPage";

// ================= LAYOUTS =================

import CustomerLayout from "../layouts/CustomerLayout";
import OwnerLayout from "../layouts/OwnerLayout";

// ================= PROTECTED ROUTES =================

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

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

// ================= CUSTOMER PAGES =================

// import CustomerDashboardPage from "../pages/customer/CustomerDashboardPage";
// import CustomerBookingsPage from "../pages/customer/CustomerBookingsPage";
// import CustomerProfilePage from "../pages/customer/CustomerProfilePage";

// ================= OWNER PAGES =================

// import OwnerDashboardPage from "../pages/owner/OwnerDashboardPage";
// import AnalyticsPage from "../pages/owner/AnalyticsPage";


function AppRoutes() {
  return (
    <Routes>

      {/* ===========================
          PUBLIC ROUTES
      =========================== */}

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/become-member"
        element={<BecomeMemberPage />}
      />


      {/* ===========================
          PROTECTED ROUTES
      =========================== */}

      <Route element={<ProtectedRoute />}>

        {/* ===========================
            CUSTOMER
        =========================== */}

        <Route
          path="/customer"
          element={<CustomerLayout />}
        >

          {/* <Route
            index
            element={<CustomerDashboardPage />}
          /> */}

          {/* <Route
            path="salons"
            element={<SalonListPage />}
          /> */}

          {/* <Route
            path="bookings"
            element={<CustomerBookingsPage />}
          /> */}

          {/* <Route
            path="profile"
            element={<CustomerProfilePage />}
          /> */}

        </Route>


        {/* ===========================
            OWNER
        =========================== */}

        <Route
          element={
            <RoleProtectedRoute
              allowedRoles={["SALON_OWNER", "ADMIN"]}
            />
          }
        >

          <Route
            path="/owner"
            element={<OwnerLayout />}
          >

            {/* ===========================
                OWNER DASHBOARD
            =========================== */}

            {/* <Route
              index
              element={<OwnerDashboardPage />}
            /> */}


            {/* ===========================
                SALON MANAGEMENT
            =========================== */}

            {/* Salon List */}

            <Route
              path="salons"
              element={<SalonListPage />}
            />

            {/* Create Salon */}

            <Route
              path="salons/create"
              element={<CreateSalonPage />}
            />

            {/* Edit Salon */}

            <Route
              path="salons/edit/:salonId"
              element={<EditSalonPage />}
            />


            {/* ===========================
                CATEGORY MANAGEMENT
            =========================== */}

            {/* Category List */}

            <Route
              path="salons/:salonId/categories"
              element={<CategoryListPage />}
            />

            {/* Create Category */}

            <Route
              path="salons/:salonId/categories/create"
              element={<CreateCategoryPage />}
            />


            {/* ===========================
                SERVICE MANAGEMENT
            =========================== */}

            {/* Service List */}

            <Route
              path="salons/:salonId/categories/:categoryId/services"
              element={<ServiceListPage />}
            />

            {/* Create Service */}

            <Route
              path="salons/:salonId/categories/:categoryId/services/create"
              element={<CreateServicePage />}
            />

            {/* Edit Service */}

            <Route
              path="salons/:salonId/categories/:categoryId/services/edit/:serviceId"
              element={<EditServicePage />}
            />


            {/* ===========================
                ANALYTICS
            =========================== */}

            {/* <Route
              path="analytics"
              element={<AnalyticsPage />}
            /> */}

          </Route>

        </Route>

      </Route>


      {/* ===========================
          COMMON PAGES
      =========================== */}

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


