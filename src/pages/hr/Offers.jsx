import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        jobId: "",
        applicationId: "",
        salary: "",
        joiningDate: "",
        validTill: "",
    });

    // ✅ Fetch all offers
    const fetchOffers = async () => {
        try {
            const res = await api.get("/offers");
            console.log(res)
            setOffers(res.data.offer || []);
        } catch (error) {
            console.log("Error fetching offers", error);
        }
    };

    // ✅ Fetch all jobs
    const fetchJobs = async () => {
        try {
            const res = await api.get("/job/all");
            setJobs(res.data.jobs || []);
        } catch (error) {
            console.log("Error fetching jobs", error);
        }
    };

    // ✅ Fetch applications by job
    const fetchApplicationsByJob = async (jobId) => {
        try {
            const res = await api.get(`/applications/job/${jobId}`);
            setApplications(res.data.application || []);
        } catch (error) {
            console.log("Error fetching applications", error);
        }
    };

    // ✅ Load initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchOffers();
            await fetchJobs();
            setLoading(false);
        };

        loadData();
    }, []);

    // ✅ Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        // If job changes → fetch applications
        if (name === "jobId") {
            fetchApplicationsByJob(value);
            setForm((prev) => ({
                ...prev,
                jobId: value,
                applicationId: "",
            }));
        }
    };

    // ✅ Create Offer
    const createOffer = async (e) => {
        e.preventDefault();

        try {
            await api.post(
                `/offers`, // 👈 jobId in params
                {
                    applicationId: form.applicationId,
                    salary: form.salary,
                    joiningDate: form.joiningDate,
                    validTill: form.validTill,
                }
            );

            alert("Offer Created Successfully ✅");

            await fetchOffers();

            // Reset form
            setForm({
                jobId: "",
                applicationId: "",
                salary: "",
                joiningDate: "",
                validTill: "",
            });

            setApplications([]);
        } catch (error) {
            console.log("Error creating offer", error);
            alert("Failed to create offer ❌");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Offer Management</h2>

            {/* CREATE OFFER FORM */}
            <h3>Create Offer</h3>

            <form onSubmit={createOffer} style={{ marginBottom: "20px" }}>

                {/* 🔹 Select Job */}
                <select
                    name="jobId"
                    value={form.jobId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Job</option>
                    {jobs.map((job) => (
                        <option key={job._id} value={job._id}>
                            {job.title}
                        </option>
                    ))}
                </select>

                <br /><br />

                {/* 🔹 Select Application */}
                <select
                    name="applicationId"
                    value={form.applicationId}
                    onChange={handleChange}
                    required
                    disabled={!form.jobId}
                >
                    <option value="">Select Application</option>
                    {applications.map((app) => (
                        <option key={app._id} value={app._id}>
                            {app.candidate?.name} ({app.candidate?.email})
                        </option>
                    ))}
                </select>

                <br /><br />

                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={form.salary}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="joiningDate"
                    value={form.joiningDate}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="validTill"
                    value={form.validTill}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">Create Offer</button>
            </form>

            {/* OFFERS LIST */}
            <h3>All Offers</h3>

            {loading && <p>Loading...</p>}

            {!loading &&
                offers.map((offer) => (
                    <div
                        key={offer._id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <p>
                            Job: {offer.job?.title}
                        </p>
                        <p>
                            Candidate: {offer.application?.candidate?.name}
                        </p>
                        <p>Salary: ₹{offer.salary}</p>
                        <p>
                            Joining Date:{" "}
                            {new Date(offer.joiningDate).toLocaleDateString()}
                        </p>
                        <p>
                            Valid Till:{" "}
                            {new Date(offer.validTill).toLocaleDateString()}
                        </p>
                        <p>Status: {offer.status}</p>
                    </div>
                ))}
        </div>
    );
};

export default Offers;