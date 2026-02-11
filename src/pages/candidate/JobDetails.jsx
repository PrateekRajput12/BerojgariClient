import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

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
                toast.error("Failed to fetch job");
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
            const { data } = await api.post(
                `/applications/${id}/apply`,
                formData
            );

            toast.success(data.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error applying"
            );
        }
    };

    if (!job) return <Layout><p>Loading...</p></Layout>;

    return (
        <Layout>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>

            <hr />

            <h3>Apply Now</h3>

            <form onSubmit={handleApply}>

                <div>
                    <label>Name</label><br />
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />

                <div>
                    <label>Email</label><br />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />

                <div>
                    <label>Phone</label><br />
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />

                <div>
                    <label>Upload Resume</label><br />
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files[0])}
                        required
                    />
                </div>
                <br />

                <button type="submit">Submit Application</button>
            </form>
        </Layout>
    );
};

export default JobDetails;
