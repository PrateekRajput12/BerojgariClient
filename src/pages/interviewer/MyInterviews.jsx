import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const MyInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processingId, setProcessingId] = useState(null);

    const fetchMyInterviews = async () => {
        setLoading(true);
        try {
            const res = await api.get("/interviews/my");
            setInterviews(res.data.interviews || []);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch interviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyInterviews();
    }, []);

    const submit = async (id, result) => {
        const comment = prompt("Enter feedback comment (optional):") || "";
        const scoreStr = prompt("Enter score (0-10) optional:") || "";
        const score = scoreStr ? Number(scoreStr) : undefined;

        setProcessingId(id);
        try {
            await api.patch(`/interviews/${id}/feedback`, { comment, score, result });
            toast.success("Feedback submitted");
            await fetchMyInterviews();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit feedback");
        } finally {
            setProcessingId(null);
        }
    };

    return (

        <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Interviews</h2>

            {loading && <p className="text-gray-600">Loading...</p>}

            {!loading && interviews.length === 0 && (
                <p className="text-gray-600">No interviews assigned.</p>
            )}

            <div className="grid md:grid-cols-2 gap-5">
                {interviews.map((it) => (
                    <div
                        key={it._id}
                        className="bg-white border rounded-2xl p-5 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">
                            {it.application?.candidate?.name || "Candidate"}
                        </h3>

                        <p className="text-sm text-gray-600">
                            Email: {it.application?.candidate?.email || "N/A"}
                        </p>

                        <div className="mt-3 text-sm text-gray-700 space-y-1">
                            <p>
                                Round: <b>{it.round}</b>
                            </p>
                            <p>
                                Mode: <b>{it.mode}</b>
                            </p>
                            <p>
                                Scheduled: <b>{new Date(it.scheduledAt).toLocaleString()}</b>
                            </p>
                            <p>
                                Result: <b>{it.result}</b>
                            </p>
                        </div>

                        {it.result === "Pending" && (
                            <div className="flex gap-3 mt-5">
                                <button
                                    disabled={processingId === it._id}
                                    onClick={() => submit(it._id, "Pass")}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg disabled:opacity-50"
                                >
                                    Pass
                                </button>

                                <button
                                    disabled={processingId === it._id}
                                    onClick={() => submit(it._id, "Fail")}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg disabled:opacity-50"
                                >
                                    Fail
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MyInterviews;
