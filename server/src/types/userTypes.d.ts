import { z } from 'zod'
import { schemaUsuario, schemaRegistroUsuario, schemaInicioSesion } from '../schemas/auth'

// Tipo para representar el objeto de un usuario completo
export type Usuario = z.infer<typeof schemaUsuario>;

// Tipo para representar el objeto de registro de usuario
export type RegistroUsuario = z.infer<typeof schemaRegistroUsuario>;

// Tipo para representar el objeto de inicio de sesión
export type InicioSesion = z.infer<typeof schemaInicioSesion>;
