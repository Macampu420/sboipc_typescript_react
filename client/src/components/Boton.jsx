export default function Boton ({ children, estilo, onClick, form = '' }) {
  return (
    <button
      type='submit'
      className={`btn sombra-btn ${estilo}`}
      onClick={onClick}
      form={form}
    >
      {children}
    </button>
  )
}
