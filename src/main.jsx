import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routers } from './Routes/Routes'
import 'aos/dist/aos.css'; 
import Aos from 'aos'
import AuthProvider from './Authentication/AuthProvider'
import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

Aos.init();


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <ToastContainer></ToastContainer>
      <RouterProvider
        router={routers} >
      </RouterProvider>
    </AuthProvider>
  </QueryClientProvider>
)
