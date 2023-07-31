import './pages/login.css'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegistroUsuarioModal from './pages/Register'
import ContratosPage from './pages/Contratos'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: 'usuarios/registro',
    element: <RegistroUsuarioModal />
  },
  {
    path: '/contratos',
    element: <ContratosPage />
  }
])
