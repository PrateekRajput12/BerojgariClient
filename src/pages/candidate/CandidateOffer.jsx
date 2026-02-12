import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const CandidateOffer = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/offers/my");
            setOffers(res.data.offers || []);
        } catch (error) {
            console.log("Error fetching offers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const acceptOffer = async (id) => {
        try {
            await api.patch(`/offers/${id}/accept`);
            alert("Offer Accepted");
            fetchOffers();
        } catch (error) {
            console.log("Accept error:", error);
        }
    };

    const rejectOffer = async (id) => {
        try {
            await api.patch(`/offers/${id}/reject`);
            alert("Offer Rejected");
            fetchOffers();
        } catch (error) {
            console.log("Reject error:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>My Offers</h1>

            {loading && <p>Loading...</p>}

            {!loading && offers.length === 0 && <p>No offers available</p>}

            {offers.map((offer) => (
                <div
                    key={offer._id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <p>Salary: ₹{offer.salary}</p>
                    <p>
                        Joining Date:{" "}
                        {new Date(offer.joiningDate).toLocaleDateString()}
                    </p>
                    <p>Status: {offer.status}</p>

                    {offer.status === "Pending" && (
                        <>
                            <button
                                onClick={() => acceptOffer(offer._id)}
                                style={{ marginRight: "10px" }}
                            >
                                Accept
                            </button>

                            <button onClick={() => rejectOffer(offer._id)}>
                                Reject
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CandidateOffer;