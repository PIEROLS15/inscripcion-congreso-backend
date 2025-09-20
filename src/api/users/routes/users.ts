import * as usersController from '../controllers/users'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/users',
        handler: usersController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/users',
        handler: usersController.create,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/users/:id',
        handler: usersController.find,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/users/email/:email',
        handler: usersController.findByEmail,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/users/:id',
        handler: usersController.update,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/users/:id',
        handler: usersController.remove,
        middlewares: [],
    },
]

export default buildRouter(routes)
