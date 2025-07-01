import { createContext } from 'react';

export interface AuthContextType {
  accountLogin: string | null;
  saveLocal: (key: string, value: string) => void;
  logout: () => void;
}

export const ContextAuth = createContext<AuthContextType>({
  accountLogin: null,
  saveLocal: () => {},
  logout: () => {}
}); 