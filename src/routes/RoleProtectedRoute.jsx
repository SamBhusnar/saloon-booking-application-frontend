import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleProtectedRoute({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  const userRoles = user?.roles || [];

  const isAuthorized = allowedRoles.some((role) => userRoles.includes(role));

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;
