import { prisma } from '../../../database/prisma'
import { PaymentType } from '../../../types/payment-type'

export async function getPaymentTypes() {
    return prisma.tipoPago.findMany()
}

export async function getPaymentTypeById(id: number) {
    return prisma.tipoPago.findUnique({
        where: { id },
    })
}

export async function createPaymentType(data: PaymentType) {
    return prisma.tipoPago.create({
        data: {
            metodoDepositoId: data.metodoDepositoId,
            nombre: data.nombre,
        }
    })
}

export async function updatePaymentType(id: number, data: PaymentType) {
    return prisma.tipoPago.update({
        where: { id },
        data: {
            metodoDepositoId: data.metodoDepositoId,
            nombre: data.nombre,
        },
    })
}

export async function deletePaymentType(id: number) {
    return prisma.tipoPago.delete({
        where: { id },
    })
}
