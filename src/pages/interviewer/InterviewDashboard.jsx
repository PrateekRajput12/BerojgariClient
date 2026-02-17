import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { roleDashboardData } from "../../data/roleDashboardData";
import { Link } from "react-router-dom";
const InterviewDashboard = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const cards = roleDashboardData[user?.role] || [];

    return (
        <div className="min-h-screen bg-gray-100">



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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <h4 className="text-lg font-semibold text-gray-800">
                                {card.title}
                            </h4>
                            <p className="text-gray-500 text-sm mt-2">
                                {card.desc}
                            </p>

                            <button className="mt-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                                <Link
                                    to={card.url}
                                >
                                    Access
                                </Link>                            </button>
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

export default InterviewDashboard;
