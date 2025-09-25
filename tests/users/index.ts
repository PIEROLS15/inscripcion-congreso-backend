import { prisma } from '../../src/database/prisma'
import { createUser, getUsers, getUserById, getUserByEmail, updateUser, deleteUser } from '../../src/api/users/services/users'
import { mockUser } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        usuario: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}))

describe('User Services (mocked)', () => {
    it('should create a user correctly', async () => {
        (prisma.usuario.create as jest.Mock).mockResolvedValue(mockUser)

        const usuario = await createUser({
            numero: mockUser.dni, // Agregar el campo numero
            dni: mockUser.dni,
            nombres: mockUser.nombres,
            apellidos: mockUser.apellidos,
            correoElectronico: mockUser.correoElectronico,
            celular: mockUser.celular,
        })

        expect(usuario).toEqual(mockUser)
        expect(prisma.usuario.create).toHaveBeenCalledWith({
            data: {
                numero: mockUser.dni,
                dni: mockUser.dni,
                nombres: mockUser.nombres,
                apellidos: mockUser.apellidos,
                correoElectronico: mockUser.correoElectronico,
                celular: mockUser.celular,
            },
        })
    })

    it('should return all users', async () => {
        (prisma.usuario.findMany as jest.Mock).mockResolvedValue([mockUser])

        const usuarios = await getUsers()

        expect(usuarios).toEqual([mockUser])
        expect(prisma.usuario.findMany).toHaveBeenCalledWith({
            include: { inscripciones: true },
        })
    })

    it('should return a user by id', async () => {
        (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(mockUser)

        const usuario = await getUserById(1)

        expect(usuario).toEqual(mockUser)
        expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: { inscripciones: true },
        })
    })

    it('should return a user by email', async () => {
        (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(mockUser)

        const usuario = await getUserByEmail(mockUser.correoElectronico)

        expect(usuario).toEqual(mockUser)
        expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
            where: { correoElectronico: mockUser.correoElectronico },
            include: { inscripciones: true },
        })
    })

    it('should update a user correctly', async () => {
        const updatedUser = { ...mockUser, nombres: 'Nombre Actualizado' }
            ; (prisma.usuario.update as jest.Mock).mockResolvedValue(updatedUser)

        const usuario = await updateUser(mockUser.id, { nombres: 'Nombre Actualizado' })

        expect(usuario).toEqual(updatedUser)
        expect(prisma.usuario.update).toHaveBeenCalledWith({
            where: { id: mockUser.id },
            data: { nombres: 'Nombre Actualizado' },
        })
    })

    it('should delete a user correctly', async () => {
        (prisma.usuario.delete as jest.Mock).mockResolvedValue(mockUser)

        const usuario = await deleteUser(mockUser.id)

        expect(usuario).toEqual(mockUser)
        expect(prisma.usuario.delete).toHaveBeenCalledWith({
            where: { id: mockUser.id },
        })
    })
})
