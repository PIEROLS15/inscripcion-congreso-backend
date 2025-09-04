import express from 'express'
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler'
import { loadRoutes } from './loaders/routesLoader'

const app = express()

app.use(express.json())

// logs HTTP (GET, POST, status, tiempo de respuesta, etc.)
app.use(morgan('dev'))

// cargar rutas automáticamente
loadRoutes(app)

// error handler global
app.use(errorHandler)

export default app
