import './App.css'
import { useContext } from 'react';
import { ContextAuth } from './contexts/AuthContext';
import AuthRouter from './routers/AuthRouter';
import Home from './pages/Home.js';
import { ConfigProvider } from 'antd';
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

function App() {
  const { accountLogin } = useContext(ContextAuth);
  return (
    <ConfigProvider theme={yahooTheme}>
      {accountLogin ? <Home/> : <AuthRouter />}
    </ConfigProvider>
  )
}

export default App;
