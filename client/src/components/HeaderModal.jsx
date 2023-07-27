import './headerModal.css'

export default function HeaderModal ({ tituloModal }) {
  return (
    <header className="headerModal">
      <h1 className="login-form-title questrial">{tituloModal}</h1>
      <img src="./../../public/images/senaBlanco.png" alt="Logo del sena" className="imgHeaderModal" />
    </header>
  )
}
