import axios from "axios";

const API_URl = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/refresh-accesstoken");

    if (error.response?.status !== 401 || isAuthRoute || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${API_URl}/users/refresh-accesstoken`, {}, { withCredentials: true })
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;
      return axios(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("isAuthenticated");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  }
);
