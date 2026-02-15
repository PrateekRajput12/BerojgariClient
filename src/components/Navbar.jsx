import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();

    return (
        <div className="bg-slate-100 shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center">

            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Mobile Hamburger */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden text-xl text-gray-700"
                >
                    ☰
                </button>

                <h1 className="font-bold text-gray-700 text-lg">
                    {user?.role} Panel
                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 text-sm sm:text-base">
                <span className="text-gray-600">
                    {user?.name}
                </span>

                <button
                    onClick={logout}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
