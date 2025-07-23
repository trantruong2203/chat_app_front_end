import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getUserApi = async () => {
    const response = await axios.get(`${API}/user/me`, {
        withCredentials: true
    });
    return response.data;
};

