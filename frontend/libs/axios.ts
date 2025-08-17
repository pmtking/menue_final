import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
const COOKIE_NAME = "userToken";

const BASE_URL = 'http://171.22.26.36:8080/' 
const BASE_URL1 = 'http://localhost:8080/' 
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie(COOKIE_NAME); // گرفتن توکن از کوکی
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      "➡️ Request:",
      config.method?.toUpperCase(),
      config.url,
      config
    );
    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error.message);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("❌ Response Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("❌ No Response:", error.request);
    } else {
      console.error("❌ General Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
