import { useState, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getHomeRoute } from "./features/auth/authThunk";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const authData = localStorage.getItem("auth");

      if (!authData) return;

      const parsedAuth = JSON.parse(authData);

      dispatch(restoreSession(parsedAuth));

      navigate(getHomeRoute(parsedAuth.user.roles), { replace: true });
    } catch (error) {
      localStorage.removeItem("auth");
    }
  }, []);

  // useEffect(() => {
  //   try {
  //     const authData = localStorage.getItem("auth");

  //     if (!authData) return;

  //     const parsedAuth = JSON.parse(authData);

  //     dispatch(restoreSession(parsedAuth));

  //     const publicRoutes = ["/", "/login", "/register", "/become-member"];

  //     if (publicRoutes.includes(location.pathname)) {
  //       navigate(getHomeRoute(parsedAuth.user.roles), {
  //         replace: true,
  //       });
  //     }
  //   } catch {
  //     localStorage.removeItem("auth");
  //   }
  // }, []);

  return (
    <>
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
