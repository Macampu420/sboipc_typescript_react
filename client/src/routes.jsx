import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/Login.jsx'
import './pages/login.css'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  }
])
