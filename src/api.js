import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL; // Your backend URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = (userData) => api.post("/users", userData);
export const login = (credentials) => api.post("/users/login", credentials);
export const getProfile = () => api.get("/users/me");
export const chat = (msgs) => api.post("/chat", msgs);
export const logoutAll = () => api.post("/users/logout");
export const mail = () => api.post("/mail");
export const verifyOtp = (otp) => api.post("/verify", otp);

export default api;
