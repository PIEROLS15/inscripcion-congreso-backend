import { prisma } from '../../../database/prisma'
import { DepositMethod } from '../../../types/deposit-method'

export async function getDepositMethods() {
    return prisma.metodoDeposito.findMany({
        include: { opciones: true }
    })
}

export async function getDepositMethodById(id: number) {
    return prisma.metodoDeposito.findUnique({
        where: { id },
        include: { opciones: true },
    })
}

export async function createDepositMethod(data: DepositMethod) {
    return prisma.metodoDeposito.create({
        data: {
            nombre: data.nombre,
        }
    })
}

export async function updateDepositMethod(id: number, data: DepositMethod) {
    return prisma.metodoDeposito.update({
        where: { id },
        data: {
            nombre: data.nombre,
        },
    })
}


export async function deleteDepositMethod(id: number) {
    return prisma.metodoDeposito.delete({
        where: { id },
    })
}
