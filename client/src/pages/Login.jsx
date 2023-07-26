import { useState, useEffect } from 'react'

export default function LoginPage () {
  useEffect(() => {
    document.title = 'Inicio sesión'
  }, [])

  return (
    <main className="login-form-container">
      <section className="login-form">
        <h1 className="login-form-title">Inicio de sesion</h1>
      </section>
    </main>
  )
}
