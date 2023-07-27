import { useState, useEffect } from 'react'
import HeaderModal from '../components/HeaderModal'
import SelectModales from '../components/SelectRoles'
import Boton from '../components/Boton'

export default function LoginPage () {
  useEffect(() => {
    document.title = 'Inicio sesión'
  }, [])

  return (
    <main className="login-form-container">
      <article className="login-form bg-principal">
        <HeaderModal tituloModal={'Inicio de sesión'}/>

        <section className='login-form-inputs-cont'>

          <div className="inpContainer">
            <label htmlFor="inpUsuario" className='quicksand'>Usuario</label>
            <input id="inpUsuario" className="questrial" type="text" placeholder='Ingresa tu email'/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpContrasena" className='quicksand'>Contraseña</label>
            <input id="inpContrasena" className="questrial" type="text" placeholder='Ingresa tu contraseña'/>
          </div>

          <SelectModales />

          <Boton estilo={'btn-verde'}>
            Enviar
          </Boton>

        </section>
      </article>
    </main>
  )
}
