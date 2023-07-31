import { useEffect } from 'react'
import { urlServer } from '../consts'
import { alertaResultado } from '../utils'
import { useNavigate } from 'react-router-dom'
import HeaderModal from '../components/HeaderModal'
import SelectModales from '../components/SelectRoles'
import Boton from '../components/Boton'

export default function LoginPage () {
  useEffect(() => {
    document.title = 'Inicio sesión'
  }, [])

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formJson = JSON.stringify(Object.fromEntries(formData.entries()))

    const respuestaLogin = await fetch(`${urlServer}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formJson
    })

    if (respuestaLogin.ok) return navigate('/contratos')

    alertaResultado({
      respuesta: respuestaLogin,
      mensajeExito: '¡Bienvenido!'
    })
  }

  return (
    <main className="login-form-container">
      <article className="login-form bg-principal">
        <HeaderModal tituloModal={'Inicio de sesión'}/>

        <form id="login-form" className='login-form-inputs-cont' onSubmit={handleSubmit}>

          <div className="inpContainer">
            <label htmlFor="inpUsuario" className='quicksand'>Usuario</label>
            <input id="inpUsuario" name="usuario" className="questrial" type="text" placeholder='Ingresa tu email' required />
          </div>

          <div className="inpContainer">
            <label htmlFor="inpContrasena" className='quicksand'>Contraseña</label>
            <input id="inpContrasena" name="contrasena" className="questrial" type="password" placeholder='Ingresa tu contraseña' required />
          </div>

          <SelectModales />

          <Boton
            estilo={'btn-verde'}
            form='login-form'
          >
            Enviar
          </Boton>

        </form>
      </article>
    </main>
  )
}
