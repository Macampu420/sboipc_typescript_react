import { Request, Response } from 'express'
import { RegistroUsuario } from '../types/userTypes'
import { QueryError } from 'mysql2'

import pool from '../conexion'
export default class Auth {
  #convertirACamelCase = (texto: string):string => {
    return texto.split(' ').map(palabra => palabra[0].toUpperCase() + palabra.slice(1).toLowerCase()).join(' ')
  }

  #generarContrasena = ({ nombres, apellidos, documento }: {nombres:string, apellidos:string, documento: string}) => {
    const contrasena: string = nombres.slice(0, 2) + apellidos.slice(0, 2).toLowerCase() + documento
    return contrasena
  }

  register = async (req: Request, res:Response) => {
    const usuario: RegistroUsuario = req.body

    usuario.nombres = this.#convertirACamelCase(usuario.nombres)
    usuario.apellidos = this.#convertirACamelCase(usuario.apellidos)
    usuario.contrasena = this.#generarContrasena({ nombres: usuario.nombres, apellidos: usuario.apellidos, documento: usuario.documento })

    try {
      await pool.query('CALL sp_registro_usuario(?, ?, ?, ?, ?, ?, ?)',
        [usuario.documento, usuario.nombres, usuario.apellidos, usuario.usuario, usuario.contrasena,
          1, usuario.idRol])
      return res.json(usuario)
    } catch (error) {
      if ((error as QueryError).errno === 1062) {
        console.log((error as QueryError))
        return res.status(401).json({ mensaje: 'El usuario ya se encuentra registrado, por favor verifica la información' })
      }
      return res.status(500).json({ mensaje: 'Error interno, por favor intentálo mas tarde' })
    }
  }
}
