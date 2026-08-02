import api from "../../api/axios";

const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response;
};

const register = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response;
};

const becomeMember = async (data) => {
  const response = await api.post("/auth/become-member", data);
  return response;
};

const refreshToken = async (refreshToken) => {
  const response = await api.post("/auth/refresh-token", {
    refreshToken,
  });

  return response;
};

const logout = async () => {
  const response = await api.post("/auth/logout");
  return response;
};

export default {
  login,
  register,
  becomeMember,
  refreshToken,
  logout,
};
