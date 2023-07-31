import { ROLES } from '../consts'

export default function SelectModales ({ modalRegistro }) {
  return (
    <div
      className={`inpContainer ${modalRegistro ? 'slc-rol-register' : ''}`}
      name='idRol'
    >
      <label htmlFor="slcRol" className='quicksand'>Rol</label>
      <select className='questrial' name="idRol" id="slcRol">
        <option defaultValue disabled>Selecciona el rol</option>
        <option value={ROLES['super usuario']}>super usuario</option>
        <option value={ROLES.usuario}>usuario</option>
        <option value={ROLES['usuario consulta']}>usuario consulta</option>
      </select>
    </div>
  )
}
