import { Request, Response } from 'express'
import { Usuario } from '../types/userTypes'
import { QueryError } from 'mysql2'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import pool from '../conexion'

export default class Auth {
  #convertirACamelCase = (texto: string): string => {
    return texto
      .trim()
      .split(' ')
      .map(palabra => palabra[0].toUpperCase() + palabra.slice(1).toLowerCase())
      .join(' ')
  }

  #generarContrasena = ({ nombres, apellidos, documento }: { nombres: string; apellidos: string; documento: number; }) => {
    const contrasena: string =
      nombres.slice(0, 2) + apellidos.slice(0, 2).toLowerCase() + documento
    return contrasena
  }

  #encriptarContrasena = async ({ contrasenaUsuario }: {contrasenaUsuario:string}) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(contrasenaUsuario, salt)
  }

  #enviarCorreoRegistro = async (usuario: Usuario, contrasenaUsuario: string) => {
    const configMail = {
      from: 'macampuzano67@misena.edu.co',
      to: usuario.usuario,
      subject: 'Registro plataforma SBOIPC',
      text: `Has sido registrado en el aplicativo SBOIPC, tu contraseña para ingresar es: ${contrasenaUsuario}`
    }

    // extraccion varibles entorno necesarias
    const emailUser = process.env.EMAIL_USERNAME
    const emailPass = process.env.EMAIL_PASSWORD

    // transportador necesario para poder enviar el correo con la info del usuario
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    })

    try {
      // envio del correo con la notificcación de registro
      const info = await transporter.sendMail(configMail)
      console.log(`El correo ha sido enviado: ${info.response}`)
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  register = async (req: Request, res: Response) => {
    const usuario: Usuario = req.body
    const conexion = await pool.getConnection()

    try {
      // formatear la informacion para guardar en bd
      usuario.nombres = this.#convertirACamelCase(usuario.nombres)
      usuario.apellidos = this.#convertirACamelCase(usuario.apellidos)

      const contrasenaUsuario = this.#generarContrasena({
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        documento: usuario.documento
      })

      usuario.contrasena = await this.#encriptarContrasena({ contrasenaUsuario })

      // inicio transacion de la bd
      conexion.beginTransaction()

      // consulta a bd
      await conexion.query('CALL sp_registro_usuario(?, ?, ?, ?, ?, ?, ?)', [
        usuario.documento,
        usuario.nombres,
        usuario.apellidos,
        usuario.usuario,
        usuario.contrasena,
        1,
        usuario.idRol
      ])

      this.#enviarCorreoRegistro(usuario, contrasenaUsuario)

      // si todo sale bien se compromenten los cambios
      conexion.commit()

      return res.status(200).json(usuario)
    } catch (error) {
      console.log(error)

      // si hay un error y entra al catch se revierten los cambios en la bd
      conexion.rollback()

      // si el error es 1062 quiere decir que hay un dato repetido
      if ((error as QueryError).errno === 1062) {
        console.log(error as QueryError)
        return res.status(401).json({ mensaje: 'El usuario ya se encuentra registrado, por favor verifica la información' })
      }
      return res.status(500).json({ mensaje: 'Error interno, por favor intentálo mas tarde' })
    }
  }
}
