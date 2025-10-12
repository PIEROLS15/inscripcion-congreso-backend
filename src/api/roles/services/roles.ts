import { prisma } from '../../../database/prisma'
import { Roles } from '../../../types/admin'

export async function getRoles(): Promise<Roles[]> {
    return prisma.roles.findMany()
}

export async function getRoleById(id: number): Promise<Roles | null> {
    return prisma.roles.findUnique({
        where: { id },
    })
}

export async function createRole(data: Roles): Promise<Roles> {
    return prisma.roles.create({
        data,
    })
}

export async function updateRole(id: number, data: Partial<Roles>): Promise<Roles> {
    return prisma.roles.update({
        where: { id },
        data,
    })
}

