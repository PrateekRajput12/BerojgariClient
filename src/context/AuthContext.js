import { createContext, useContext, useState } from "react";

import api from "../api/axios";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = async (data) => {

        const res = await api.post('/login', data)
        console.log("Loin res", res)
        setUser(res.data.user)
    }

    const logout = async () => {
        await api.post("/logout")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)