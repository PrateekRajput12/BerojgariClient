import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const JobDetails = () => {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/job/${id}`);
                setJob(res.data.job);
            } catch (error) {
                console.log(error)
                toast.error("Failed to fetch job");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleApply = async (e) => {
        e.preventDefault();

        if (!resume) {
            toast.error("Please upload resume");
            return;
        }

        if (!form.name || !form.email || !form.phone) {
            toast.error("Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("resume", resume);

        try {
            setSubmitting(true);

            const { data } = await api.post(
                `/applications/${id}/apply`,
                formData
            );

            toast.success(data.message);

            // Reset form
            setForm({ name: "", email: "", phone: "" });
            setResume(null);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error applying"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading)
        return (
            <Layout>
                <div className="text-center py-20 text-gray-500">
                    Loading job details...
                </div>
            </Layout>
        );

    if (!job)
        return (
            <Layout>
                <div className="text-center py-20 text-red-500">
                    Job not found
                </div>
            </Layout>
        );

    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-10 px-4">

                {/* Job Card */}
                <div className="bg-white shadow-md rounded-xl p-8 mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {job.title}
                    </h2>

                    <p className="text-gray-600 mb-6">
                        {job.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p>
                            <span className="font-semibold">Location:</span> {job.location}
                        </p>
                        <p>
                            <span className="font-semibold">Salary:</span> ₹{job.salary}
                        </p>
                    </div>
                </div>

                {/* Application Form */}
                <div className="bg-white shadow-md rounded-xl p-8">
                    <h3 className="text-xl font-semibold mb-6 text-gray-800">
                        Apply for this Job
                    </h3>

                    <form
                        onSubmit={handleApply}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                                required
                            />
                        </div>

                        {/* Resume Upload */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Upload Resume
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) =>
                                    setResume(e.target.files[0])
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-3 rounded-lg text-white font-medium transition ${submitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700"
                                    }`}
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit Application"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default JobDetails;
