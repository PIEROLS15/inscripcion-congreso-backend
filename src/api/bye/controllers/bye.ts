import { Request, Response } from 'express'
import * as byeService from '../services/bye'

export const sayBye = (req: Request, res: Response) => {
  const { name } = req.query
  const bye = byeService.getBye(name as string)
  res.json({ message: bye })
}
