import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BecomeMemberPage from "../pages/BecomeMemberPage";

// Layouts
import CustomerLayout from "../layouts/CustomerLayout";
import OwnerLayout from "../layouts/OwnerLayout";

// Protected Routes
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

// Customer Pages
// import CustomerDashboardPage from "../pages/customer/CustomerDashboardPage";
// import CustomerBookingsPage from "../pages/customer/CustomerBookingsPage";
// import CustomerProfilePage from "../pages/customer/CustomerProfilePage";

// Owner Pages
// import OwnerDashboardPage from "../pages/owner/OwnerDashboardPage";
// import SalonPage from "../pages/owner/SalonPage";
// import CategoryPage from "../pages/owner/CategoryPage";
// import ServicePage from "../pages/owner/ServicePage";
// import AnalyticsPage from "../pages/owner/AnalyticsPage";

function AppRoutes() {
  return (
    
      <Routes>
        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/become-member" element={<BecomeMemberPage />} />

        {/* ================ PROTECTED ================ */}

        <Route element={<ProtectedRoute />}>
          {/* CUSTOMER */}

          <Route path="/customer" element={<CustomerLayout />}>
            {/* <Route index element={<CustomerDashboardPage />} /> */}

            {/* <Route path="salons" element={<SalonListPage />} /> */}

            {/* <Route path="bookings" element={<CustomerBookingsPage />} /> */}

            {/* <Route path="profile" element={<CustomerProfilePage />} /> */}
          </Route>

          {/* OWNER */}

          <Route
            element={
              <RoleProtectedRoute allowedRoles={["SALON_OWNER", "ADMIN"]} />
            }
          >
            <Route path="/owner" element={<OwnerLayout />}>
              {/* <Route index element={<OwnerDashboardPage />} /> */}

              {/* <Route path="salons" element={<SalonPage />} /> */}

              {/* <Route path="categories" element={<CategoryPage />} /> */}

              {/* <Route path="services" element={<ServicePage />} /> */}

              {/* <Route path="analytics" element={<AnalyticsPage />} /> */}
            </Route>
          </Route>
        </Route>

        {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
     
  );
}

export default AppRoutes;
