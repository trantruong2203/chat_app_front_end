import type { UserResponse } from "../interface/UserResponse";

const getObjectById = (data: UserResponse[], email: string) : UserResponse | undefined => {
    return data.find((item) => item.email === email);
};

export { getObjectById };