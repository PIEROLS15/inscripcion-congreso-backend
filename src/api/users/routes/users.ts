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
        path: '/v1/user/:id',
        handler: usersController.find,
        middlewares: [],
    },
]

export default buildRouter(routes)
