import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const CandidateInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchInterviews = async () => {
        setLoading(true);
        try {
            const res = await api.get("/interviews/candidate/my");
            setInterviews(res.data.interviews || []);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch interviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);

    const badge = (result) => {
        if (result === "Pass") return "bg-green-100 text-green-700";
        if (result === "Fail") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    return (

        <div className="max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Interviews</h2>

            {loading && <p className="text-gray-500">Loading...</p>}

            {!loading && interviews.length === 0 && (
                <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
                    No interview scheduled yet.
                </div>
            )}

            <div className="space-y-5">
                {interviews.map((it) => (
                    <div key={it._id} className="bg-white p-6 rounded-2xl shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {it.application?.job?.title || "Job"}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Location: {it.application?.job?.location || "N/A"}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Round: <b>{it.round}</b> • Mode: <b>{it.mode}</b>
                                </p>
                            </div>

                            <span className={`px-3 py-1 rounded-full text-sm ${badge(it.result)}`}>
                                {it.result}
                            </span>
                        </div>

                        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                            <p>
                                <b>Scheduled At:</b>{" "}
                                {it.scheduledAt ? new Date(it.scheduledAt).toLocaleString() : "N/A"}
                            </p>
                            <p>
                                <b>Interviewer:</b>{" "}
                                {it.interviewer?.name} ({it.interviewer?.email})
                            </p>
                        </div>

                        {it.feedback?.comments && (
                            <p className="mt-4 text-sm text-gray-700">
                                <b>Feedback:</b> {it.feedback.comments}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default CandidateInterviews;
