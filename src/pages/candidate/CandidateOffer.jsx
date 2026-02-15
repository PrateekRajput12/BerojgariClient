import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const CandidateOffer = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/offers/my");
            console.log(res)
            setOffers(res.data.offers || []);
        } catch (error) {
            console.error("Error fetching offers:", error);
            toast.error("Failed to fetch offers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleAction = async (id, type) => {
        try {
            await api.patch(`/offers/${id}/${type}`);
            toast.success(`Offer ${type === "accept" ? "Accepted" : "Rejected"}`);
            fetchOffers();
        } catch (error) {
            console.error(`${type} error:`, error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-2xl font-bold mb-8 text-gray-800">
                    My Offers
                </h1>

                {loading && (
                    <div className="text-center text-gray-500">
                        Loading offers...
                    </div>
                )}

                {!loading && offers.length === 0 && (
                    <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                        No offers available
                    </div>
                )}

                <div className="space-y-6">
                    {offers.map((offer) => (
                        <div
                            key={offer._id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    ₹{offer.salary}
                                </h2>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${offer.status === "Accepted"
                                        ? "bg-green-100 text-green-700"
                                        : offer.status === "Rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {offer.status}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm">
                                Joining Date:{" "}
                                {new Date(offer.joiningDate).toLocaleDateString()}
                            </p>

                            {offer.status === "Pending" && (
                                <div className="mt-5 flex gap-4">
                                    <button
                                        onClick={() =>
                                            handleAction(offer._id, "accept")
                                        }
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                                    >
                                        Accept
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleAction(offer._id, "reject")
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CandidateOffer;
