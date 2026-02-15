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

    // Fetch Offers
    const fetchOffers = async () => {
        try {
            const res = await api.get("/offers");
            setOffers(res.data.offers || []);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch Jobs
    const fetchJobs = async () => {
        try {
            const res = await api.get("/job/all");
            setJobs(res.data.jobs || []);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch Applications by Job
    const fetchApplicationsByJob = async (jobId) => {
        try {
            const res = await api.get(`/applications/job/${jobId}`);
            setApplications(res.data.applications || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchOffers();
            await fetchJobs();
            setLoading(false);
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "jobId") {
            fetchApplicationsByJob(value);
            setForm({
                ...form,
                jobId: value,
                applicationId: "",
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const createOffer = async (e) => {
        e.preventDefault();
        try {
            await api.post("/offers", {
                applicationId: form.applicationId,
                salary: form.salary,
                joiningDate: form.joiningDate,
                validTill: form.validTill,
            });

            await fetchOffers();

            setForm({
                jobId: "",
                applicationId: "",
                salary: "",
                joiningDate: "",
                validTill: "",
            });

            setApplications([]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-6">

            <div className="max-w-7xl mx-auto">

                <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">
                    Offer Management
                </h2>

                {/* Create Offer Card */}
                <div className="bg-white shadow-xl rounded-2xl p-8 mb-10 transition hover:shadow-2xl duration-300">
                    <h3 className="text-xl font-semibold mb-6 text-gray-700">
                        Create New Offer
                    </h3>

                    <form onSubmit={createOffer} className="grid md:grid-cols-2 gap-6">

                        <select
                            name="jobId"
                            value={form.jobId}
                            onChange={handleChange}
                            required
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        >
                            <option value="">Select Job</option>
                            {jobs.map((job) => (
                                <option key={job._id} value={job._id}>
                                    {job.title}
                                </option>
                            ))}
                        </select>

                        <select
                            name="applicationId"
                            value={form.applicationId}
                            onChange={handleChange}
                            required
                            disabled={!form.jobId}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none disabled:bg-gray-100"
                        >
                            <option value="">Select Application</option>
                            {applications.map((app) => (
                                <option key={app._id} value={app._id}>
                                    {app.candidate?.name} ({app.candidate?.email})
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            value={form.salary}
                            onChange={handleChange}
                            required
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        />

                        <input
                            type="date"
                            name="joiningDate"
                            value={form.joiningDate}
                            onChange={handleChange}
                            required
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        />

                        <input
                            type="date"
                            name="validTill"
                            value={form.validTill}
                            onChange={handleChange}
                            required
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        />

                        <button
                            type="submit"
                            className="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                        >
                            Create Offer
                        </button>

                    </form>
                </div>

                {/* Offers List */}
                <h3 className="text-xl font-semibold mb-6 text-gray-700">
                    All Offers
                </h3>

                {loading && (
                    <div className="text-center text-gray-500">
                        Loading...
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {!loading &&
                        offers.map((offer) => (
                            <div
                                key={offer._id}
                                className="bg-white rounded-2xl shadow-md p-6 transition transform hover:-translate-y-2 hover:shadow-xl duration-300"
                            >
                                <h4 className="text-lg font-bold text-purple-600 mb-2">
                                    {offer.application?.job?.title}
                                </h4>

                                <p className="text-sm text-gray-600">
                                    Candidate:{" "}
                                    <span className="font-semibold">
                                        {offer.application?.candidate?.name}
                                    </span>
                                </p>

                                <p className="mt-2 text-gray-700">
                                    Salary: ₹{offer.salary}
                                </p>

                                <p className="text-gray-500 text-sm mt-1">
                                    Joining: {new Date(offer.joiningDate).toLocaleDateString()}
                                </p>

                                <p className="text-gray-500 text-sm">
                                    Valid Till: {new Date(offer.validTill).toLocaleDateString()}
                                </p>

                                <div className="mt-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${offer.status === "Accepted"
                                            ? "bg-green-100 text-green-600"
                                            : offer.status === "Rejected"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {offer.status}
                                    </span>
                                </div>
                            </div>
                        ))}

                </div>

            </div>
        </div>
    );
};

export default Offers;
