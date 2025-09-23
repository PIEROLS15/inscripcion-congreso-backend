import * as contactController from '../controllers/contact'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/contact',
        handler: contactController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/contact',
        handler: contactController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/contact/:id',
        handler: contactController.find,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/contact/:id',
        handler: contactController.remove,
        middlewares: [],
    }
]

export default buildRouter(routes)
