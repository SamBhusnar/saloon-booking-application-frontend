import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "./authApi";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await authApi.login(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

export const register = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      const response = await authApi.register(user);
      return response.data;
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const getHomeRoute = (roles) => {
  if (roles.includes("ADMIN")) return "/admin";
  if (roles.includes("SALON_OWNER")) return "/owner";
  return "/customer";
};