import { Request, Response } from 'express'
import { fetchReniecData } from '../services/reniec'
import { reniecSchema } from '../utils/validation'

export async function getReniecData(req: Request, res: Response) {
  try {

    const { number } = await reniecSchema.validate(req.query)
    const data = await fetchReniecData(number)
    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json({
      error: 'Error inesperado',
      details: (error as Error).message,
    })
  }
}
