import * as registrationTypesController from '../controllers/registration-type'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/registration-types',
        handler: registrationTypesController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/registration-types',
        handler: registrationTypesController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/registration-types/:id',
        handler: registrationTypesController.find,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/registration-types/:id',
        handler: registrationTypesController.update,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/registration-types/:id',
        handler: registrationTypesController.remove,
        middlewares: [],
    },
]

export default buildRouter(routes)
