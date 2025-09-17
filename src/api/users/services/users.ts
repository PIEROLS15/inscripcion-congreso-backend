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

export async function getUserByEmail(email: string) {
    return prisma.usuario.findUnique({
        where: { correoElectronico: email },
        include: { inscripciones: true },
    })
}

export async function updateUser(id: number, data: Partial<Users>) {
    return prisma.usuario.update({
        where: { id },
        data,
    })
}

export async function deleteUser(id: number) {
    return prisma.usuario.delete({
        where: { id },
    })
}
