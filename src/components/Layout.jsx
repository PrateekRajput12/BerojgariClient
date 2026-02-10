import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify'

const Layout = ({ children }) => {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Navbar />
                <div style={{ padding: "20px" }}>
                    {children}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Layout