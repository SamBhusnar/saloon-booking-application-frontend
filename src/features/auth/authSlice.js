import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./authThunk";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,

  accessToken: null,
  refreshToken: null,

  tokenType: "Bearer",

  expiresIn: null,
  refreshExpiresIn: null,

  isLoading: false,
  status: "idle",

  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreSession: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenType = action.payload.tokenType;
      state.expiresIn = action.payload.expiresIn;
      state.refreshExpiresIn = action.payload.refreshExpiresIn;
      state.status = action.payload.status;
      state.error = null;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem("auth");

      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenType = "Bearer";
      state.expiresIn = null;
      state.refreshExpiresIn = null;
      state.status = "unauthenticated";
      state.error = null;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.status = "authenticated";
      
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.profile,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            tokenType: action.payload.tokenType,
            expiresIn: action.payload.expiresIn,
            refreshExpiresIn: action.payload.refreshExpiresIn,
            status: "authenticated",
          }),
        );
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "unauthenticated";
      })
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.status = "idle";
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "unauthenticated";
      });
  },
});

export const { restoreSession, logout } = authSlice.actions;
export default authSlice.reducer;
