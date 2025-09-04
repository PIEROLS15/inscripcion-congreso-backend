import * as helloController from '../controllers/hello'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
  {
    method: 'get',
    path: '/v1/hello',
    handler: helloController.sayHello,
    middlewares: [],
  },
]

export default buildRouter(routes)
