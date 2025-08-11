import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import ToastifyNotification from './services/ToastifyNotification';
import { useContext } from 'react';
import { ContextAuth } from './contexts/AuthContext';
import AuthRouter from './routers/AuthRouter';
import Home from './pages/Home.js';

function App() {
  const { accountLogin } = useContext(ContextAuth);
  return (
    <>
      {accountLogin ? <Home/> : <AuthRouter />}
      <ToastifyNotification />
    </>
  )
}

export default App;
