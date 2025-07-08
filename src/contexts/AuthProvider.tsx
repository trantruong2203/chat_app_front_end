import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ContextAuth, type AuthContextType } from './AuthContext';
import axios from 'axios';
import type { UserResponse } from '../interface/UserResponse';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [accountLogin, setAccountLogin] = useState<UserResponse | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        const response = await axios.get('http://localhost:3000/user/me', {
            withCredentials: true
        });
        setAccountLogin(response.data.user);
    };

    const logout = async () => {
        await axios.post('http://localhost:3000/user/logout', {}, {
            withCredentials: true,
        });
        navigate('/');
    };


    const authContextValue: AuthContextType = {
        accountLogin,
        logout
    };

    return (
        <ContextAuth.Provider value={authContextValue}>
            {children}
        </ContextAuth.Provider>
    );
}

export default AuthProvider;