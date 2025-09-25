import { Users } from './users'

export interface CreateInscription {
    usuario: Users
    voucher: {
        codigo: string
        fechaPago: Date
        archivo?: string // Ruta del archivo subido
    }
    tipoInscripcionId?: number
    clasificacionId?: number
    metodoDepositoId: number
    tipoPagoId: number
    estadoId?: number
}

export interface Inscription {
    usuarioId: number
    tipoInscripcionId?: number | null
    clasificacionId?: number | null
    metodoDepositoId: number
    tipoPagoId: number
    estadoId: number
    voucherId: number
    creadoEn: Date
    actualizadoEn: Date
}
