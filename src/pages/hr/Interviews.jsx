import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const HRInterviews = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");

    const [applications, setApplications] = useState([]);
    const [interviewers, setInterviewers] = useState([]);

    const [appInterviews, setAppInterviews] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);
    const [loadingInterviews, setLoadingInterviews] = useState(false);

    const [form, setForm] = useState({
        applicationId: "",
        round: 1,
        interviewerId: "",
        scheduledAt: "",
        mode: "Online",
    });

    // ---------------- FETCHERS ----------------
    const fetchJobs = async () => {
        try {
            const res = await api.get("/job/all");

            setJobs(res.data.jobs || []);
        } catch (e) {
            toast.error(e.response?.data?.message || "Failed to fetch jobs");
        }
    };

    const fetchInterviewers = async () => {
        try {
            const res = await api.get("/users/interviewers");
            console.log(res)
            setInterviewers(res.data.users || []);
        } catch (e) {
            toast.error(e.response?.data?.message || "Failed to fetch interviewers");
        }
    };

    const fetchApplications = async (jobId) => {
        if (!jobId) {
            setApplications([]);
            return;
        }

        try {
            setLoadingApps(true);
            const res = await api.get(`/applications/job/${jobId}`);
            console.log(res)
            // backend sends `application`
            const all = res.data.application || [];
            setApplications(all.filter((a) => a.status === "Shortlisted"));
        } catch (e) {
            toast.error(e.response?.data?.message || "Failed to fetch applications");
        } finally {
            setLoadingApps(false);
        }
    };

    const fetchInterviewsByApplication = async (applicationId) => {
        if (!applicationId) {
            setAppInterviews([]);
            return;
        }

        try {
            setLoadingInterviews(true);
            const res = await api.get(`/interviews/application/${applicationId}`);
            console.log(res)
            setAppInterviews(res.data.interviews || []);
        } catch (e) {
            toast.error(e.response?.data?.message || "Failed to fetch interviews");
        } finally {
            setLoadingInterviews(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchInterviewers();
    }, []);

    // ✅ When selected job changes, fetch shortlisted applications
    useEffect(() => {
        if (selectedJob) fetchApplications(selectedJob);
    }, [selectedJob]);

    // ✅ When applicationId changes, fetch interviews (avoid async in onChange)
    useEffect(() => {
        // clear old list instantly when candidate changes
        setAppInterviews([]);
        fetchInterviewsByApplication(form.applicationId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.applicationId]);

    // ---------------- HELPERS ----------------
    const selectedApplication = useMemo(() => {
        return applications.find((a) => a._id === form.applicationId);
    }, [applications, form.applicationId]);

    const selectedCandidate = selectedApplication?.candidate;

    const getInterviewerFromInterview = (it) => {
        const interviewerId =
            it?.interviewerId ||
            it?.interviewer?._id ||
            (typeof it?.interviewer === "string" ? it.interviewer : null);

        if (!interviewerId) return null;
        return interviewers.find((u) => u._id === interviewerId) || null;
    };

    const formatDateTime = (value) => {
        if (!value) return "N/A";
        const d = new Date(value);
        return isNaN(d.getTime()) ? "Invalid date" : d.toLocaleString();
    };

    // ---------------- HANDLERS ----------------
    const handleJobChange = (e) => {
        const jobId = e.target.value;
        setSelectedJob(jobId);

        // reset dependent UI
        setApplications([]);
        setAppInterviews([]);

        setForm({
            applicationId: "",
            round: 1,
            interviewerId: "",
            scheduledAt: "",
            mode: "Online",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((p) => ({
            ...p,
            [name]: name === "round" ? Number(value) : value,
        }));
    };

    const schedule = async (e) => {
        e.preventDefault();

        if (
            !form.applicationId ||
            !form.round ||
            !form.interviewerId ||
            !form.scheduledAt ||
            !form.mode
        ) {
            toast.error("All fields are required");
            return;
        }

        try {
            await api.post("/interviews/schedule", {
                applicationId: form.applicationId,
                round: Number(form.round),
                interviewerId: form.interviewerId,
                scheduledAt: form.scheduledAt,
                mode: form.mode,
            });

            toast.success("Interview scheduled!");

            // refresh interviews list
            await fetchInterviewsByApplication(form.applicationId);

            // optional refresh shortlisted list
            if (selectedJob) await fetchApplications(selectedJob);

            // reset fields (keep candidate + round auto increment)
            setForm((p) => {
                const nextRound = Number(p.round) + 1;
                return {
                    ...p,
                    round: nextRound <= 4 ? nextRound : p.round,
                    interviewerId: "",
                    scheduledAt: "",
                    mode: "Online",
                };
            });
        } catch (e2) {
            toast.error(e2.response?.data?.message || "Failed to schedule interview");
        }
    };

    // ---------------- UI ----------------
    return (

        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Schedule Interviews</h2>

            {/* Job Select */}
            <div className="mb-4">
                <select
                    value={selectedJob}
                    onChange={handleJobChange}
                    className="border p-2 rounded w-full max-w-md"
                >
                    <option value="">Select Job</option>
                    {jobs.map((job) => (
                        <option key={job._id} value={job._id}>
                            {job.title}
                        </option>
                    ))}
                </select>
            </div>

            {loadingApps && (
                <p className="text-gray-500">Loading shortlisted applications...</p>
            )}

            {/* Form */}
            <form onSubmit={schedule} className="border p-4 rounded-lg max-w-xl">
                {/* Candidate */}
                <div className="mb-3">
                    <label className="font-medium">Candidate (Shortlisted)</label>
                    <select
                        name="applicationId"
                        value={form.applicationId}
                        onChange={handleChange}
                        className="border p-2 rounded w-full mt-1"
                        disabled={!selectedJob || loadingApps}
                    >
                        <option value="">Select Candidate</option>
                        {applications.map((app) => (
                            <option key={app._id} value={app._id}>
                                {app.candidate?.name} ({app.candidate?.email})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Round */}
                <div className="mb-3">
                    <label className="font-medium">Round</label>
                    <select
                        name="round"
                        value={form.round}
                        onChange={handleChange}
                        className="border p-2 rounded w-full mt-1"
                        disabled={!form.applicationId}
                    >
                        <option value={1}>Round 1</option>
                        <option value={2}>Round 2</option>
                        <option value={3}>Round 3</option>
                        <option value={4}>Round 4</option>
                    </select>
                </div>

                {/* Interviewer */}
                <div className="mb-3">
                    <label className="font-medium">Interviewer</label>
                    <select
                        name="interviewerId"
                        value={form.interviewerId}
                        onChange={handleChange}
                        className="border p-2 rounded w-full mt-1"
                        disabled={!form.applicationId}
                    >
                        <option value="">Select Interviewer</option>
                        {interviewers.map((u) => (
                            <option key={u._id} value={u._id}>
                                {u.name} ({u.email})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Scheduled At */}
                <div className="mb-3">
                    <label className="font-medium">Scheduled At</label>
                    <input
                        type="datetime-local"
                        name="scheduledAt"
                        value={form.scheduledAt}
                        onChange={handleChange}
                        className="border p-2 rounded w-full mt-1"
                        disabled={!form.applicationId}
                    />
                </div>

                {/* Mode */}
                <div className="mb-3">
                    <label className="font-medium">Mode</label>
                    <select
                        name="mode"
                        value={form.mode}
                        onChange={handleChange}
                        className="border p-2 rounded w-full mt-1"
                        disabled={!form.applicationId}
                    >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-60"
                    disabled={!form.applicationId}
                >
                    Schedule
                </button>
            </form>

            <hr className="my-6" />

            {/* Interviews List */}
            <h3 className="text-xl font-semibold mb-2">
                Interviews for selected Application
            </h3>

            {/* Candidate card */}
            {form.applicationId && selectedCandidate && (
                <div className="mb-3 p-3 rounded border bg-white max-w-xl">
                    <p className="font-semibold">Candidate: {selectedCandidate.name}</p>
                    <p className="text-sm text-gray-600">
                        Email: {selectedCandidate.email}
                    </p>
                </div>
            )}

            {loadingInterviews && <p className="text-gray-500">Loading interviews...</p>}

            {!loadingInterviews && appInterviews.length === 0 ? (
                <p>No interviews found.</p>
            ) : (
                appInterviews.map((it) => {
                    const interviewer =
                        it?.interviewer?.name ? it.interviewer : getInterviewerFromInterview(it);

                    return (
                        <div key={it._id} className="border p-3 rounded mb-2 max-w-xl">
                            <p>
                                <b>Candidate:</b> {selectedCandidate?.name || "N/A"}
                            </p>

                            <p>
                                <b>Interviewer:</b> {interviewer?.name || "N/A"}{" "}
                                {interviewer?.email ? `(${interviewer.email})` : ""}
                            </p>

                            <p>Round: {it.round}</p>
                            <p>Mode: {it.mode}</p>
                            <p>Scheduled: {formatDateTime(it.scheduledAt)}</p>
                            <p>Result: {it.result || "Pending"}</p>
                        </div>
                    );
                })
            )}
        </div>

    );
};

export default HRInterviews;
