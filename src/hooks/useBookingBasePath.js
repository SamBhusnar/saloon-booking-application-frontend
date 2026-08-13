import { useLocation } from "react-router-dom";

export function useBookingBasePath() {
  const location = useLocation();

  if (location.pathname.startsWith("/owner")) {
    return "/owner";
  }

  if (location.pathname.startsWith("/admin")) {
    return "/admin";
  }

  if (location.pathname.startsWith("/customer")) {
    return "/customer";
  }

  return null;
}

export default useBookingBasePath;
