import { Request, Response } from 'express'

export default class Auth {
  register (req: Request, res:Response) {
    res.json({ hola: 'k mas' })
  }
}
