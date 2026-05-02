import axios from "axios";

const api = axios.create({
    baseURL:  "https://fundonote-com-11.onrender.com", 
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;