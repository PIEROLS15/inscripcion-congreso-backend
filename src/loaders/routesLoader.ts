import { Express } from 'express'
import fs from 'fs'
import path from 'path'

export const loadRoutes = (app: Express) => {
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' })
  })

  const apiPath = path.join(__dirname, '../api')

  fs.readdirSync(apiPath).forEach((moduleName) => {
    const routesDir = path.join(apiPath, moduleName, 'routes')
    
    if (fs.existsSync(routesDir)) {
      // Buscar todos los archivos en el directorio de rutas
      const routeFiles = fs.readdirSync(routesDir)
      
      routeFiles.forEach((fileName) => {
        if (fileName.endsWith('.js') || fileName.endsWith('.ts')) {
          try {
            const routePath = path.join(routesDir, fileName)
            const routes = require(routePath).default
            
            if (routes) {
              app.use('/api', routes)
              console.log(`✅ Rutas cargadas: ${moduleName}/${fileName}`)
            }
          } catch (error) {
            console.log(`❌ Error cargando rutas ${moduleName}/${fileName}:`, error instanceof Error ? error.message : error)
          }
        }
      })
    }
  })
}
