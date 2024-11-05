import { create } from "zustand";

import { registerUser,loginUser } from "../zServices/useAuth.services.js";

const getStoredUser = () => {
    const storedUser = localStorage.getItem("user");
    try {
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing stored user data:", error);
        // If data is invalid, remove it from localStorage
        localStorage.removeItem("user");
        return null;
    }
};

const userAuthStore = create((set)=>({
    user: getStoredUser(),
    error: null,
    isLoading: false,
    isAuthenticated: !!localStorage.getItem("user"),
    watchHistory: [],

    loginUser: async ({ userCredential, password }) => {
        set(() => ({ isLoading: true, error: null }));

        try {
            const response = await loginUser({ userCredential, password });
            const userData = response.data.data.user;
            const accessToken = response.data.data.accessToken;
            console.log(accessToken);
            console.log("response:::::::::",response);

            set({
                user: userData,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("accessToken",accessToken)
        } catch (error) {            
            set(() => ({
                error: error?.response?.data?.message || 'Login failed',
                isAuthenticated: false,
                isLoading: false
            }));
        }
    },

    register: async ({ email, name, password, address, phoneNumber }) => {
        set(() => ({ isLoading: true, error: null }));
    
        try {
            const response = await registerUser({ email, name, password, address, phoneNumber });
            const accessToken = response.data.data.accessToken;
    
            set({
                user: response.data.data.user,
                isAuthenticated: true,
                error: null,
            });
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            localStorage.setItem("accessToken", accessToken);
            set(() => ({ isLoading: false }));
    
        } catch (error) {
            console.error("Registration error details:", error); // Detailed error log
    
            set({
                error: error.response?.data?.message || 'Registration failed',
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },
    

    // Logout function
    logout: () => {
        try {
            set({
                user: null,
                isAuthenticated: false,
                error: null,
            });

            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        } catch (error) {
            set({
                error: error?.response?.data?.message,
            })
        }
    },
}));

export default userAuthStore;