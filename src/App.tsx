import './App.css'
import './components/ResponsiveLayout.css'
import './components/MobileComponents.css'
import { useContext } from 'react';
import { ContextAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './hooks/useTheme';
import AuthRouter from './routers/AuthRouter';
import Home from './pages/Home.js';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';

// Theme Yahoo với màu tím đặc trưng
const yahooTheme = {
  token: {
    colorPrimary: '#7206f7',
    colorPrimaryHover: '#5a05c7',
    colorPrimaryActive: '#4a04a7',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#f8f9fa',
    colorBorder: '#e1e5e9',
    colorText: '#1a1a1a',
    colorTextSecondary: '#666666',
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Layout: {
      colorBgHeader: '#7206f7',
      colorBgSider: '#7206f7',
    },
    Menu: {
      colorItemBg: 'transparent',
      colorItemBgSelected: '#ffffff',
      colorItemText: '#ffffff',
      colorItemTextSelected: '#7206f7',
    },
    Button: {
      borderRadius: 6,
    },
    Input: {
      borderRadius: 6,
    },
  },
};

// Dark theme
const yahooDarkTheme = {
  token: {
    colorPrimary: '#7206f7',
    colorPrimaryHover: '#5a05c7',
    colorPrimaryActive: '#4a04a7',
    colorBgContainer: '#1f1f1f',
    colorBgElevated: '#2d2d2d',
    colorBorder: '#404040',
    colorText: '#ffffff',
    colorTextSecondary: '#b0b0b0',
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Layout: {
      colorBgHeader: '#7206f7',
      colorBgSider: '#7206f7',
    },
    Menu: {
      colorItemBg: 'transparent',
      colorItemBgSelected: '#ffffff',
      colorItemText: '#ffffff',
      colorItemTextSelected: '#7206f7',
    },
    Button: {
      borderRadius: 6,
    },
    Input: {
      borderRadius: 6,
    },
  },
  algorithm: theme.darkAlgorithm,
};

function AppContent() {
  const { accountLogin } = useContext(ContextAuth);
  const { themeMode } = useTheme();
  
  return (
    <ConfigProvider theme={themeMode === 'dark' ? yahooDarkTheme : yahooTheme}>
      {accountLogin ? <Home/> : <AuthRouter />}
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
