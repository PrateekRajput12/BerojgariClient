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

    // ✅ Fetch job data
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
                toast.error(
                    error.response?.data?.message || "Failed to fetch job"
                );
            }
        };

        if (id) fetchJob();
    }, [id]);

    // ✅ Handle input change
    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ✅ Submit updated job
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.put(`/job/update/${id}`, form);
            toast.success(data?.message)
            toast.success("Job updated successfully");

            // Redirect after success
            navigate("/hr/jobs");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update job"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div style={{ maxWidth: "600px", margin: "auto" }}>
                <h2>Edit Job</h2>

                <form onSubmit={handleSubmit}>

                    {/* Title */}
                    <div>
                        <label htmlFor="title">Job Title</label>
                        <br />
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />

                    {/* Description */}
                    <div>
                        <label htmlFor="description">Job Description</label>
                        <br />
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />

                    {/* Requirements */}
                    <div>
                        <label htmlFor="requirements">Requirements</label>
                        <br />
                        <textarea
                            id="requirements"
                            name="requirements"
                            value={form.requirements}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />

                    {/* Location */}
                    <div>
                        <label htmlFor="location">Location</label>
                        <br />
                        <input
                            id="location"
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />

                    {/* Shift */}
                    <div>
                        <label htmlFor="shift">Shift</label>
                        <br />
                        <select
                            id="shift"
                            name="shift"
                            value={form.shift}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Shift</option>
                            <option value="Day">Day</option>
                            <option value="Night">Night</option>
                        </select>
                    </div>
                    <br />

                    {/* Employment Type */}
                    <div>
                        <label htmlFor="employmentType">Employment Type</label>
                        <br />
                        <select
                            id="employmentType"
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
                    </div>
                    <br />

                    {/* Expiry Date */}
                    <div>
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <br />
                        <input
                            id="expiryDate"
                            type="date"
                            name="expiryDate"
                            value={form.expiryDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />

                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Job"}
                    </button>

                </form>
            </div>
        </Layout>
    );
};

export default EditJob;
