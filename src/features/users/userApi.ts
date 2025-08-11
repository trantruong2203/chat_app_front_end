import axios from "axios";
import type { LoginRequest, LoginResponse, UserResponse } from "../../interface/UserResponse";

const API = import.meta.env.VITE_API_URL;

export const fetchAllUsers = async () => {
    const res = await axios.get(`${API}/user`, {
        withCredentials: true
    });
    return res.data;
};

export const getUserByAccount = async (email : string) : Promise<UserResponse> => {
    const res = await axios.get<UserResponse>(`${API}/user/${email}`, {
        withCredentials: true
    });
    return res.data;
};

export const login = async (account : LoginRequest): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>(`${API}/user/login`, account, {
        withCredentials: true
    });
    return res.data;
};

export const register = async (account: UserResponse): Promise<UserResponse> => {
  const res = await axios.post<UserResponse>(`${API}/user/register`, account, {
    withCredentials: true
  });
  return res.data;
};

export const updateUser = async (username: string, birthday: string, phone: string, gender: string, email: string, status: number, avatar: string): Promise<UserResponse> => {
    const res = await axios.patch<UserResponse>(`${API}/user/update/${email}`, {
        username,
        birthday,
        phone,
        gender,
        status,
        avatar
    }, {
        withCredentials: true
    });
    return res.data;
};
  
export const updatePassword = async (email: string, password: string): Promise<UserResponse> => {
    const res = await axios.put<UserResponse>(`${API}/user/update-password/${email}`, {
        password
    }, {
        withCredentials: true
    });
    return res.data;
};
