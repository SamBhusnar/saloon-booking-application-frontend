import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_ENDPOINTS = ["/auth/login", "/auth/signup", "/auth/refresh-token"];

api.interceptors.request.use(
  (config) => {
    const url = config.url ?? "";

    const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) =>
      url.includes(endpoint),
    );

    if (isAuthEndpoint) {
      return config;
    }

    let auth = null;

    try {
      auth = JSON.parse(localStorage.getItem("auth"));
    } catch {
      localStorage.removeItem("auth");
    }

    if (auth?.accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ===========================
   RESPONSE INTERCEPTOR
=========================== */
let isRefreshing = false;
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Don't retry more than once
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Access token expired

    const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) =>
      url.includes(endpoint),
    );

    if (
      error.response?.status === 401 && !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const auth = JSON.parse(localStorage.getItem("auth"));

        if (!auth?.refreshToken) {
          throw new Error("Refresh token not found");
        }

        // Call refresh token endpoint

        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
            null,
            {
              params: {
                refreshToken: auth.refreshToken,
              },
            },
          );
        }

        const refreshResponse = await refreshPromise;

        const newAuth = {
          user: refreshResponse.data.profile,

          accessToken: refreshResponse.data.accessToken,
          refreshToken: refreshResponse.data.refreshToken,

          tokenType: refreshResponse.data.tokenType,

          expiresIn: refreshResponse.data.expiresIn,
          refreshExpiresIn: refreshResponse.data.refreshExpiresIn,

          status: "authenticated",
        };

        /* =========================
                      UPDATE REDUX
                    ========================= */

        store.dispatch(restoreSession(newAuth));

        /* =========================
                      UPDATE LOCAL STORAGE
                    ========================= */

        localStorage.setItem("auth", JSON.stringify(newAuth));

        /* =========================
                      RETRY ORIGINAL REQUEST
                    ========================= */

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${refreshResponse.data.accessToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        /* =========================
           REFRESH TOKEN EXPIRED
        ========================= */

        localStorage.removeItem("auth");

        store.dispatch(logout());

        window.location.replace("/login");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
