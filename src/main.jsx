import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routers } from './Routes/Routes'
import 'aos/dist/aos.css'; 
import Aos from 'aos'
import AuthProvider from './Authentication/AuthProvider'
import { ToastContainer } from 'react-toastify'

Aos.init()

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ToastContainer></ToastContainer>
    <RouterProvider
      router={routers} >
    </RouterProvider>
  </AuthProvider>

)
