import React from 'react'

const RecruiterDashboard = () => {
    const { user } = useAuth()
    return (
        <div style={{ padding: "50px" }}>
            <h2>Recruiter Dashboard</h2>
            <p>Welcome {user?.name}</p>
        </div>)
}

export default RecruiterDashboard