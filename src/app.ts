import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler'
import { loadRoutes } from './loaders/routesLoader'

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

loadRoutes(app)

app.use(errorHandler)

export default app
