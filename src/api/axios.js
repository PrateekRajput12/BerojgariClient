import axios from "axios";

const api = axios.create({
    baseURL: "https://berojgari.onrender.com/",
    withCredentials: true
})

export default api