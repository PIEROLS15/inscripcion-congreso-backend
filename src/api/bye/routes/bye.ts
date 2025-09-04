import * as byeController from '../controllers/bye'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
  {
    method: 'get',
    path: '/v1/bye',
    handler: byeController.sayBye,
    middlewares: [],
  },
]

export default buildRouter(routes)
