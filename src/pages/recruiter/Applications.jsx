import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Applications = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = async () => {
        try {
            const res = await api.get("/job/all");
            setJobs(res.data.jobs);
        } catch (error) {
            toast.error("Failed to fetch jobs");
        }
    };

    const fetchApplications = async (jobId) => {
        try {
            setLoading(true);
            const res = await api.get(`/applications/job/${jobId}`);
            setApplications(res?.data?.application || []);
        } catch (error) {
            toast.error("Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleJobChange = (e) => {
        const jobId = e.target.value;
        setSelectedJob(jobId);

        if (jobId) {
            fetchApplications(jobId);
        } else {
            setApplications([]);
        }
    };

    const updateStatus = async (applicationId, status) => {
        try {
            await api.patch(`/applications/${applicationId}/status`, { status });
            toast.success("Status updated successfully");
            fetchApplications(selectedJob);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Shortlisted":
                return "bg-green-100 text-green-700";
            case "Rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">

                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Manage Applications
                </h2>

                {/* Job Selector */}
                <div className="mb-8 max-w-md">
                    <select
                        onChange={handleJobChange}
                        value={selectedJob}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                    >
                        <option value="">Select Job</option>
                        {jobs?.map((job) => (
                            <option key={job?._id} value={job?._id}>
                                {job?.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && selectedJob && applications?.length === 0 && (
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-gray-500">
                            No applications found
                        </p>
                    </div>
                )}

                {/* Applications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {applications?.map((app) => (
                        <div
                            key={app?._id}
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">
                                {app?.candidate?.name}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                📧 {app?.candidate?.email}
                            </p>

                            <p className="text-sm text-gray-500">
                                📱 {app?.candidate?.phone}
                            </p>

                            <div className="mt-3 mb-4">
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                                        app?.status
                                    )}`}
                                >
                                    {app?.status}
                                </span>
                            </div>

                            <a
                                href={app?.resume?.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-purple-600 text-sm font-medium hover:underline"
                            >
                                View Resume →
                            </a>

                            {/* Action Buttons */}
                            {app.status === "Applied" && (
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() =>
                                            updateStatus(app._id, "Shortlisted")
                                        }
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition duration-300"
                                    >
                                        Shortlist
                                    </button>

                                    <button
                                        onClick={() =>
                                            updateStatus(app._id, "Rejected")
                                        }
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition duration-300"
                                    >
                                        Reject
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

export default Applications;
