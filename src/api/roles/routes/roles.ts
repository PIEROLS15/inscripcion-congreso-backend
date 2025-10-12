import * as rolesController from '../controllers/roles'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/roles',
        handler: rolesController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/roles',
        handler: rolesController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/roles/:id',
        handler: rolesController.find,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/roles/:id',
        handler: rolesController.update,
        middlewares: [],
    }
]

export default buildRouter(routes)
