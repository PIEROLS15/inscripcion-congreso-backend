import * as inscriptionStateController from '../controllers/inscription-state'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/inscription-state',
        handler: inscriptionStateController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/inscription-state',
        handler: inscriptionStateController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/inscription-state/:id',
        handler: inscriptionStateController.find,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/inscription-state/:id',
        handler: inscriptionStateController.update,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/inscription-state/:id',
        handler: inscriptionStateController.remove,
        middlewares: [],
    }
]

export default buildRouter(routes)
