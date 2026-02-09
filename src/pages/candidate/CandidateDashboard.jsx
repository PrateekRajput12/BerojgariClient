import React from 'react'
import { useAuth } from '../../context/AuthContext'

const CandidateDashboard = () => {
    const { user } = useAuth()
    return (
        <div style={{ padding: "50px" }}>
            <h2>Candidate Dashboard</h2>
            <p>Welcome {user?.name}</p>
        </div>)
}

export default CandidateDashboard