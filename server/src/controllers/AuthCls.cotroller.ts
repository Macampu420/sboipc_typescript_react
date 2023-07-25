import { Request, Response } from 'express'
import { RegistroUsuario } from '../types/userTypes'
import pool from '../conexion'
export default class Auth {
  #convertirACamelCase = (texto: string):string => {
    return texto.split(' ').map(palabra => palabra[0].toUpperCase() + palabra.slice(1).toLowerCase()).join(' ')
  }

  #generarContrasena = ({ nombres, apellidos, documento }: {nombres:string, apellidos:string, documento: number}) => {
    const contrasena: string = nombres.slice(0, 2) + apellidos.slice(0, 2).toLowerCase() + documento
    return contrasena
  }

  register = (req: Request, res:Response) => {
    const usuario: RegistroUsuario = req.body

    usuario.nombres = this.#convertirACamelCase(usuario.nombres)
    usuario.apellidos = this.#convertirACamelCase(usuario.apellidos)
    usuario.contrasena = this.#generarContrasena({ nombres: usuario.nombres, apellidos: usuario.apellidos, documento: usuario.documento })
    return res.json(usuario)
  }
}
