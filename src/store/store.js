import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import salonReducer from "../features/redux/salonSlice";
import categoryReducer from "../features/category/auth/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    salon: salonReducer,
    category: categoryReducer,
  },
});
