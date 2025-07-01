import './App.css'
import ClientRouter from './routers/ClientRouter.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Fetcher from './Fetcher';

function App() {
  return (
    <>
      <ClientRouter />
      <ToastContainer />
      <Fetcher />
    </>
  )
}

export default App;
