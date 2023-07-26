// Importar las dependencias requeridas
import express from 'express'
import helmet from 'helmet' // Helmet ayuda a asegurar la aplicación configurando encabezados HTTP adecuados
import morgan from 'morgan' // Morgan es un middleware para registrar solicitudes HTTP en la consola

// Importar las rutas de la aplicacion
import AuthRouter from './routes/auth.routes'

const app = express() // Crear una instancia de la aplicación Express
const port = 1111 || process.env.port // Definir el puerto en el que se ejecutará la aplicación, por defecto 3000 o el valor proporcionado en la variable de entorno 'port'

// Configuración de middlewares
app.use(helmet()) // Usar el middleware Helmet para agregar encabezados de seguridad a las respuestas HTTP
app.use(morgan('dev')) // Usar el middleware Morgan con el formato 'dev' para registrar información de las solicitudes en la consola
app.use(express.json()) // Usar el middleware incorporado de Express para analizar las solicitudes con formato JSON

// Configuración de las rutas
app.use('/api/auth', AuthRouter)

app.use('/', (req, res) => res.json({ mensaje: 'Hola Vale tqm :3' }))

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => console.log(`App corriendo en el puerto ${port}`))
