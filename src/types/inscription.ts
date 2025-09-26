import { Users } from './users'
import { Decimal } from '@prisma/client/runtime/library'

export interface CreateInscription {
    usuario: Users
    tipoInscripcionId?: number
    clasificacionId?: number
    modalidadDeposito?: string // "banco" o "billetera"
    bancoSeleccionado?: string // "bcp" o "interbank"
    tipoOperacion?: string // "directo" o "interbancario"
    billeteraDigital?: string // "yape" o "plin"
    file?: string // Nombre del archivo del voucher
    numeroOperacion: string // Código del voucher/operación
    fechaPago: Date
    pago: number // Monto pagado
    esEmailInstitucional?: boolean
    hasDiscount?: boolean
    descuento?: number
    estadoId?: number
}

export interface Inscription {
    id: number
    usuarioId: number
    tipoInscripcionId?: number | null
    clasificacionId?: number | null
    modalidadDeposito?: string | null
    bancoSeleccionado?: string | null
    tipoOperacion?: string | null
    billeteraDigital?: string | null
    file?: string | null
    numeroOperacion: string
    fechaPago: Date
    pago: Decimal
    esEmailInstitucional: boolean
    hasDiscount: boolean
    descuento: Decimal
    estadoId: number
    creadoEn: Date
    actualizadoEn: Date
}
