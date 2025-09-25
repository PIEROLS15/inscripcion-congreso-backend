import { prisma } from '../../../database/prisma'
import { RegistrationType } from '../../../types/registration-type'
import { Prisma } from '@prisma/client'

export async function getRegistrationTypes() {
    return prisma.tipoInscripcion.findMany()
}

export async function getRegistrationTypeById(id: number) {
    return prisma.tipoInscripcion.findUnique({
        where: { id },
    })
}

export async function createRegistrationType(data: RegistrationType) {
    return prisma.tipoInscripcion.create({
        data: {
            ...data,
            caracteristicas: data.caracteristicas ? data.caracteristicas as unknown as Prisma.InputJsonValue : Prisma.JsonNull
        }
    })
}

export async function updateRegistrationType(id: number, data: Partial<RegistrationType>) {

    return prisma.tipoInscripcion.update({
        where: { id },
        data: {
            ...data,
            caracteristicas: data.caracteristicas ? data.caracteristicas as unknown as Prisma.InputJsonValue : Prisma.JsonNull
        },
    })
}

export async function deleteRegistrationType(id: number) {
    return prisma.tipoInscripcion.delete({
        where: { id },
    })
}
