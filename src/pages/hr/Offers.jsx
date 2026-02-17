import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/axios";
import { toast } from "react-toastify";

const HROffers = () => {
    const [offers, setOffers] = useState([]);
    const [selectedApps, setSelectedApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    const [form, setForm] = useState({
        applicationId: "",
        salary: "",
        joiningDate: "",
        validTill: "",
    });

    // ---------------- FETCHERS ----------------
    const fetchOffers = async () => {
        try {
            const res = await api.get("/offers");

            // backend might return: offers OR offer (single) OR data.offers
            const list = res.data?.offers || (res.data?.offer ? [res.data.offer] : []);
            setOffers(list);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch offers");
            setOffers([]);
        }
    };

    const fetchSelectedApplications = async () => {
        try {
            const res = await api.get("/applications/selected");
            console.log(res)
            setSelectedApps(res.data?.applications || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch selected applications"
            );
            setSelectedApps([]);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await Promise.all([fetchOffers(), fetchSelectedApplications()]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // for UI preview (selected candidate/job while creating offer)
    const selectedApp = useMemo(
        () => selectedApps.find((a) => a._id === form.applicationId),
        [selectedApps, form.applicationId]
    );

    // ---------------- HANDLERS ----------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const createOffer = async (e) => {
        e.preventDefault();

        if (!form.applicationId || !form.salary || !form.joiningDate || !form.validTill) {
            toast.error("All fields are required");
            return;
        }

        try {
            setSending(true);

            await api.post("/offers", {
                applicationId: form.applicationId,
                salary: Number(form.salary),
                joiningDate: form.joiningDate,
                validTill: form.validTill,
            });

            toast.success("Offer created & sent!");

            // reset form
            setForm({ applicationId: "", salary: "", joiningDate: "", validTill: "" });

            // refresh lists
            await Promise.all([fetchOffers(), fetchSelectedApplications()]);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create offer");
        } finally {
            setSending(false);
        }
    };

    const safeDate = (d) => {
        if (!d) return "N/A";
        const dt = new Date(d);
        return isNaN(dt.getTime()) ? "N/A" : dt.toDateString();
    };

    // interviewer/job/candidate may come in different shapes depending on backend population
    const getOfferApplication = (o) => o?.application || o?.applicationId || null;

    return (

        <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-6">Offer Management</h2>

            {/* Create Offer */}
            <form
                onSubmit={createOffer}
                className="bg-white shadow-md rounded-xl p-6 space-y-4"
            >
                <h3 className="text-lg font-semibold">Create Offer</h3>

                <select
                    name="applicationId"
                    value={form.applicationId}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="">Select Selected Candidate</option>
                    {selectedApps.map((a) => (
                        <option key={a._id} value={a._id}>
                            {a.candidate?.name} - {a.candidate?.email} (Job: {a.job?.title})
                        </option>
                    ))}
                </select>

                {/* optional preview */}
                {selectedApp && (
                    <div className="border rounded-lg p-3 bg-gray-50 text-sm">
                        <p className="font-semibold">
                            Candidate: {selectedApp.candidate?.name} ({selectedApp.candidate?.email})
                        </p>
                        <p className="text-gray-600">Job: {selectedApp.job?.title}</p>
                    </div>
                )}

                <input
                    type="number"
                    name="salary"
                    placeholder="Salary (e.g. 500000)"
                    value={form.salary}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Joining Date</label>
                        <input
                            type="date"
                            name="joiningDate"
                            value={form.joiningDate}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Valid Till</label>
                        <input
                            type="date"
                            name="validTill"
                            value={form.validTill}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                </div>

                <button
                    disabled={sending}
                    className="bg-purple-600 disabled:opacity-60 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                    {sending ? "Sending..." : "Send Offer"}
                </button>
            </form>

            {/* All Offers */}
            <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">All Offers</h3>

                {loading ? (
                    <p>Loading...</p>
                ) : offers.length === 0 ? (
                    <p>No offers yet.</p>
                ) : (
                    <div className="space-y-4">
                        {offers.map((o) => {
                            const app = getOfferApplication(o);

                            const candidateName =
                                app?.candidate?.name ||
                                o?.candidate?.name ||
                                "N/A";

                            const candidateEmail =
                                app?.candidate?.email ||
                                o?.candidate?.email ||
                                "";

                            const jobTitle =
                                app?.job?.title ||
                                o?.job?.title ||
                                "N/A";

                            const jobLocation =
                                app?.job?.location ||
                                o?.job?.location ||
                                "";

                            return (
                                <div key={o._id} className="bg-white border rounded-xl p-5">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">Salary: ₹{o.salary}</p>
                                        <span className="text-sm px-2 py-1 rounded bg-gray-100">
                                            {o.status || "Pending"}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-700 mt-2">
                                        <b>Candidate:</b> {candidateName}{" "}
                                        {candidateEmail ? `(${candidateEmail})` : ""}
                                    </p>

                                    <p className="text-sm text-gray-700">
                                        <b>Job:</b> {jobTitle} {jobLocation ? `• ${jobLocation}` : ""}
                                    </p>

                                    <p className="mt-2">Joining: {safeDate(o.joiningDate)}</p>
                                    <p>Valid Till: {safeDate(o.validTill)}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>

    );
};

export default HROffers;
