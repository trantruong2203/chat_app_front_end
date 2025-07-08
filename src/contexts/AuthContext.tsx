import { createContext } from 'react';
import type { UserResponse } from '../interface/UserResponse';

export interface AuthContextType {
  accountLogin: UserResponse | null;
  logout: () => void;
}

export const ContextAuth = createContext<AuthContextType>({
  accountLogin: null,
  logout: () => {}
}); 