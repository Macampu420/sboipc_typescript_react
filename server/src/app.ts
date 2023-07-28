// Importar las dependencias requeridas
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import * as dotenv from 'dotenv'
import path from 'path'

// Importar las rutas de la aplicacion
import AuthRouter from './routes/auth.routes'

// configuracion de origenes permitidos para solicitudes al server (app cliente)
const corsOptions = {
  origin: 'http://localhost:5173'
}

// configuracion de las variables de entorno
dotenv.config({
  path: path.join(__dirname, './.env')
})

const app = express() // Crear una instancia de la aplicación Express
const port = 3000 || process.env.port // Definir el puerto en el que se ejecutará la aplicación, por defecto 3000 o el valor proporcionado en la variable de entorno 'port'

// Configuración de middlewares
app.use(helmet()) // Usar el middleware Helmet para agregar encabezados de seguridad a las respuestas HTTP
app.use(morgan('dev')) // Usar el middleware Morgan con el formato 'dev' para registrar información de las solicitudes en la consola
app.use(express.json()) // Usar el middleware incorporado de Express para analizar las solicitudes con formato JSON
app.use(cors(corsOptions)) // Usar el middleware cors para recibir peticiones del cliente

// Configuración de las rutas
app.use('/api/auth', AuthRouter)

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => console.log(`App corriendo en el puerto ${port}`))
