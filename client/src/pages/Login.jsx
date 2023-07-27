import { useState, useEffect } from 'react'

export default function LoginPage () {
  useEffect(() => {
    document.title = 'Inicio sesión'
  }, [])

  return (
    <main className="login-form-container">
      <article className="login-form">
        <header className="">
          <h1 className="login-form-title questrial">Inicio de sesión</h1>
          <img src="./../../public/images/senaBlanco.png" alt="" />
        </header>

        <section className='login-form-inputs-cont'>

          <div className="inpContainer">
            <label htmlFor="inpUsuario" className='quicksand'>Usuario</label>
            <input id="inpUsuario" className="questrial" type="text" placeholder='Ingresa tu email'/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpContrasena" className='quicksand'>Contraseña</label>
            <input id="inpContrasena" className="questrial" type="text" placeholder='Ingresa tu contraseña'/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpContrasena" className='quicksand'>Rol</label>
            <select className='questrial' name="" id="">
              <option selected disabled>Selecciona el rol</option>
              <option value="">super usuario</option>
              <option value="">usuario</option>
              <option value="">usuario consulta</option>
            </select>
          </div>

          <button type='submit' className='btn sombra-btn login-form-submit-btn'>Enviar</button>

        </section>
      </article>
    </main>
  )
}
