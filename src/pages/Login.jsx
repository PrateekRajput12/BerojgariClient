import React, { useState } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const { login, user } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await login(email, password)
            toast.success("Logged in Successfully")
            console.log(user)
            if (user?.role === "HR") navigate("/hr");
            if (user?.role === "Recruiter") navigate("/recruiter");
            if (user?.role === "Interviewer") navigate("/interviewer");
            if (user?.role === "Candidate") navigate("/candidate");
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div style={{ padding: "50px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );

}

export default Login