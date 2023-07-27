export default function SelectModales ({ modalRegistro }) {
  return (
    <div
      className={`inpContainer ${modalRegistro ? 'slc-rol-register' : ''}`}
    >
      <label htmlFor="slcRol" className='quicksand'>Rol</label>
      <select className='questrial' name="slcRol" id="slcRol">
        <option defaultValue disabled>Selecciona el rol</option>
        <option value="">super usuario</option>
        <option value="">usuario</option>
        <option value="">usuario consulta</option>
      </select>
    </div>
  )
}
