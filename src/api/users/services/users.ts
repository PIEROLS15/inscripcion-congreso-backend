import { prisma } from '../../../database/prisma'
import { Users } from '../../../types/users'

export async function getUsers() {
    return prisma.usuario.findMany(
        {
            include: {
                inscripciones: true
            }
        }
    )
}

export async function createUser(data: Users) {
    return prisma.usuario.create({ data })
}

export async function getUserById(id: number) {
    return prisma.usuario.findUnique({
        where: { id },
        include: { inscripciones: true },
    })
}
