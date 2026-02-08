import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { user, logout } = useAuth()

    return (
        <div style={{ padding: "50px" }}>
            <h2>Dashboard</h2>
            <p>Welcome: {user?.name}</p>
            <p>Role: {user?.role}</p>
            <button onClick={logout}>Logout</button>
        </div>)
}

export default Dashboard