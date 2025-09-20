import { prisma } from '../../../database/prisma'
import { InscriptionState } from '../../../types/inscription-state'

export async function getInscriptionsState() {
    return prisma.estadoInscripcion.findMany()
}

export async function getInscriptionStateById(id: number) {
    return prisma.estadoInscripcion.findUnique({
        where: { id },
    })
}

export async function createInscriptionState(data: InscriptionState) {
    return prisma.estadoInscripcion.create({ data })
}

export async function updateInscriptionState(id: number, data: Partial<InscriptionState>) {
    return prisma.estadoInscripcion.update({
        where: { id },
        data,
    })
}

export async function deleteInscriptionState(id: number) {
    return prisma.estadoInscripcion.delete({
        where: { id },
    })
}
