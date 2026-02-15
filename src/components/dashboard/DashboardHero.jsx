import React from "react";

const DashboardHero = ({ role }) => {
    return (
        <div className="bg-purple-100 py-16 px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
                Dashboard - {role}
            </h2>
            <p className="text-gray-600 mt-3">
                Manage your activities and explore features based on your role.
            </p>
        </div>
    );
};

export default DashboardHero;
