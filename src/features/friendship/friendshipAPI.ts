import axios from "axios";
import type { FriendShip } from "../../interface/UserResponse";

const API = import.meta.env.VITE_API_URL;

export const fetchAllFriendShips = async () : Promise<FriendShip[]> => {
    const response = await axios.get(`${API}/friendship`, {
        withCredentials: true
    });
    return response.data;
};

export const fetchFriendShipById = async (id: number) : Promise<FriendShip> => {
    const response = await axios.get(`${API}/friendship/${id}`, {
        withCredentials: true
    });
    return response.data;
};

export const createFriendShip = async (friendship: FriendShip) : Promise<FriendShip> => {
    const response = await axios.post(`${API}/friendship`, friendship
    , {
        withCredentials: true
    });
    return response.data;
};

export const updateFriendShip = async (id: number, friendShip: FriendShip  ) : Promise<FriendShip> => {
    const response = await axios.put(`${API}/friendship/${id}`, 
        friendShip
    , {
        withCredentials: true
    });
    return response.data;
};

export const deleteFriendShip = async (id: number) : Promise<FriendShip> => {
    const response = await axios.delete(`${API}/friendship/${id}`, {
        withCredentials: true
    });
    return response.data;
};