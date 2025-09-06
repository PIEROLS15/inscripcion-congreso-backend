import * as reniecController from '../controllers/reniec'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
  {
    method: 'get',
    path: '/v1/reniec/dni',
    handler: reniecController.getReniecData,
    middlewares: [],
  },
]

export default buildRouter(routes)
