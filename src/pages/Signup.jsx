import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
    const { register } = useAuth(); // make sure register exists in AuthContext
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(formData);
            toast.success("Account Created Successfully 🎉");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden">

                {/* LEFT SIDE */}
                <div className="w-full md:w-1/2 p-10">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Create your Account
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 mb-6">
                        Join us today! Fill in the details below.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Role
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                <option value="">Choose your role</option>
                                <option value="HR">HR</option>
                                <option value="Recruiter">Recruiter</option>
                                <option value="Interviewer">Interviewer</option>
                                <option value="Candidate">Candidate</option>
                            </select>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2 text-sm text-purple-600 font-medium"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
                        >
                            Sign Up
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="px-3 text-gray-400 text-sm">or sign up with</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-6 text-xl">
                            <button className="hover:scale-110 transition">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                                    alt="Google"
                                    className="w-6"
                                />
                            </button>

                            <button className="hover:scale-110 transition">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                                    alt="Facebook"
                                    className="w-6"
                                />
                            </button>

                            <button className="hover:scale-110 transition">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                                    alt="LinkedIn"
                                    className="w-6"
                                />
                            </button>
                        </div>

                        {/* Login link */}
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-purple-600 font-medium cursor-pointer hover:underline"
                            >
                                Login
                            </span>
                        </p>
                    </form>
                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className="hidden md:flex w-1/2 bg-purple-50 items-center justify-center p-8">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                        alt="Signup Illustration"
                        className="w-80"
                    />
                </div>

            </div>
        </div>
    );
};

export default Signup;
