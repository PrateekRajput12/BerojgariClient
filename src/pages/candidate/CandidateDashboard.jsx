import React from "react";
import { useAuth } from "../../context/AuthContext";
import { roleDashboardData } from "../../data/roleDashboardData";

import DashboardHero from "../../components/dashboard/DashboardHero";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardFooter from "../../components/dashboard/DashboardFooter";

const CandidateDashboard = () => {
    const { user } = useAuth();

    const cards = roleDashboardData[user?.role] || [];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Hero Section */}
            <DashboardHero role={user?.role} />

            {/* Cards Section */}
            <div className="max-w-6xl mx-auto py-12 px-6 flex-1">
                <h3 className="text-xl font-semibold mb-8 text-gray-700">
                    Your Quick Actions
                </h3>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <DashboardCard
                            key={index}
                            title={card.title}
                            desc={card.desc}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
};

export default CandidateDashboard;
