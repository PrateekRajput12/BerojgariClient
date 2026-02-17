import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            toast.success("Logged in Successfully");

            if (user?.role === "HR") navigate("/hr");
            if (user?.role === "Recruiter") navigate("/recruiter");
            if (user?.role === "Interviewer") navigate("/interviewer");
            if (user?.role === "Candidate") navigate("/candidate");
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
                        Login to your Account
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 mb-6">
                        Welcome back! Select the below login methods.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email ID / Username
                            </label>
                            <input
                                type="email"
                                placeholder="Enter email id / username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                    className="accent-purple-600"
                                />
                                Remember me
                            </label>

                            <span className="text-purple-600 cursor-pointer hover:underline">
                                Forgot Password?
                            </span>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
                        >
                            Login
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="px-3 text-gray-400 text-sm">or login with</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        {/* Social Icons */}
                        {/* <div className="flex justify-center gap-6 text-xl">
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
                        </div> */}

                        {/* Register */}
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account?{" "}
                            <span
                                onClick={() => navigate("/signup")}
                                className="text-purple-600 font-medium cursor-pointer hover:underline"
                            >
                                Register
                            </span>

                        </p>
                    </form>
                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className="hidden md:flex w-1/2 bg-purple-50 items-center justify-center p-8">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Login Illustration"
                        className="w-80"
                    />
                </div>

            </div>
        </div>
    );
};

export default Login;
