import React from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth()
    return (
        <div style={{
            background: "#f1f5f9",
            padding: "15px",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <div>
                <strong>{user?.role} Panel</strong>
            </div>
            <div>
                {user?.name} |
                <button onClick={logout} style={{ marginLeft: "10px" }}>
                    Logout
                </button>
                <button onClick={toggleSidebar}>
                    ☰
                </button>
            </div>
        </div>
    )
}

export default Navbar