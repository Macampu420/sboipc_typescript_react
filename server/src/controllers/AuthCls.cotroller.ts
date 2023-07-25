import { Request, Response } from 'express'
import { RegistroUsuario } from '../types/userTypes'
export default class Auth {
  register (req: Request, res:Response) {
    const usuario: RegistroUsuario = req.body
    return res.json(usuario)
  }
}
