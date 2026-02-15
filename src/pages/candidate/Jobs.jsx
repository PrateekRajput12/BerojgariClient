import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const CandidateJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            const res = await api.get("/job/all");
            setJobs(res.data.jobs || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const openJobs = jobs.filter((job) => job.status !== "Closed");

    return (
        <Layout>
            <div className="max-w-6xl mx-auto py-10 px-4">

                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                    Available Jobs
                </h2>

                {/* Loading */}
                {loading && (
                    <div className="text-center text-gray-500 py-10">
                        Loading jobs...
                    </div>
                )}

                {/* Empty State */}
                {!loading && openJobs.length === 0 && (
                    <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
                        No open positions available right now.
                    </div>
                )}

                {/* Jobs Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!loading &&
                        openJobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {job.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-2">
                                        📍 {job.location}
                                    </p>

                                    <p className="text-gray-700 text-sm">
                                        ₹ {job.salary}
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        to={`/candidate/jobs/${job._id}`}
                                    >
                                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm transition">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default CandidateJobs;
