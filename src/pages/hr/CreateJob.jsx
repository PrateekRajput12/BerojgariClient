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
            <div style={{ maxWidth: "500px", margin: "auto" }}>
                <h2>Create Job</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="title"
                        placeholder="Job Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />

                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />

                    <textarea
                        name="requirements"
                        placeholder="Requirements"
                        value={form.requirements}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />

                    <input
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />

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
                    <br /><br />

                    <select
                        name="employmentType"
                        value={form.employmentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Employment Type</option>
                        <option value="Full-time">Full-Time</option>
                        <option value="Part-time">Part-Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>
                    <br /><br />

                    <input
                        type="date"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Job"}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default CreateJob;
