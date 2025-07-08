export  interface UserResponse {
  email: string;
  avatar: string;
  password: string;
  confirm: string;
  username: string;
  phone: string;
  gender: string;
  birthday: Date;
  agreement: boolean;
};
export interface LoginResponse {
  username: string;
  avatar: string;
  gender: string;
  birthday: Date;
  phone: string;
  agreement: boolean;
  email: string;
  password: string;
  confirm: string;
};

export interface LoginRequest {
  email: string;
  password: string;
};
