import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login'
import './pages/login.css'
import RegistroUsuarioModal from './pages/Register'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: 'usuarios/registro',
    element: <RegistroUsuarioModal />
  }
])
