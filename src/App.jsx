import React from 'react'
import './App.css'
import { useAuth } from './context/AuthContext'
import { Navigate, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
const App = () => {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  return (

    <Routes>
      <Route path="/login" element={!user ? < Login /> : <Navigate to='/dashboard' />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/login' />} />
      <Route path='*' element={<Navigate to="/login" />} />
    </Routes>

  )
}

export default App