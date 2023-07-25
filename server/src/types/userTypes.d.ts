import { z } from 'zod'
import { schemaUsuario, schemaRegistroUsuario, schemaInicioSesion } from './usuarioSchemas'

// Tipo para representar el objeto de un usuario completo
export type Usuario = z.TypeOf<typeof schemaUsuario>;

// Tipo para representar el objeto de registro de usuario
export type RegistroUsuario = z.TypeOf<typeof schemaRegistroUsuario>;

// Tipo para representar el objeto de inicio de sesión
export type InicioSesion = z.TypeOf<typeof schemaInicioSesion>;
