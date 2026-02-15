import React from "react";

const DashboardFooter = () => {
    return (
        <div className="bg-purple-50 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AlwaysApply. All rights reserved.
        </div>
    );
};

export default DashboardFooter;
