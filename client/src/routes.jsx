import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login'
import './pages/login.css'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  }
])
