import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";

const CandidateOffers = () => {
    const [offers, setOffers] = useState([]);
    const [processingId, setProcessingId] = useState(null);

    const fetchMyOffers = async () => {
        const res = await api.get("/offers/my");
        console.log("hlo")
        console.log(res)
        setOffers(res?.data?.offers || []);
    };

    useEffect(() => {
        fetchMyOffers();
    }, []);

    const accept = async (id) => {
        setProcessingId(id);
        try {
            const res = await api.patch(`/offers/${id}/accept`);
            console.log(res)
            await fetchMyOffers();
        } finally {
            setProcessingId(null);
        }
    };

    const reject = async (id) => {
        setProcessingId(id);
        try {
            const res = await api.patch(`/offers/${id}/reject`);
            console.log(res)
            await fetchMyOffers();
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div>
            <h2>My Offers</h2>

            {offers.length === 0 ? (
                <p>No offer received yet.</p>
            ) : (
                offers.map((o) => (
                    <div key={o._id} style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px" }}>
                        <p>Salary: {o.salary}</p>
                        <p>Status: {o.status}</p>
                        <p>Joining: {new Date(o.joiningDate).toDateString()}</p>
                        <p>Valid Till: {new Date(o.validTill).toDateString()}</p>

                        {o.status === "Sent" && (
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button disabled={processingId === o._id} onClick={() => accept(o._id)}>
                                    Accept
                                </button>
                                <button disabled={processingId === o._id} onClick={() => reject(o._id)}>
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CandidateOffers;
