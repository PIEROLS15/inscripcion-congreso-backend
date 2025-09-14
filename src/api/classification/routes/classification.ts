import * as classificationController from '../controllers/classification'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/classification',
        handler: classificationController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/classification',
        handler: classificationController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/classification/:id',
        handler: classificationController.find,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/classification/:id',
        handler: classificationController.update,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/classification/:id',
        handler: classificationController.remove,
        middlewares: [],
    }
]

export default buildRouter(routes)
