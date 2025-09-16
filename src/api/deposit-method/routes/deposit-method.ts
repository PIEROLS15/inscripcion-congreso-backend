import * as depositMetodTypesController from '../controllers/deposit-method'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/registration-types',
        handler: depositMetodTypesController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/registration-types',
        handler: depositMetodTypesController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/registration-types/:id',
        handler: depositMetodTypesController.find,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/registration-types/:id',
        handler: depositMetodTypesController.update,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/registration-types/:id',
        handler: depositMetodTypesController.remove,
        middlewares: [],
    },
]

export default buildRouter(routes)
