// src/config.ts
export const API_BASE_URL = 
 process.env.NODE_ENV === "production"
    ? "https://swipe-backend-s632.onrender.com"
    : "http://localhost:5000";
