import { useState, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { restoreSession } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

useEffect(() => {
  try {
    const auth = localStorage.getItem("auth");

    if (auth) {
      dispatch(restoreSession(JSON.parse(auth)));
    }
  } catch (error) {
    localStorage.removeItem("auth");
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
