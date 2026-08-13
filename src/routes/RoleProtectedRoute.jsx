import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleProtectedRoute({ allowedRoles }) {
  const { status, user } = useSelector((state) => state.auth);

  /*
   * Session restoration has not completed.
   */
  if (status === "idle") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-sm text-slate-500">Checking permissions...</p>
        </div>
      </div>
    );
  }

  /*
   * Definitely not authenticated.
   */
  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  /*
   * We should only reach here when authenticated.
   */
  if (status !== "authenticated") {
    return null;
  }

  const userRoles = user?.roles || [];

  const isAuthorized = allowedRoles.some((role) => userRoles.includes(role));

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;
