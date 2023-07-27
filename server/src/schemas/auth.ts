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
    .min(7, { message: 'El documento debe tener mínimo 7 dígitos' }),

  nombres: z.string(errorBasicoTipoDato('nombres', 'texto'))
    .min(3),

  apellidos: z.string(errorBasicoTipoDato('apellidos', 'texto'))
    .min(3),

  usuario: z.string(errorBasicoTipoDato('correo', 'texto'))
    .email({ message: 'El formato del correo no es válido' })
    .includes('sena', { message: 'El correo debe pertenecer al sena' }),

  contrasena: z.string(errorBasicoTipoDato('contraseña', 'texto'))
    .min(6, { message: 'La contraseña debe tener mínimo 6 caracteres' }), // La contraseña sigue siendo una cadena de texto con un mínimo de 6 caracteres, pero ahora es requerida

  idTipoGrafico: z.string().min(1),
  idRol: z.string().min(1)
})

// Esquema para representar los datos de registro de usuario, omitiendo los campos idTipoGrafico e idRol
export const schemaRegistroUsuario = schemaUsuario
  .omit({
    idTipoGrafico: true,
    contrasena: true
  })
  .required()

// Esquema para representar los datos de inicio de sesión, seleccionando solo los campos usuario, contrasena e idRol
export const schemaInicioSesion = schemaUsuario
  .pick({
    usuario: true,
    contrasena: true,
    idRol: true
  })
  .required() // Los campos seleccionados (usuario, contrasena, idRol) deben ser requeridos
