import { prisma } from '../../../database/prisma'
import { RegistrationType } from '../../../types/registration-type'

export async function getRegistrationTypes() {
    return prisma.tipoInscripcion.findMany()
}

export async function getRegistrationTypeById(id: number) {
    return prisma.tipoInscripcion.findUnique({
        where: { id },
    })
}

export async function createRegistrationType(data: RegistrationType) {
    return prisma.tipoInscripcion.create({ data })
}

export async function updateRegistrationType(id: number, data: RegistrationType) {
    return prisma.tipoInscripcion.update({
        where: { id },
        data,
    })
}

export async function deleteRegistrationType(id: number) {
    return prisma.tipoInscripcion.delete({
        where: { id },
    })
}
