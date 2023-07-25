import { z } from 'zod'

const errorBasicoTipoDato = (nombreCampo:string, tipoDato:string) => {
  return {
    required_error: `El campo ${nombreCampo} es requerido`,
    invalid_type_error: `El campo ${nombreCampo} debe ser un ${tipoDato}`
  }
}

// Esquema para representar los datos de un usuario completo
export const schemaUsuario = z.object({
  documento: z.string(errorBasicoTipoDato('documento', 'numero'))
    .min(7, { message: 'El documento debe tener minimo 7 digitos' }), // El documento debe ser un número con un mínimo de 7 dígitos

  nombres: z.string(errorBasicoTipoDato('nombres', 'texto'))
    .min(3), // Los nombres deben ser una cadena de texto con un mínimo de 3 caracteres

  apellidos: z.string(errorBasicoTipoDato('apellidos', 'texto'))
    .min(3), // Los apellidos deben ser una cadena de texto con un mínimo de 3 caracteres

  usuario: z.string(errorBasicoTipoDato('correo', 'texto'))
    .email({ message: 'El formato del correo no es válido' })
    .includes('sena', { message: 'El correo debe pertenecer al sena' }), // El usuario debe ser una cadena de texto con formato de correo electrónico y debe incluir la palabra "sena"

  contrasena: z.string(errorBasicoTipoDato('contraseña', 'texto'))
    .min(6, { message: 'La contraseña debe tener minimo 6 caracteres' }), // La contraseña debe ser una cadena de texto con un mínimo de 6 caracteres

  idTipoGrafico: z.number(), // El idTipoGrafico debe ser un número
  idRol: z.number() // El idRol debe ser un número
})

// Esquema para representar los datos de registro de usuario, omitiendo los campos idTipoGrafico e idRol
export const schemaRegistroUsuario = schemaUsuario
  .omit({
    idTipoGrafico: true
  })
  .required() // Todos los campos restantes (documento, nombres, apellidos, usuario, contrasena) deben ser requeridos

// Esquema para representar los datos de inicio de sesión, seleccionando solo los campos usuario, contrasena e idRol
export const schemaInicioSesion = schemaUsuario
  .pick({
    usuario: true,
    contrasena: true,
    idRol: true
  })
  .required() // Los campos seleccionados (usuario, contrasena, idRol) deben ser requeridos
