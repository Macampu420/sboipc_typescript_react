import { Router, Request, Response, NextFunction } from 'express'
import { validarSchema } from '../../middlewares/validarSchema.middleware'
import { schemaRegistroUsuario } from '../../schemas/users/users'
import Register from '../../controllers/users/RegisterCls.controller'
import Login from '../../controllers/users/LoginCls.controller'

const router = Router()
const objRegister = new Register()
const objLogin = new Login()

router.post('/register',
  (req:Request, res:Response, next:NextFunction) => {
    validarSchema(schemaRegistroUsuario, req, res, next)
  },
  objRegister.register
)

router.post('/login', objLogin.Login)
export default router
