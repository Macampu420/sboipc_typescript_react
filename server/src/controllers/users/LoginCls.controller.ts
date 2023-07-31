import { Request, Response } from 'express'
import { InicioSesion, Usuario } from '../../types/users/userTypes'
import bcrypt from 'bcryptjs'
import pool from '../../conexion'
import { RowDataPacket } from 'mysql2'
import { manejoError } from '../../utils'

export default class Login {
  #decifrarContrasena = async (contrasenaUsuario: string, contrasenaCifrada:string) => {
    return await bcrypt.compare(contrasenaUsuario, contrasenaCifrada)
  }

  #verificarUsuario = async (datosInicioSesion:InicioSesion) => {
    try {
      const { usuario, idRol } = datosInicioSesion
      const [rows] = await pool.query('CALL sp_verificar_usuario(?, ?)', [usuario, idRol])

      if (!(rows as RowDataPacket[])[0].length) return false

      return (rows as RowDataPacket[])[0][0]
    } catch (error: unknown) {
      manejoError(error)
    }
  }

  Login = async (req:Request, res:Response) => {
    const datosInicioSesion: InicioSesion = req.body

    try {
      const usuario: Usuario | boolean = await this.#verificarUsuario(datosInicioSesion)

      if (!usuario) return res.status(401).json({ mensaje: 'El usuario y el rol no coinciden' })

      const contrasenaDecifrada = await this.#decifrarContrasena(datosInicioSesion.contrasena, (usuario as Usuario).contrasena)

      if (!contrasenaDecifrada) return res.status(500).json({ mensaje: 'Contraseña incorrecta!' })

      res.end()
    } catch (error) {

    }
  }
}
