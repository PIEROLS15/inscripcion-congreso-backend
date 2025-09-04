import { Request, Response } from 'express'
import * as helloService from '../services/hello'

export const sayHello = (req: Request, res: Response) => {
  const { name } = req.query
  const greeting = helloService.getGreeting(name as string)
  res.json({ message: greeting })
}
