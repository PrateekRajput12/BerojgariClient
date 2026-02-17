import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const CandidateOffers = () => {
    const [offers, setOffers] = useState([]);
    const [processingId, setProcessingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchMyOffers = async () => {
        setLoading(true);
        try {
            const res = await api.get("/offers/my");
            setOffers(res.data.offers || []);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch offers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOffers();
    }, []);

    const accept = async (id) => {
        setProcessingId(id);
        try {
            const res = await api.patch(`/offers/${id}/accept`);
            toast.success(res.data.message || "Offer accepted");
            await fetchMyOffers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Accept failed");
        } finally {
            setProcessingId(null);
        }
    };

    const reject = async (id) => {
        setProcessingId(id);
        try {
            const res = await api.patch(`/offers/${id}/reject`);
            toast.success(res.data.message || "Offer rejected");
            await fetchMyOffers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Reject failed");
        } finally {
            setProcessingId(null);
        }
    };

    return (

        <div className="max-w-4xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Offers</h2>

            {loading && <p className="text-gray-500">Loading...</p>}

            {!loading && offers.length === 0 && (
                <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
                    No offer received yet.
                </div>
            )}

            <div className="space-y-5">
                {offers.map((o) => (
                    <div key={o._id} className="bg-white p-6 rounded-2xl shadow">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">₹ {o.salary}</p>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${o.status === "Accepted"
                                    ? "bg-green-100 text-green-700"
                                    : o.status === "Rejected"
                                        ? "bg-red-100 text-red-700"
                                        : o.status === "Expired"
                                            ? "bg-gray-200 text-gray-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {o.status}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                            Joining: {new Date(o.joiningDate).toDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                            Valid till: {new Date(o.validTill).toDateString()}
                        </p>

                        {/* ✅ only Sent can accept/reject */}
                        {o.status === "Sent" && (
                            <div className="flex gap-3 mt-5">
                                <button
                                    disabled={processingId === o._id}
                                    onClick={() => accept(o._id)}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg disabled:opacity-50"
                                >
                                    Accept
                                </button>

                                <button
                                    disabled={processingId === o._id}
                                    onClick={() => reject(o._id)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg disabled:opacity-50"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default CandidateOffers;
