import { useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateJob = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        requirements: "",
        location: "",
        shift: "",
        employmentType: "",
        expiryDate: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post("/job/create", form);
            toast.success(data.message);
            navigate("/hr/jobs");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-10 px-4">
                <div className="bg-white shadow-xl rounded-2xl p-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Create New Job
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Job Title
                            </label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Frontend Developer"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Job Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Describe job responsibilities..."
                            />
                        </div>

                        {/* Requirements */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Requirements
                            </label>
                            <textarea
                                name="requirements"
                                value={form.requirements}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="React, Node.js, MongoDB..."
                            />
                        </div>

                        {/* Grid Row */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Location
                                </label>
                                <input
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    placeholder="Noida / Remote"
                                />
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={form.expiryDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Grid Row */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Shift */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Shift
                                </label>
                                <select
                                    name="shift"
                                    value={form.shift}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                >
                                    <option value="">Select Shift</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                </select>
                            </div>

                            {/* Employment Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Employment Type
                                </label>
                                <select
                                    name="employmentType"
                                    value={form.employmentType}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Full-time">Full-Time</option>
                                    <option value="Part-time">Part-Time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition duration-300 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Job"}
                        </button>

                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CreateJob;
