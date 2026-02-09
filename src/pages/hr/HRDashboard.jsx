import React from 'react'
import { useAuth } from '../../context/AuthContext'

const HRDashboard = () => {
    const { user } = useAuth()

    return (
        <div style={{ padding: "50px" }}>
            <h2>HR Dashboard</h2>
            <p>Welcome {user?.name}</p>
        </div>)
}

export default HRDashboard