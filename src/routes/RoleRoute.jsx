import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RoleRoute = ({ allowedRoles, children }) => {
    const { user, loading } = useAuth()

    if (loading) return <p>Loading...</p>
    if (!user) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to='/dashboard' />
    }
    return children
}

export default RoleRoute