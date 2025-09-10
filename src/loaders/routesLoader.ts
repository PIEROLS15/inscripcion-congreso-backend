import { Express } from 'express'
import fs from 'fs'
import path from 'path'

export const loadRoutes = (app: Express) => {
  const apiPath = path.join(__dirname, '../api')

  fs.readdirSync(apiPath).forEach((moduleName) => {
    const routesPath = path.join(apiPath, moduleName, 'routes', `${moduleName}.ts`)

    if (fs.existsSync(routesPath)) {

      const routes = require(routesPath).default
      app.use('/api', routes)
      console.log(`✅ Rutas cargadas para módulo: ${moduleName}`)
    }
  })
}
