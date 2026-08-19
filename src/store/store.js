import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import salonReducer from "../features/redux/salonSlice";
import categoryReducer from "../features/category/auth/categorySlice";
import serviceOffering from "../features/service/auth/serviceOfferingSlice";
import bookingReducer from "../features/booking/auth/bookingSlice"; 
import paymentSlice from "../features/payment/auth/paymentSlice";
import reviewReducer from "../features/review/auth/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    salon: salonReducer,
    category: categoryReducer,
    serviceOffering: serviceOffering,
    booking: bookingReducer,
    payments: paymentSlice,
    review: reviewReducer
  },
});
