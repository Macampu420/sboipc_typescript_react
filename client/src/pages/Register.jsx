import './register.css'
import HeaderModal from '../components/HeaderModal'
import SelectModales from '../components/SelectRoles'
import Boton from '../components/Boton'

export default function RegistroUsuarioModal () {
  return (
    <main>
      <article className="register-form bg-principal">
        <HeaderModal tituloModal={'Registro de usuario'} />

        <form id="register-form" className='register-form-inputs-cont'>

          <div className="inpContainer">
            <label htmlFor="inpDocumento" className='quicksand'>Documento</label>
            <input id="inpDocumento" className="questrial" type="text" placeholder='Ingreso de documento' required/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpNombres" className='quicksand'>Nombres</label>
            <input id="inpNombres" className="questrial" type="text" placeholder='Ingreso de nombres' required/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpApellidos" className='quicksand'>Apellidos</label>
            <input id="inpApellidos" className="questrial" type="text" placeholder='Ingreso de apellidos' required/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpUsuario" className='quicksand'>Usuario</label>
            <input id="inpUsuario" className="questrial" type="text" placeholder='Ingreso de email' required/>
          </div>

          <SelectModales modalRegistro />

        </form>

        <footer>
          <Boton
            estilo={'btn-verde'}
            form='register-form'
          >
            Enviar
          </Boton>

          <Boton estilo={'btn-rojo'}>
            Cancelar
          </Boton>
        </footer>

      </article>
    </main>
  )
}
