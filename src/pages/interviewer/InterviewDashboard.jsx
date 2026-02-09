import React from 'react'
import { useAuth } from '../../context/AuthContext'

const InterviewDashboard = () => {
    const { user } = useAuth()
    return (
        <div style={{ padding: "50px" }}>
            <h2>Interviewer Dashboard</h2>
            <p>Welcome {user?.name}</p>
        </div>)
}

export default InterviewDashboard