import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const CandidateJobs = () => {
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const res = await api.get("/job/all");
            setJobs(res.data.jobs);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <Layout>
            <h2>Available Jobs</h2>

            {jobs
                .filter((job) => job.status !== "Closed")
                .map((job) => (
                    <div key={job._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                        <h3>{job.title}</h3>
                        <p>{job.location}</p>

                        <Link to={`/candidate/jobs/${job._id}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
        </Layout>
    );
};

export default CandidateJobs;
