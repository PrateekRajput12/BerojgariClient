import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        requirements: "",
        location: "",
        shift: "",
        employmentType: "",
        expiryDate: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await api.get(`/job/${id}`);
                if (data?.job) {
                    setForm({
                        title: data.job.title || "",
                        description: data.job.description || "",
                        requirements: data.job.requirements || "",
                        location: data.job.location || "",
                        shift: data.job.shift || "",
                        employmentType: data.job.employmentType || "",
                        expiryDate: data.job.expiryDate
                            ? data.job.expiryDate.split("T")[0]
                            : "",
                    });
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch job");
            }
        };

        if (id) fetchJob();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/job/update/${id}`, form);
            toast.success("Job updated successfully");
            navigate("/hr/jobs");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="job-container">
                <h2>Edit Job</h2>

                <form onSubmit={handleSubmit} className="job-form">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Job Title"
                        required
                    />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Job Description"
                        required
                    />

                    <textarea
                        name="requirements"
                        value={form.requirements}
                        onChange={handleChange}
                        placeholder="Requirements"
                        required
                    />

                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                    />

                    <select
                        name="shift"
                        value={form.shift}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Shift</option>
                        <option value="Day">Day</option>
                        <option value="Night">Night</option>
                    </select>

                    <select
                        name="employmentType"
                        value={form.employmentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-Time</option>
                        <option value="Part-time">Part-Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>

                    <input
                        type="date"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Job"}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default EditJob;
