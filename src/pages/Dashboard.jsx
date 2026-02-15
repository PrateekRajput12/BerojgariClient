import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();

    const renderRoleContent = () => {
        switch (user?.role) {
            case "HR":
                return [
                    { title: "Manage Recruiters", desc: "View and manage all recruiters" },
                    { title: "Company Reports", desc: "Analytics and hiring reports" },
                    { title: "Post Announcements", desc: "Notify company employees" },
                ];

            case "Recruiter":
                return [
                    { title: "Post New Job", desc: "Create and publish job openings" },
                    { title: "View Applications", desc: "Review candidate applications" },
                    { title: "Schedule Interviews", desc: "Assign interviews easily" },
                ];

            case "Interviewer":
                return [
                    { title: "My Interviews", desc: "View assigned interviews" },
                    { title: "Submit Feedback", desc: "Give interview feedback" },
                    { title: "Candidate Profiles", desc: "Review candidate details" },
                ];

            case "Candidate":
                return [
                    { title: "Browse Jobs", desc: "Find jobs that match your skills" },
                    { title: "My Applications", desc: "Track your job applications" },
                    { title: "Interview Status", desc: "Check interview updates" },
                ];

            default:
                return [];
        }
    };

    const cards = renderRoleContent();

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <div className="bg-white shadow-sm px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-xl font-bold text-purple-600">
                    AlwaysApply
                </h1>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                    <span className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                        Welcome, <span className="font-semibold">{user?.name}</span>
                    </span>

                    <button
                        onClick={logout}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-purple-100 py-16 px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                    Dashboard - {user?.role}
                </h2>
                <p className="text-gray-600 mt-3">
                    Manage your activities and explore features based on your role.
                </p>
            </div>

            {/* Cards Section */}
            <div className="max-w-6xl mx-auto py-12 px-6">
                <h3 className="text-xl font-semibold mb-8 text-gray-700">
                    Your Quick Actions
                </h3>

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
                        >
                            <h4 className="text-lg font-semibold text-gray-800">
                                {card.title}
                            </h4>
                            <p className="text-gray-500 text-sm mt-2">
                                {card.desc}
                            </p>

                            <button className="mt-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                                Access
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-purple-50 py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} AlwaysApply. All rights reserved.
            </div>
        </div>
    );
};

export default Dashboard;
