// routes/attendance.ts
import * as attendanceController from '../controllers/attendance'
import { AppRoute, buildRouter } from '../../../core/routes'

const routes: AppRoute[] = [
  { method: 'post', path: '/v1/attendances/export', handler: attendanceController.exportToExcel, middlewares: [] },
  { method: 'get', path: '/v1/attendances/:id', handler: attendanceController.find, middlewares: [] },
  { method: 'post', path: '/v1/attendances', handler: attendanceController.create, middlewares: [] },
  { method: 'post', path: '/v1/attendances/overtime', handler: attendanceController.createOvertime, middlewares: [] },
  { method: 'delete', path: '/v1/attendances/:id', handler: attendanceController.remove, middlewares: [] }
]

export default buildRouter(routes)