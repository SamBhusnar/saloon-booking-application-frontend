import { useEffect } from "react";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";

import { Toaster } from "react-hot-toast";

import { useDispatch } from "react-redux";

import { restoreSession, setUnauthenticated } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const authData = localStorage.getItem("auth");

      if (!authData) {
        dispatch(setUnauthenticated());
        return;
      }

      const parsedAuth = JSON.parse(authData);

      if (!parsedAuth?.user || !parsedAuth?.accessToken) {
        localStorage.removeItem("auth");
        dispatch(setUnauthenticated());
        return;
      }

      dispatch(restoreSession(parsedAuth));
    } catch (error) {
      console.error("Failed to restore authentication:", error);

      localStorage.removeItem("auth");

      dispatch(setUnauthenticated());
    }
  }, [dispatch]);

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
