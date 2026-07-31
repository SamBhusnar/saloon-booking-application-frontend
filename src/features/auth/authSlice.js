import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  roles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.roles = action.payload.roles;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.roles = [];
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
