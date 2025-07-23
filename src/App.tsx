import './App.css'
import ClientRouter from './routers/ClientRouter.js';
import 'react-toastify/dist/ReactToastify.css';
import ToastifyNotification from './services/ToastifyNotification';
import { useContext } from 'react';
import { ContextAuth } from './contexts/AuthContext';
import AuthRouter from './routers/AuthRouter';

function App() {
  const { accountLogin } = useContext(ContextAuth);
  return (
    <>
      {accountLogin ? <ClientRouter /> : <AuthRouter />}
      <ToastifyNotification />
    </>
  )
}

export default App;
