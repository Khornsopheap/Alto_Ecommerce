import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const api = axios.create({
    baseURL: API_URL,
    headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("auth_token");
        }
        return Promise.reject(error);
    }
);

export const BACKEND_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

export function resolveImage(path) {
  if (!path) return null;
  return `${BACKEND_URL}${path}`;
}

export default api;