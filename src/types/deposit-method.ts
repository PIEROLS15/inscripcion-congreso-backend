// import { PaymentType } from './payment-type'

export interface DepositMethod {
    nombre: string
    opciones?: PaymentType[]
}


export interface PaymentType {
    metodoDepositoId: number
    subcategoria: string
    nombre: string
}
