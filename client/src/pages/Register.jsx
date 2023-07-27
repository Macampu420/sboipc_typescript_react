import './register.css'
import HeaderModal from '../components/HeaderModal'
import SelectModales from '../components/SelectRoles'
import Boton from '../components/Boton'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { urlServer } from '../consts'

const MySwal = withReactContent(Swal)

export default function RegistroUsuarioModal () {
  async function alertaResultado (respuestaRegistro) {
    if (respuestaRegistro.status === 200) {
      MySwal.fire({
        title: (
          <strong className="questrial" style={{ color: '#000' }}>
             El usuario ha sido registrado!
          </strong>
        ),
        icon: 'success'
      })
    } else {
      const respuestaJson = await respuestaRegistro.json()

      MySwal.fire({
        title: (
          <strong className="questrial" style={{ color: '#000' }}>
            {respuestaJson.mensaje || respuestaJson[0].message}
          </strong>
        ),
        icon: 'error'
      })
    }
  }

  async function handleSubmit (e) {
    // Prevent the browser from reloading the page
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    const formJson = JSON.stringify(Object.fromEntries(formData.entries()))

    const respuestaRegistro = await fetch(`${urlServer}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formJson
    })

    await alertaResultado(respuestaRegistro)
  }

  return (
    <main>
      <article className="register-form bg-principal">
        <HeaderModal tituloModal={'Registro de usuario'} />

        <form
          id="register-form"
          className='register-form-inputs-cont'
          onSubmit={handleSubmit}
        >

          <div className="inpContainer">
            <label htmlFor="inpDocumento" className='quicksand'>Documento</label>
            <input id="inpDocumento" name='documento' className="questrial" type="number" placeholder='Ingreso de documento' required/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpNombres" className='quicksand'>Nombres</label>
            <input id="inpNombres" name='nombres' className="questrial" type="text" placeholder='Ingreso de nombres' required/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpApellidos" className='quicksand'>Apellidos</label>
            <input id="inpApellidos" name='apellidos' className="questrial" type="text" placeholder='Ingreso de apellidos' required/>
          </div>

          <div className="inpContainer">
            <label htmlFor="inpUsuario" className='quicksand'>Usuario</label>
            <input id="inpUsuario" name='usuario' className="questrial" type="text" placeholder='Ingreso de email' required/>
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
