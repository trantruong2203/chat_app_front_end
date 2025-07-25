import axios from "axios";
    import type {  Message } from "../../interface/UserResponse";

const API = import.meta.env.VITE_API_URL;

// Định nghĩa interface cho response từ API
export interface ApiResponse {
  message: string;
  data: Message;
}

export const fetchAllMessages = async () : Promise<Message[]> => {
    const response = await axios.get(`${API}/message`, {
        withCredentials: true
    });
    return response.data;
};

export const fetchMessageById = async (id: number) : Promise<Message> => {
    const response = await axios.get(`${API}/message/${id}`, {
        withCredentials: true
    });
    return response.data;
};

export const createMessage = async (message: Message) : Promise<ApiResponse> => {
    const response = await axios.post(`${API}/message`, message
    , {
        withCredentials: true
    });
    return response.data;
};

export const updateMessage = async (id: number, message: Message) : Promise<ApiResponse> => {
    const response = await axios.put(`${API}/message/${id}`, 
        message
    , {
        withCredentials: true
    });
    return response.data;
};

export const deleteMessage = async (id: number) : Promise<ApiResponse> => {
    const response = await axios.delete(`${API}/message/${id}`, {
        withCredentials: true
    });
    return response.data;
};