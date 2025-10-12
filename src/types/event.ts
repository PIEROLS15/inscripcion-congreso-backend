import { Asistencia } from './attendance' // Importamos Asistencia

export interface Evento {
    id: number
    nombre: string
    fecha: Date
    hora_comienzo: Date
    hora_termino: Date
}

export interface EventoWithAsistencias extends Evento {
    asistencias?: Asistencia[]  // Relación opcional con asistencias
}