import { Router, RequestHandler } from 'express'

// Métodos HTTP permitidos
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

// Definición de una ruta
export interface AppRoute {
    method: HttpMethod
    path: string
    handler: RequestHandler
    middlewares?: RequestHandler[]
}

// Función para crear un router dinámicamente
export function buildRouter(routes: AppRoute[]): Router {
  const router = Router()

  routes.forEach((route) => {
    router[route.method](route.path, ...(route.middlewares ?? []), route.handler)
  })

  return router
}
