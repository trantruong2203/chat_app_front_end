import './App.css'
import ClientRouter from './routers/ClientRouter.js';
import 'react-toastify/dist/ReactToastify.css';
import Fetcher from './Fetcher';
import ToastifyNotification from './services/ToastifyNotification';

function App() {
  return (
    <>
      <ClientRouter />
      <ToastifyNotification />
      <Fetcher />
    </>
  )
}

export default App;
