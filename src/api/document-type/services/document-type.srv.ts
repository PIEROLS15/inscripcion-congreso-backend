import { prisma } from '../../../database/prisma'
import { DocumentType } from '../../../types/document-type'

export async function get() {
    return prisma.tipoDocumento.findMany()
}

export async function getById(id: string) {
    return prisma.tipoDocumento.findUnique({
        where: { id },
    })
}

export async function create(data: DocumentType) {
    return prisma.tipoDocumento.create({ data })
}

export async function update(id: string, data: Partial<DocumentType>) {
    return prisma.tipoDocumento.update({
        where: { id },
        data,
    })
}

export async function remove(id: string) {
    return prisma.tipoDocumento.delete({
        where: { id },
    })
}
