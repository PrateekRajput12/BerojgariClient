import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const InterviewDashboard = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const linkClass =
        "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300";

    const activeClass =
        "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md";

    const normalClass =
        "text-gray-700 hover:bg-purple-50 hover:text-purple-600";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">

            {/* ================= NAVBAR ================= */}
            <div className="bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    AlwaysApply
                </h1>

                <div className="hidden md:flex items-center gap-6">
                    <span className="text-gray-600 text-sm">
                        Welcome,{" "}
                        <span className="font-semibold text-purple-600">
                            {user?.name}
                        </span>
                    </span>

                    <button
                        onClick={logout}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transform transition duration-300 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-purple-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* ================= MAIN SECTION ================= */}
            <div className="flex flex-1 relative">

                {/* Sidebar */}
                <div
                    className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 z-40
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    md:translate-x-0`}
                >
                    <h2 className="text-lg font-bold text-gray-700 mb-6">
                        Interviewer Panel
                    </h2>

                    <nav className="space-y-3">
                        <NavLink
                            to="/interviewer"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : normalClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/interviews/my"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : normalClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            My Interviews
                        </NavLink>

                        <NavLink
                            to="/interviewer/candidates"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : normalClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            Candidate Profiles
                        </NavLink>
                    </nav>
                </div>

                {/* Overlay for mobile */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Content */}
                <div className="flex-1 p-6 md:p-10 transition-all duration-500">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
                        Interviewer Dashboard
                    </h2>

                    <p className="text-gray-600 text-lg">
                        Welcome back,{" "}
                        <span className="font-semibold text-purple-600">
                            {user?.name}
                        </span>{" "}
                        👋
                    </p>

                    {/* Quick Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-lg font-semibold text-gray-700">
                                My Interviews
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                View and manage your assigned interviews.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Submit Feedback
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                Provide results and interview evaluations.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Candidate Profiles
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                Review candidate details and resumes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewDashboard;
