import { Request, Response } from 'express'
import { getAttendancesForExport, getAttendanceById, createAttendanceWithWindow, createAttendanceOvertime, deleteAttendance } from '../services/attendance'

function httpStatusOf(err: unknown, fallback = 400): number {
  if (typeof err === 'object' && err !== null && 'status' in err) {
    const st = (err as { status?: unknown }).status
    if (typeof st === 'number') return st
  }
  return fallback
}

function messageOf(err: unknown): string {
  if (err instanceof Error) return err.message
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}

function validateEventAndUserIds(req: Request): { id_evento: number, id_usuario: number } | null {
  const rawIdEvento = req.body?.id_evento
  const rawIdUsuario = req.body?.id_usuario

  if (!rawIdEvento || isNaN(Number(rawIdEvento))) {
    return null
  }

  if (!rawIdUsuario || isNaN(Number(rawIdUsuario))) {
    return null
  }

  return { id_evento: Number(rawIdEvento), id_usuario: Number(rawIdUsuario) }
}

export async function find(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const attendance = await getAttendanceById(id)
    if (!attendance) return res.status(404).json({ error: 'Asistencia no encontrada' })
    return res.status(200).json(attendance)
  } catch (err: unknown) {
    const msg = messageOf(err)
    if (msg.includes('convertible a bigint')) {
      return res.status(400).json({ error: 'ID inválido' })
    }
    return res.status(500).json({ error: 'Error al obtener asistencia', details: msg })
  }
}

export async function exportToExcel(req: Request, res: Response) {
  try {
    const eventos = req.body?.eventos

    if (!Array.isArray(eventos) || eventos.length === 0) {
      return res.status(400).json({ 
        error: 'Debe proporcionar al menos un evento',
        success: false 
      })
    }
    
    const eventosIds = eventos.map(id => Number(id)).filter(id => !isNaN(id))
    
    if (eventosIds.length === 0) {
      return res.status(400).json({ 
        error: 'Los IDs de eventos deben ser números válidos',
        success: false 
      })
    }

    const result = await getAttendancesForExport(eventosIds)

    return res.status(200).json({
      success: true,
      data: result.usuarios,
      eventos: result.eventos,
      message: `Se encontraron ${result.usuarios.length} usuarios`
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return res.status(500).json({
      success: false,
      error: 'Error al obtener datos para exportar',
      details: message,
    })
  }
}

export async function create(req: Request, res: Response) {
  const eventData = validateEventAndUserIds(req)

  if (!eventData) {
    return res.status(400).json({ error: 'id_evento y id_usuario son obligatorios y deben ser números válidos' })
  }

  const { id_evento, id_usuario } = eventData

  try {
    const attendance = await createAttendanceWithWindow({
      id_evento,
      id_usuario,
    })
    return res.status(201).json(attendance)
  } catch (err: unknown) {
    const status = httpStatusOf(err, 400)
    return res.status(status).json({
      error: 'Error al crear asistencia',
      details: messageOf(err),
    })
  }
}

export async function createOvertime(req: Request, res: Response) {
  const eventData = validateEventAndUserIds(req)

  if (!eventData) {
    return res.status(400).json({ error: 'id_evento y id_usuario son obligatorios y deben ser números válidos' })
  }

  const { id_evento, id_usuario } = eventData

  try {
    const attendance = await createAttendanceOvertime({
      id_evento,
      id_usuario,
    })
    return res.status(201).json(attendance)
  } catch (err: unknown) {
    const status = httpStatusOf(err, 400)
    return res.status(status).json({
      error: 'Error al crear asistencia (extemporánea)',
      details: messageOf(err),
    })
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await deleteAttendance(id)
    return res.status(200).json({ message: 'Asistencia eliminada correctamente' })
  } catch (err: unknown) {
    const msg = messageOf(err)
    if (msg.includes('convertible a bigint')) {
      return res.status(400).json({ error: 'ID inválido' })
    }
    return res.status(500).json({ error: 'Error al eliminar asistencia', details: msg })
  }
}