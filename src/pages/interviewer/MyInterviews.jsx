import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";

const MyInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInterviews = async () => {
        try {
            const res = await api.get("/interviews/my");
            setInterviews(res.data.interviews);
        } catch (error) {
            console.error("Error fetching interviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);

    const submitFeedback = async (id, result) => {
        try {
            await api.patch(`/interviews/${id}/feedback`, { result });
            fetchInterviews();
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback");
        }
    };

    const getStatusBadge = (result) => {
        switch (result) {
            case "Pass":
                return "bg-green-100 text-green-700";
            case "Fail":
                return "bg-red-100 text-red-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">

                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    My Interviews
                </h2>

                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {!loading && interviews.length === 0 && (
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-gray-500">
                            No interviews found
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {interviews.map((interview) => (
                        <div
                            key={interview._id}
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {interview.application?.candidate?.name}
                            </h3>

                            <p className="text-sm text-gray-500 mb-1">
                                📧 {interview.application?.candidate?.email}
                            </p>

                            <p className="text-sm text-gray-600 mt-2">
                                <span className="font-medium">Round:</span>{" "}
                                {interview.round}
                            </p>

                            <p className="text-sm text-gray-600">
                                <span className="font-medium">
                                    Scheduled:
                                </span>{" "}
                                {new Date(
                                    interview.scheduledAt
                                ).toLocaleString()}
                            </p>

                            <p className="text-sm text-gray-600 mb-3">
                                <span className="font-medium">Mode:</span>{" "}
                                {interview.mode}
                            </p>

                            <div className="mb-4">
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                                        interview.result
                                    )}`}
                                >
                                    {interview.result}
                                </span>
                            </div>

                            {interview.result === "Pending" && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            submitFeedback(
                                                interview._id,
                                                "Pass"
                                            )
                                        }
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition duration-300"
                                    >
                                        Pass
                                    </button>

                                    <button
                                        onClick={() =>
                                            submitFeedback(
                                                interview._id,
                                                "Fail"
                                            )
                                        }
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition duration-300"
                                    >
                                        Fail
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default MyInterviews;
