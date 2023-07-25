import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validarSchema = (schema:AnyZodObject, req:Request, res:Response, next:NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    console.log(error)

    if (error instanceof ZodError) {
      return res.json(error.issues.map(issue => ({
        path: issue.path,
        message: issue.message
      })))
    }

    return res.status(500).json({ message: 'internar error' })
  }
}
