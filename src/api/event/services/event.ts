import { prisma } from '../../../database/prisma'
import { Evento as PrismaEvento, Asistencia as PrismaAsistencia } from '@prisma/client'

type EventoConAsistencias = PrismaEvento & {
  asistencias?: PrismaAsistencia[]
}

function formatHour(date: Date) {
  const d = new Date(date)
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function mapEvento(ev: EventoConAsistencias) {
  return {
    ...ev,
    id: ev.id.toString(),
    fecha: ev.fecha.toISOString().split('T')[0],
    hora_comienzo: formatHour(ev.hora_comienzo),
    hora_termino: formatHour(ev.hora_termino),
    asistencias: ev.asistencias?.map(a => ({
      ...a,
      id: a.id.toString(),
      id_evento: a.id_evento.toString(),
      dia_hora: a.dia_hora.toISOString().split('T')[0],
      id_usuario: a.id_usuario
    })),
  }
}

export async function getEvents() {
  const eventos = await prisma.evento.findMany({
    include: { asistencias: true },
  })
  return eventos.map(mapEvento)
}

export async function getEventById(id: string) {
  const evento = await prisma.evento.findUnique({
    where: { id: Number(id) },
    include: { asistencias: true },
  })
  if (!evento) return null
  return mapEvento(evento)
}

export async function createEvent(data: Omit<PrismaEvento, 'id'>) {
  const fechaCompleta = new Date(data.fecha)
  const horaComienzo = new Date(`${data.fecha}T${data.hora_comienzo}`)
  const horaTermino = new Date(`${data.fecha}T${data.hora_termino}`)

  const evento = await prisma.evento.create({
    data: {
      nombre: data.nombre,
      fecha: fechaCompleta,
      hora_comienzo: horaComienzo,
      hora_termino: horaTermino,
    },
    include: { asistencias: true },
  })

  return mapEvento(evento)
}

export async function updateEvent(
  id: string,
  data: Partial<Omit<PrismaEvento, 'id'>>
) {
  const numericId = Number(id)
  if (isNaN(numericId)) throw new Error('ID no válido')

  // Convertir fechas a Date
  const fecha = data.fecha ? new Date(data.fecha) : undefined
  const hora_comienzo = data.hora_comienzo && data.fecha 
    ? new Date(`${data.fecha}T${data.hora_comienzo}`) 
    : undefined
  const hora_termino = data.hora_termino && data.fecha
    ? new Date(`${data.fecha}T${data.hora_termino}`)
    : undefined

  // Crear un objeto solo con los campos a actualizar
  const updateData: Partial<PrismaEvento> = {
    nombre: data.nombre,
    fecha,
    hora_comienzo,
    hora_termino
  }

  // Eliminar undefined para que Prisma no intente actualizar campos vacíos
  Object.keys(updateData).forEach(
    key => updateData[key as keyof PrismaEvento] === undefined && delete updateData[key as keyof PrismaEvento]
  )

  const evento = await prisma.evento.update({
    where: { id: numericId },
    data: updateData,
    include: { asistencias: true }
  })

  return mapEvento(evento)
}

export async function deleteEvent(id: string) {
  const numericId = Number(id)
  const evento = await prisma.evento.delete({
    where: { id: numericId },
    include: { asistencias: true },
  })
  return mapEvento(evento)
}
