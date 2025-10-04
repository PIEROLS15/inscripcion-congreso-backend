import * as adminController from '../controllers/admin'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/admin',
        handler: adminController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/admin',
        handler: adminController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/admin/:id',
        handler: adminController.find,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/admin/:id',
        handler: adminController.update,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/admin/:id',
        handler: adminController.remove,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/auth/login',
        handler: adminController.login,
        middlewares: [],
    }
]

export default buildRouter(routes)
