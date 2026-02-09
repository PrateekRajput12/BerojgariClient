import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    const { user } = useAuth()

    return (
        <div style={{
            width: "220px",
            background: "#1e293b",
            color: "white",
            padding: "20px"
        }}>
            <h3>HRMS</h3>
            <hr />

            {user?.role === "HR" && (
                <>
                    <p><Link to="/hr" style={{ color: "white" }}>Dashboard</Link></p>
                    <p><Link to="/hr/jobs" style={{ color: "white" }}>Jobs</Link></p>
                    <p><Link to="/hr/interviews" style={{ color: "white" }}>Interviews</Link></p>
                    <p><Link to="/hr/offers" style={{ color: "white" }}>Offers</Link></p>
                </>
            )}

            {user?.role === "Recruiter" && (
                <>
                    <p><Link to="/recruiter" style={{ color: "white" }}>Dashboard</Link></p>
                    <p><Link to="/recruiter/applications" style={{ color: "white" }}>Applications</Link></p>
                </>
            )}

            {user?.role === "Interviewer" && (
                <>
                    <p><Link to="/interviewer" style={{ color: "white" }}>Dashboard</Link></p>
                    <p><Link to="/interviewer/my-interviews" style={{ color: "white" }}>My Interviews</Link></p>
                </>
            )}

            {user?.role === "Candidate" && (
                <>
                    <p><Link to="/candidate" style={{ color: "white" }}>Dashboard</Link></p>
                    <p><Link to="/candidate/jobs" style={{ color: "white" }}>Browse Jobs</Link></p>
                    <p><Link to="/candidate/offers" style={{ color: "white" }}>My Offers</Link></p>
                </>
            )}
        </div>
    )
}

export default Sidebar