import axios from "axios";

const api = axios.create({
    baseURL: "https://fundonote-com-7.onrender.com", // ✅ your deployed backend
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;