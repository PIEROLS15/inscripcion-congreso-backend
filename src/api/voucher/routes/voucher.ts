import * as voucherController from '../controllers/voucher'
import { AppRoute, buildRouter } from '../../../core/routes'
import { upload } from '../../../middlewares/upload'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/voucher',
        handler: voucherController.list,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/voucher',
        handler: voucherController.create,
        middlewares: [upload.single('file')],
    },
    {
        method: 'get',
        path: '/v1/voucher/:id',
        handler: voucherController.find,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/voucher/:id',
        handler: voucherController.remove,
        middlewares: [],
    }
]

export default buildRouter(routes)
