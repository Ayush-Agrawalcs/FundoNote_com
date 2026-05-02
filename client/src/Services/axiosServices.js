import axios from "axios";

const api = axios.create({
    baseURL: "https://fundonote-com-12.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;