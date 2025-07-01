import axios from "axios";
import type { LoginRequest, LoginResponse, UserResponse } from "../../interface/UserResponse";

const API = "http://localhost:3000/user";

export const fetchAllUsers = async () => {
    const res = await axios.get(API);
    return res.data;
};

export const getUserByAccount = async (email : string) : Promise<UserResponse> => {
    const res = await axios.get<UserResponse>(`${API}/${email}`);
    return res.data;
};

export const login = async (account : LoginRequest): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>(`${API}/login`, account);
    return res.data;
};

export const register = async (account: UserResponse): Promise<UserResponse> => {
  const res = await axios.post<UserResponse>(`${API}/register`, account);
  return res.data;
};


