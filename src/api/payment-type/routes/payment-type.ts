import * as paymentTypesController from '../controllers/payment-type'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/payment-type',
        handler: paymentTypesController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/payment-type',
        handler: paymentTypesController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/payment-type/:id',
        handler: paymentTypesController.find,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/payment-type/:id',
        handler: paymentTypesController.update,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/payment-type/:id',
        handler: paymentTypesController.remove,
        middlewares: [],
    },
]

export default buildRouter(routes)
