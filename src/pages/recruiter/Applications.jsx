import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Applications = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [applications, setApplications] = useState([]);

    // Fetch all jobs
    const fetchJobs = async () => {
        try {
            const res = await api.get("/job/all"); // ✅ fixed
            setJobs(res.data.jobs);
        } catch (error) {
            toast.error("Failed to fetch jobs");
        }
    };

    // Fetch applications by job
    const fetchApplications = async (jobId) => {
        try {
            const res = await api.get(`/applications/job/${jobId}`);
            console.log(res)
            setApplications(res?.data?.application);
        } catch (error) {
            toast.error("Failed to fetch applications");
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

    return (
        <Layout>
            <h2>Manage Applications</h2>

            <select onChange={handleJobChange} value={selectedJob}>
                <option value="">Select Job</option>
                {jobs?.map((job) => (
                    <option key={job?._id} value={job?._id}>
                        {job?.title}
                    </option>
                ))}
            </select>

            <hr />

            {applications?.length === 0 && selectedJob && (
                <p>No applications found</p>
            )}

            {applications?.map((app) => (
                <div
                    key={app?._id}
                    style={{
                        border: "1px solid gray",
                        margin: "10px",
                        padding: "10px",
                    }}
                >
                    <h3>{app?.candidate?.name}</h3>
                    <p>Email: {app?.candidate?.email}</p>
                    <p>Phone: {app?.candidate?.phone}</p>
                    <p>Status: {app?.status}</p>

                    <a href={app?.resume?.url} target="_blank" rel="noreferrer">
                        View Resume
                    </a>

                    <br /><br />

                    {/* ✅ Correct status check */}
                    {app.status === "Applied" && (
                        <>
                            <button
                                onClick={() => updateStatus(app._id, "Shortlisted")}
                            >
                                Shortlist
                            </button>

                            <button
                                onClick={() => updateStatus(app._id, "Rejected")}
                            >
                                Reject
                            </button>
                        </>
                    )}
                </div>
            ))}
        </Layout>
    );
};

export default Applications;
