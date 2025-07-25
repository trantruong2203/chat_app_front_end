export  interface UserResponse {
  id: number;
  email: string;
  avatar: string;
  password: string;
  confirm: string;
  username: string;
  phone: string;
  gender: string;
  birthday: string;
  agreement: boolean;
  status: number;
};
export interface LoginResponse {
  username: string;
  avatar: string;
  gender: string;
  birthday: string;
  phone: string;
  agreement: boolean;
  email: string;
  password: string;
  confirm: string;
  status: number;
};

export interface LoginRequest {
  email: string;
  password: string;
};

export interface FriendShip {

  id: number;
  userid: number;
  sentat: number;
  status: number;
};

export interface Message {
  id: number;
  senderid: number;
  receiverid: number;
  content: string;
  sentat: string;
  status: number;

}
