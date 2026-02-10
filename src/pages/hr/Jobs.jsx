import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/job/all");

            setJobs(data.jobs);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const closeJob = async (id) => {
        const confirmClose = window.confirm("Are you sure you want to close this job?");
        if (!confirmClose) return;

        try {
            const res = await api.patch(`/job/${id}/close`);
            toast.success("Job closed successfully");
            console.log("res", res)
            fetchJobs();
            toast.success("Job Closed Successfully")
        } catch (error) {
            console.log(error.message)
            toast.error(
                error.response?.data?.message || "Failed to close job"
            );
        }
    };

    return (
        <Layout>
            <div style={{ maxWidth: "800px", margin: "auto" }}>
                <h2>Manage Jobs</h2>

                <Link to="/hr/jobs/create">
                    <button style={{ marginBottom: "20px" }}>
                        Create Job
                    </button>
                </Link>

                <hr />

                {loading && <p>Loading jobs...</p>}

                {!loading && jobs.length === 0 && (
                    <p>No jobs found.</p>
                )}

                {!loading &&
                    jobs.map((job) => (
                        <div
                            key={job._id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                margin: "15px 0",
                                padding: "15px",
                                backgroundColor: "#f9f9f9"
                            }}
                        >
                            <h3>{job.title}</h3>

                            <p>
                                <strong>Location:</strong> {job.location}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    style={{
                                        color:
                                            job.status === "Closed"
                                                ? "red"
                                                : "green"
                                    }}
                                >
                                    {job.status}
                                </span>
                            </p>

                            <div style={{ marginTop: "10px" }}>
                                <Link to={`/hr/jobs/edit/${job._id}`}>
                                    <button style={{ marginRight: "10px" }}>
                                        Edit
                                    </button>
                                </Link>

                                {job.status !== "Closed" && (
                                    <button
                                        onClick={() => closeJob(job._id)}
                                        style={{
                                            backgroundColor: "#ff4d4f",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </Layout>
    );
};

export default Jobs;
