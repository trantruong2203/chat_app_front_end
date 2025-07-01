import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextAuth } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [accountLogin, setAccountLogin] = useState<string | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      const account = getLocal("account");
      if (account) {
        setAccountLogin(account);
      }
    },[]);

    const saveLocal = (key: string, value: string) => {
        try {
           localStorage.setItem(key, value);
            setAccountLogin(value);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };
    
    // Hàm giải mã để lấy lại dữ liệu từ localStorage
   const getLocal = (key: string): string | null => {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  };
  
 const logout = () => {
     setAccountLogin('');
     localStorage.removeItem("account");
     navigate('/')
 }

    return (
        <ContextAuth.Provider value={{ accountLogin, saveLocal, logout }}>
            {children}
        </ContextAuth.Provider>
    );
}

export default AuthProvider;