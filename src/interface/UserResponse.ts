export  interface UserResponse {
  email: string;
  password: string;
  confirm: string;
  username: string;
  phone: number;
  dob: Date;
  agreement: boolean;
};
export interface LoginResponse {
  username: string;
  dob: Date;
  phone: number;
  agreement: boolean;
  email: string;
  password: string;
  confirm: string;
};

export interface LoginRequest {
  email: string;
  password: string;
};
