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
            alert("Feedback submitted successfully");
            fetchInterviews(); // refresh list
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback");
        }
    };

    return (
        <Layout>
            <h2>My Interviews</h2>

            {loading && <p>Loading...</p>}

            {!loading && interviews.length === 0 && (
                <p>No interviews found</p>
            )}

            {interviews.map((interview) => (
                <div
                    key={interview._id}
                    style={{
                        border: "1px solid gray",
                        margin: "10px",
                        padding: "10px",
                        borderRadius: "6px",
                    }}
                >
                    <h3>
                        Candidate: {interview.application?.candidate?.name}
                    </h3>

                    <p>Email: {interview.application?.candidate?.email}</p>
                    <p>Round: {interview.round}</p>
                    <p>
                        Scheduled At:{" "}
                        {new Date(interview.scheduledAt).toLocaleString()}
                    </p>
                    <p>Mode: {interview.mode}</p>
                    <p>
                        Result:{" "}
                        {interview.result === "Pending"
                            ? "Pending"
                            : interview.result}
                    </p>

                    {/* SHOW BUTTON ONLY IF RESULT IS PENDING */}
                    {interview.result === "Pending" && (
                        <>
                            <button
                                onClick={() =>
                                    submitFeedback(interview._id, "Pass")
                                }
                                style={{ marginRight: "10px" }}
                            >
                                Pass
                            </button>

                            <button
                                onClick={() =>
                                    submitFeedback(interview._id, "Fail")
                                }
                            >
                                Fail
                            </button>
                        </>
                    )}
                </div>
            ))}
        </Layout>
    );
};

export default MyInterviews;