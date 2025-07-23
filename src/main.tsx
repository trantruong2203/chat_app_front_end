import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/store.ts'
import Fetcher from './Fetcher.ts';
import AuthProvider from './contexts/AuthProvider.tsx'
import { ConfigProvider } from 'antd'
import ToastifyNotification from './services/ToastifyNotification'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx'



createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider>
        <AuthProvider>
          <App />
          <Fetcher />
          <ToastifyNotification />
        </AuthProvider>
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
)
