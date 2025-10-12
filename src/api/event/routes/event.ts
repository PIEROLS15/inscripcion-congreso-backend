import * as eventController from '../controllers/event'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
  { method: 'get', path: '/v1/events', handler: eventController.list, middlewares: [] },
  { method: 'get', path: '/v1/events/:id', handler: eventController.find, middlewares: [] },
  { method: 'post', path: '/v1/events', handler: eventController.create, middlewares: [] },
  { method: 'put', path: '/v1/events/:id', handler: eventController.update, middlewares: [] },
  { method: 'delete', path: '/v1/events/:id', handler: eventController.remove, middlewares: [] }
]

export default buildRouter(routes)
