import { Router, Request, Response, NextFunction } from 'express'
import { validarSchema } from '../middlewares/validarSchema.middleware'
import { schemaRegistroUsuario } from '../schemas/auth'
import Auth from '../controllers/AuthCls.cotroller'

const router = Router()
const objAuth = new Auth()

router.post('/register',
  (req:Request, res:Response, next:NextFunction) => {
    console.log(req.body)

    validarSchema(schemaRegistroUsuario, req, res, next)
  },
  objAuth.register
)

export default router
