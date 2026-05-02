import api from '../Services/axiosServices'

// Signup
export const signup = async (userData) => {
    try {
        const res = await api.post("/auth/signup", userData);
        return res.data;
    } catch (error) {
        throw error.response?.data?.detail || "Signup failed";
    }
};

// Login
export const login = async (email, password) => {
    try {
        const res = await api.post("/auth/login", {
            email,
            password,
        });

        // If backend returns token → store it
        if (res.data.access_token) {
            localStorage.setItem("token", res.data.access_token);
        }

        return res.data;
    } catch (error) {
        throw error.response?.data?.detail || "Invalid credentials";
    }
};