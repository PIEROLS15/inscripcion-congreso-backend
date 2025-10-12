import { Evento } from './event'
import { Users } from './users' // Tu tipo Users

export interface Asistencia {
    id?: number
    dia_hora?: Date
    id_usuario: number
    id_evento: number
}

export interface AsistenciaWithRelations extends Asistencia {
    Evento?: Evento
    Usuario?: Users
}