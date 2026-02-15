import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useAuth();

    const linkClass =
        "block px-4 py-2 rounded-lg transition duration-200 hover:bg-slate-700";

    const activeClass = "bg-purple-600 text-white";

    const closeSidebar = () => {
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    return (
        <>
            {/* Sidebar */}
            <div
                className={`
                fixed md:static top-0 left-0 h-full 
                bg-slate-900 text-white w-64 p-6
                transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                md:translate-x-0 transition-transform duration-300 z-50
            `}
            >
                <h3 className="text-xl font-bold mb-6">HRMS</h3>

                {/* HR */}
                {user?.role === "HR" && (
                    <div className="space-y-3">
                        <NavLink onClick={closeSidebar} to="/hr"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Dashboard
                        </NavLink>

                        <NavLink onClick={closeSidebar} to="/hr/jobs"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Jobs
                        </NavLink>

                        <NavLink onClick={closeSidebar} to="/hr/interviews"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Interviews
                        </NavLink>

                        <NavLink onClick={closeSidebar} to="/hr/offers"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Offers
                        </NavLink>
                    </div>
                )}

                {/* Recruiter */}
                {user?.role === "Recruiter" && (
                    <div className="space-y-3">
                        <NavLink onClick={closeSidebar} to="/recruiter"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Dashboard
                        </NavLink>

                        <NavLink onClick={closeSidebar} to="/recruiter/applications"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Applications
                        </NavLink>
                    </div>
                )}

                {/* Interviewer */}
                {user?.role === "Interviewer" && (
                    <div className="space-y-3">
                        <NavLink onClick={closeSidebar} to="/interviewer"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Dashboard
                        </NavLink>

                        <NavLink onClick={closeSidebar} to="/interviewer/my-interviews"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            My Interviews
                        </NavLink>
                    </div>
                )}

                {/* Candidate */}
                {user?.role === "Candidate" && (
                    <div className="space-y-3">
                        <NavLink onClick={closeSidebar} to="/candidate"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Dashboard
                        </NavLink>

                        <NavLink onClick={closeSidebar} to="/candidate/jobs"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            Browse Jobs
                        </NavLink>

                        <NavLink onClick={closeSidebar} to="/candidate/offers"
                            className={({ isActive }) =>
                                `${linkClass} ${isActive ? activeClass : ""}`
                            }>
                            My Offers
                        </NavLink>
                    </div>
                )}
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;
