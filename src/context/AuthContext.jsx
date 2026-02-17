import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getMe = async () => {
        try {
            const { data } = await api.get("/auth/me");
            setUser(data.user);
            return data.user;
        } catch (error) {
            // ✅ Don't toast here (user might not be logged in on refresh)
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            await api.post("/auth/login", { email, password });

            const me = await getMe(); // ✅ reuse same function
            if (!me) throw new Error("Login failed. Please try again.");
            return me;
        } catch (error) {
            const msg =
                error.response?.data?.message || error.message || "Login failed";
            throw new Error(msg);
        }
    };

    const register = async (formData) => {
        try {
            const { data } = await api.post("/auth/signup", formData);
            return data;
        } catch (error) {
            const msg =
                error.response?.data?.message || error.message || "Signup failed";
            throw new Error(msg);
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            // ignore
        } finally {
            setUser(null);
            toast.success("Logged out successfully");
            // ✅ no window.location.replace
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
