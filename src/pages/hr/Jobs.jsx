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
            toast.error(error.response?.data?.message || "Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const closeJob = async (id) => {
        const confirmClose = window.confirm(
            "Are you sure you want to close this job?"
        );
        if (!confirmClose) return;

        try {
            await api.patch(`/job/${id}/close`);
            toast.success("Job closed successfully");
            fetchJobs();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to close job");
        }
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Manage Jobs
                    </h2>

                    <Link to="/hr/jobs/create">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition">
                            + Create Job
                        </button>
                    </Link>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-10 text-gray-500">
                        Loading jobs...
                    </div>
                )}

                {/* Empty State */}
                {!loading && jobs.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No jobs found.
                    </div>
                )}

                {/* Job Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!loading &&
                        jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
                            >
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {job.title}
                                </h3>

                                <p className="text-gray-500 text-sm mt-2">
                                    📍 {job.location}
                                </p>

                                {/* Status Badge */}
                                <div className="mt-3">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full 
                                        ${job.status === "Closed"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {job.status}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-6">
                                    <Link
                                        to={`/hr/jobs/edit/${job._id}`}
                                        className="flex-1"
                                    >
                                        <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg text-sm transition">
                                            Edit
                                        </button>
                                    </Link>

                                    {job.status !== "Closed" && (
                                        <button
                                            onClick={() => closeJob(job._id)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
                                        >
                                            Close
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default Jobs;
