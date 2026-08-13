import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { status } = useSelector((state) => state.auth);

  const location = useLocation();

  /*
   * Session restoration has not completed yet.
   */
  if (status === "idle") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-sm text-slate-500">Restoring session...</p>
        </div>
      </div>
    );
  }

  /*
   * User is definitely not authenticated.
   */
  if (status === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  /*
   * Authenticated user can access protected routes.
   */
  if (status === "authenticated") {
    return <Outlet />;
  }

  /*
   * Avoid accidentally rendering protected
   * content for an unknown state.
   */
  return null;
}

export default ProtectedRoute;
