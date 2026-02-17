import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMyApplications = async () => {
        setLoading(true);
        try {
            const res = await api.get("/applications/my");
            console.log(res)
            setApplications(res.data.applications || []);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyApplications();
    }, []);

    return (

        <div className="max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h2>

            {loading && <p className="text-gray-500">Loading...</p>}

            {!loading && applications.length === 0 && (
                <p className="text-gray-500">No applications yet.</p>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {applications.map((app) => (
                    <div key={app._id} className="bg-white p-6 rounded-2xl shadow">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {app.job?.title || "Job"}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Location: {app.job?.location || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                            Job Status: {app.job?.status || "N/A"}
                        </p>

                        <p className="text-sm mt-3">
                            Application Status:{" "}
                            <span className="font-semibold">{app.status}</span>
                        </p>

                        {app.resume?.url && (
                            <a
                                href={app.resume.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-4 text-purple-600 hover:underline text-sm"
                            >
                                View Resume →
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MyApplications;
