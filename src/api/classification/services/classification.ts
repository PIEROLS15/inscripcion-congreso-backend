import { prisma } from '../../../database/prisma'
import { Classification } from '../../../types/classification'

export async function getClassifications() {
    return prisma.clasificacion.findMany()
}

export async function getClassificationById(id: number) {
    return prisma.clasificacion.findUnique({
        where: { id },
    })
}

export async function createClassification(data: Classification) {
    return prisma.clasificacion.create({ data })
}

export async function updateClassification(id: number, data: Partial<Classification>) {
    return prisma.clasificacion.update({
        where: { id },
        data,
    })
}

export async function deleteClassification(id: number) {
    return prisma.clasificacion.delete({
        where: { id },
    })
}
