import { prisma } from '../../../database/prisma'
import { Administradores, AdminWithRole } from '../../../types/admin'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'supersecret'

export function generateToken(admin: AdminWithRole) {
    const expiration = Math.floor(Date.now() / 1000) + (60 * 60)

    return jwt.sign(
        {
            user: {
                id: admin.id,
                nombres: admin.nombres,
                apellidos: admin.apellidos,
                correoElectronico: admin.correoElectronico,
                creadoEn: admin.creadoEn,
                actualizadoEn: admin.actualizadoEn,
                rolId: admin.rolId,
                rolNombre: admin.rol?.nombre
            },
            exp: expiration,
        },
        SECRET
    )
}

export async function getAdmins() {
    return prisma.administradores.findMany()
}

export async function getAdminById(id: number) {
    return prisma.administradores.findUnique({
        where: { id },
    })
}

export async function createAdmin(data: Administradores) {
    const hashedPassword = await bcrypt.hash(data.contrasena, 10)

    return prisma.administradores.create({
        data: {
            ...data,
            contrasena: hashedPassword,
            rolId: 2,
            creadoEn: new Date(),
            actualizadoEn: new Date(),
        },
    })
}

export async function updateAdmin(id: number, data: Partial<Administradores>) {
    return prisma.administradores.update({
        where: { id },
        data,
    })
}

export async function deleteAdmin(id: number) {
    return prisma.administradores.delete({
        where: { id },
    })
}

export async function validatePassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash)
}

export async function loginAdmin(correoElectronico: string, contrasena: string) {
    const admin = await prisma.administradores.findUnique({
        where: { correoElectronico },
        include: { rol: true },
    })

    if (!admin) throw new Error('Admin no encontrado')

    const isValid = await validatePassword(contrasena, admin.contrasena)
    if (!isValid) throw new Error('Credenciales incorrectas')

    const jwt = generateToken(admin)

    return { jwt }
}
