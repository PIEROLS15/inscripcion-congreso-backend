import * as inscriptionController from '../controllers/inscription'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/inscription',
        handler: inscriptionController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/inscription',
        handler: inscriptionController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/inscription/:id',
        handler: inscriptionController.find,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/inscription/:id',
        handler: inscriptionController.remove,
        middlewares: [],
    }
]

export default buildRouter(routes)
