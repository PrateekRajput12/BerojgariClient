import React from "react";
import { Link } from "react-router-dom";
const DashboardCard = ({ title, desc, url }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
            <h4 className="text-lg font-semibold text-gray-800">
                {title}
            </h4>

            <p className="text-gray-500 text-sm mt-2">
                {desc}
            </p>

            <button className="mt-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                <Link to={url}>
                    Access
                </Link>
            </button>
        </div>
    );
};

export default DashboardCard;
