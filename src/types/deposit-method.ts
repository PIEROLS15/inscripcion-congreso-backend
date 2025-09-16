import { PaymentType } from './payment-type'

export interface DepositMethod {
    nombre: string
    opciones?: PaymentType[]
}
