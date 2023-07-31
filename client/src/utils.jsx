import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export async function alertaResultado ({ respuesta, mensajeExito }) {
  if (respuesta.status === 200) {
    MySwal.fire({
      title: (
        <strong className="questrial" style={{ color: '#000' }}>
           {mensajeExito}
        </strong>
      ),
      icon: 'success'
    })
  } else {
    const respuestaJson = await respuesta.json()

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
