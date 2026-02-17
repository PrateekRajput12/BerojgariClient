import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Applications = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [applications, setApplications] = useState([]);
    const [interviewers, setInterviewers] = useState([]);
    const [loading, setLoading] = useState(false);

    // schedule form (shown when you click schedule)
    const [scheduleForm, setScheduleForm] = useState({
        applicationId: "",
        round: 1,
        interviewerId: "",
        scheduledAt: "",
        mode: "Online",
    });

    const fetchJobs = async () => {
        try {
            const res = await api.get("/job/all");
            setJobs(res.data.jobs || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch jobs");
        }
    };

    const fetchApplications = async (jobId) => {
        try {
            setLoading(true);
            const res = await api.get(`/applications/job/${jobId}`);
            setApplications(res?.data?.application || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    };

    const fetchInterviewers = async () => {
        try {
            const res = await api.get("/users/interviewers");
            console.log(res)
            setInterviewers(res.data.users || []);
        } catch (error) {
            // if recruiter not allowed by role then this will fail
            toast.error(error.response?.data?.message || "Failed to fetch interviewers");
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchInterviewers();
    }, []);

    const handleJobChange = (e) => {
        const jobId = e.target.value;
        setSelectedJob(jobId);

        // clear schedule form when job changes
        setScheduleForm({
            applicationId: "",
            round: 1,
            interviewerId: "",
            scheduledAt: "",
            mode: "Online",
        });

        if (jobId) fetchApplications(jobId);
        else setApplications([]);
    };

    const updateStatus = async (applicationId, status) => {
        try {
            await api.patch(`/applications/${applicationId}/status`, { status });
            toast.success(`Status updated to ${status}`);
            fetchApplications(selectedJob);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const openSchedule = (appId) => {
        setScheduleForm((prev) => ({
            ...prev,
            applicationId: appId,
        }));
        toast.info("Fill schedule form below and click Schedule Interview");
    };

    const scheduleInterview = async (e) => {
        e.preventDefault();

        if (!scheduleForm.applicationId) {
            return toast.error("Select an application to schedule");
        }

        try {
            await api.post("/interviews/schedule", {
                applicationId: scheduleForm.applicationId,
                round: Number(scheduleForm.round),
                interviewerId: scheduleForm.interviewerId,
                scheduledAt: scheduleForm.scheduledAt,
                mode: scheduleForm.mode,
            });

            toast.success("Interview scheduled");
            setScheduleForm({
                applicationId: "",
                round: 1,
                interviewerId: "",
                scheduledAt: "",
                mode: "Online",
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to schedule interview");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Applied":
                return "bg-blue-100 text-blue-700";
            case "Screened":
                return "bg-purple-100 text-purple-700";
            case "Shortlisted":
                return "bg-green-100 text-green-700";
            case "Selected":
                return "bg-emerald-100 text-emerald-700";
            case "Hired":
                return "bg-teal-100 text-teal-700";
            case "Rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Applications</h2>

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

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                </div>
            )}

            {/* Empty */}
            {!loading && selectedJob && applications?.length === 0 && (
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <p className="text-gray-500">No applications found</p>
                </div>
            )}

            {/* Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {applications?.map((app) => (
                    <div
                        key={app?._id}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{app?.candidate?.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">📧 {app?.candidate?.email}</p>
                        <p className="text-sm text-gray-500">📱 {app?.candidate?.phone}</p>

                        <div className="mt-3 mb-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(app?.status)}`}>
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
                        <div className="flex flex-wrap gap-2 mt-4">
                            {app.status !== "Rejected" && (
                                <>
                                    <button
                                        onClick={() => updateStatus(app._id, "Screened")}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-xs"
                                    >
                                        Mark Screened
                                    </button>

                                    <button
                                        onClick={() => updateStatus(app._id, "Shortlisted")}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs"
                                    >
                                        Shortlist
                                    </button>

                                    <button
                                        onClick={() => updateStatus(app._id, "Selected")}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs"
                                    >
                                        Select
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => updateStatus(app._id, "Rejected")}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs"
                            >
                                Reject
                            </button>

                            <button
                                onClick={() => openSchedule(app._id)}
                                className="ml-auto bg-gray-900 hover:bg-black text-white px-3 py-2 rounded-lg text-xs"
                            >
                                Schedule Interview
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Schedule Interview Form */}
            {selectedJob && (
                <div className="bg-white rounded-2xl shadow p-6 mt-10 max-w-4xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule Interview</h3>

                    <form onSubmit={scheduleInterview} className="grid md:grid-cols-2 gap-4">
                        <input
                            value={scheduleForm.applicationId}
                            readOnly
                            placeholder="Application ID (click schedule button on card)"
                            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                        />

                        <select
                            value={scheduleForm.round}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, round: Number(e.target.value) })}
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        >
                            <option value={1}>Round 1</option>
                            <option value={2}>Round 2</option>
                            <option value={3}>Round 3</option>
                            <option value={4}>Round 4</option>
                        </select>

                        <select
                            value={scheduleForm.interviewerId}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, interviewerId: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        >
                            <option value="">Select Interviewer</option>
                            {interviewers.map((u) => (
                                <option key={u._id} value={u._id}>
                                    {u.name} ({u.email})
                                </option>
                            ))}
                        </select>

                        <select
                            value={scheduleForm.mode}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, mode: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>

                        <input
                            type="datetime-local"
                            value={scheduleForm.scheduledAt}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledAt: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        />

                        <button
                            type="submit"
                            disabled={!scheduleForm.applicationId}
                            className="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl disabled:opacity-50"
                        >
                            Schedule Interview
                        </button>
                    </form>
                </div>
            )}
        </div>

    );
};

export default Applications;
