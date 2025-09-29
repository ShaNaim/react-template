import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import Cookies from "js-cookie";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 10000,
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    if (csrfToken) {
      config.headers = config.headers || {};
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(csrfToken);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("XSRF-TOKEN");

      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    if (error.response?.status === 419) {
      window.dispatchEvent(new CustomEvent("auth:csrf-expired"));
    }

    return Promise.reject(error);
  }
);

export { api };
export default api;
