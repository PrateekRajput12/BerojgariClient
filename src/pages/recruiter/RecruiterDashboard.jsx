import React from 'react'
import { useAuth } from '../../context/AuthContext'
const RecruiterDashboard = () => {
    const { user } = useAuth()
    return (
        <div style={{ padding: "50px" }}>
            <h2>Recruiter Dashboard</h2>
            <p>Welcome {user?.name}</p>
        </div>)
}

export default RecruiterDashboard