import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Lấy theme từ localStorage hoặc system preference
    const savedTheme = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Kiểm tra system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Lưu theme vào localStorage
    localStorage.setItem('theme-mode', themeMode);
    
    // Cập nhật class trên body
    document.body.className = themeMode;
    
    // Cập nhật CSS variables
    if (themeMode === 'dark') {
      document.documentElement.style.setProperty('--yahoo-bg', '#1f1f1f');
      document.documentElement.style.setProperty('--yahoo-bg-secondary', '#2d2d2d');
      document.documentElement.style.setProperty('--yahoo-text', '#ffffff');
      document.documentElement.style.setProperty('--yahoo-text-secondary', '#b0b0b0');
      document.documentElement.style.setProperty('--yahoo-border', '#404040');
      document.documentElement.style.setProperty('--yahoo-primary', '#7206f7');
      document.documentElement.style.setProperty('--yahoo-primary-hover', '#5a05c7');
      document.documentElement.style.setProperty('--yahoo-success', '#52c41a');
    } else {
      document.documentElement.style.setProperty('--yahoo-bg', '#ffffff');
      document.documentElement.style.setProperty('--yahoo-bg-secondary', '#f8f9fa');
      document.documentElement.style.setProperty('--yahoo-text', '#1a1a1a');
      document.documentElement.style.setProperty('--yahoo-text-secondary', '#666666');
      document.documentElement.style.setProperty('--yahoo-border', '#e1e5e9');
      document.documentElement.style.setProperty('--yahoo-primary', '#7206f7');
      document.documentElement.style.setProperty('--yahoo-primary-hover', '#5a05c7');
      document.documentElement.style.setProperty('--yahoo-success', '#52c41a');
    }
  }, [themeMode]);

  // Lắng nghe thay đổi system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme-mode')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value: ThemeContextType = {
    themeMode,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext }; 