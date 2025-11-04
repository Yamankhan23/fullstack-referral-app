import axios from "axios";

const API_BASE_URL = "https://fullstack-referral-app.onrender.com/api"; // change to backend URL in production

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
    },
});

// Automatically include JWT token if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ---------- Auth APIs ----------
export const registerUser = (data: any) => api.post("/auth/register", data);
export const loginUser = (data: any) => api.post("/auth/login", data);

// ---------- Dashboard ----------
export const fetchDashboard = () =>
    api.get("/dashboard", { headers: { "Cache-Control": "no-store" } });

// ---------- Referrals ----------
export const fetchReferrals = () => api.get("/referrals");

// ---------- Purchase ----------
export const makePurchase = (data: any) => api.post("/purchases/buy", data);
