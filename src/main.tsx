import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/store.ts'
import ClientRouter from './routers/ClientRouter.js'
import Fetcher from './Fetcher.ts';
import AuthProvider from './contexts/AuthProvider.tsx'



createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>

    <Provider store={store}>
      <AuthProvider>
        <Fetcher />
        <ClientRouter />
      </AuthProvider>
    </Provider >
  </BrowserRouter>
)
