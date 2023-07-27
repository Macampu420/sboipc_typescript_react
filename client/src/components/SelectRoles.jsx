export default function SelectModales ({ modalRegistro }) {
  return (
    <div
      className={`inpContainer ${modalRegistro ? 'slc-rol-register' : ''}`}
      name='idRol'
    >
      <label htmlFor="slcRol" className='quicksand'>Rol</label>
      <select className='questrial' name="idRol" id="slcRol">
        <option defaultValue disabled>Selecciona el rol</option>
        <option value="1">super usuario</option>
        <option value="2">usuario</option>
        <option value="3">usuario consulta</option>
      </select>
    </div>
  )
}
