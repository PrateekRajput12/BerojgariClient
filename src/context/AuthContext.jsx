import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getMe = async () => {
        try {
            const res = await api.get("/auth/me")
            console.log("fetch me in context", res)
            setUser(res.data.user)
        } catch (error) {
            toast.error(error.message)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        await api.post('/auth/login', { email, password })
        const res = await api.get("/auth/me")
        setUser(res.data.user)
        return res.data.user
    }

    const logout = async () => {
        await api.post("/auth/logout")
        setUser(null)
        toast.success("Logged out successfully")
        window.location.replace("/login")
    }

    useEffect(() => {
        getMe()
    }, [])
    return (
        <AuthContext.Provider value={{ user, login, logout, loading, }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)