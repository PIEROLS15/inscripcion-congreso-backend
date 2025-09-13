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
]

export default buildRouter(routes)
