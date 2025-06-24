import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routers } from './Routes/Routes'
import 'aos/dist/aos.css'; 
import Aos from 'aos'
import AuthProvider from './Authentication/AuthProvider'

Aos.init()

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider
        router={routers} >
    </RouterProvider>
  </AuthProvider>

)
