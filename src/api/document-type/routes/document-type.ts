import * as typeDocumentCtrl from '../controllers/document-type.ctrl'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
    {
        method: 'get',
        path: '/v1/document-type',
        handler: typeDocumentCtrl.listCtrl,
        middlewares: [],
    },
    {
        method: 'post',
        path: '/v1/document-type',
        handler: typeDocumentCtrl.createCtrl,
        middlewares: [],
    },
    {
        method: 'get',
        path: '/v1/document-type/:id',
        handler: typeDocumentCtrl.findCtrl,
        middlewares: [],
    },
    {
        method: 'put',
        path: '/v1/document-type/:id',
        handler: typeDocumentCtrl.updateCtrl,
        middlewares: [],
    },
    {
        method: 'delete',
        path: '/v1/document-type/:id',
        handler: typeDocumentCtrl.removeCtrl,
        middlewares: [],
    },
]

export default buildRouter(routes)
