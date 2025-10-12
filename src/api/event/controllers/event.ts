import { Request, Response } from 'express'
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../services/event'

export async function list(req: Request, res: Response) {
  try {
    const events = await getEvents()
    return res.status(200).json(events)
  } catch (error) {
    return res.status(500).json({
      error: 'Error al obtener eventos',
      details: (error as Error).message,
    })
  }
}

export async function find(req: Request, res: Response) {
  try {
    const id = req.params.id  // <--- string
    const event = await getEventById(id)
    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' })
    }
    return res.status(200).json(event)
  } catch (error) {
    return res.status(500).json({
      error: 'Error al obtener el evento',
      details: (error as Error).message,
    })
  }
}

export async function create(req: Request, res: Response) {
  try {
    const data = req.body
    const event = await createEvent(data)
    return res.status(201).json(event)
  } catch (error) {
    return res.status(400).json({
      error: 'Error al crear evento',
      details: (error as Error).message,
    })
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = req.params.id  // <--- string
    const data = req.body
    const event = await updateEvent(id, data)
    return res.status(200).json(event)
  } catch (error) {
    return res.status(400).json({
      error: 'Error al actualizar evento',
      details: (error as Error).message,
    })
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    await deleteEvent(id)
    return res.status(200).json({ message: 'Evento eliminado correctamente' })
  } catch (error) {
    return res.status(500).json({
      error: 'Error al eliminar evento',
      details: (error as Error).message,
    })
  }
}