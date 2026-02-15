import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            {/* Main Section */}
            <div className="flex flex-col flex-1">

                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>

            {/* Toasts */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Layout;
