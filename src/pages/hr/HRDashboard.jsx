import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HRDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const renderRoleContent = () => {
        switch (user?.role) {
            case "HR":
                return [
                    { title: "Manage Jobs", desc: "View and manage all jobs", path: "/hr/jobs" },
                    { title: "Manage Offers", desc: "Send offers", path: "/hr/offer" },
                    { title: "Interview Management", desc: "Schedule interviews & track rounds", path: "/hr/interviews" },
                ];

            case "Recruiter":
                return [
                    { title: "Post New Job", desc: "Create and publish job openings", path: "/hr/jobs/create" },
                    { title: "View Applications", desc: "Review candidate applications", path: "/recruiter/applications" },
                    { title: "Schedule Interviews", desc: "Assign interviews easily", path: "/recruiter/interviews" },
                ];

            case "Interviewer":
                return [
                    { title: "My Interviews", desc: "View assigned interviews", path: "/interviewer/interviews" },
                    { title: "Submit Feedback", desc: "Give interview feedback", path: "/interviewer/feedback" },
                    { title: "Candidate Profiles", desc: "Review candidate details", path: "/interviewer/candidates" },
                ];

            case "Candidate":
                return [
                    { title: "Browse Jobs", desc: "Find jobs that match your skills", path: "/candidate/jobs" },
                    { title: "My Applications", desc: "Track your job applications", path: "/candidate/applications" },
                    { title: "Interview Status", desc: "Check interview updates", path: "/candidate/interviews" },
                ];

            default:
                return [];
        }
    };

    const cards = renderRoleContent();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 py-14 px-6 text-center text-white">
                <h2 className="text-3xl font-bold">{user?.role || "User"} Dashboard</h2>
                <p className="mt-3 text-purple-100">
                    Manage your activities and explore your role-based features.
                </p>
            </div>

            {/* Cards */}
            <div className="max-w-6xl mx-auto py-12 px-6">
                <h3 className="text-xl font-semibold mb-8 text-gray-700">Quick Actions</h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => navigate(card.path)}
                            className="text-left bg-white shadow-md rounded-2xl p-6
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <h4 className="text-lg font-semibold text-gray-800">{card.title}</h4>
                            <p className="text-gray-500 text-sm mt-3">{card.desc}</p>

                            <div className="mt-5 text-purple-600 font-medium text-sm">
                                Access →
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} AlwaysApply. All rights reserved.
            </div>
        </div>
    );
};

export default HRDashboard;
