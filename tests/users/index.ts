import { prisma } from '../../src/database/prisma'
import { createUser, getUsers, getUserById } from '../../src/api/users/services/users'
import { mockUser } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        usuario: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}))

describe('Endpoints Users', () => {
    it('should create a user correctly', async () => {

        (prisma.usuario.create as jest.Mock).mockResolvedValue(mockUser)

        const usuario = await createUser({
            dni: mockUser.dni,
            nombres: mockUser.nombres,
            apellidos: mockUser.apellidos,
            correoElectronico: mockUser.correoElectronico,
            celular: mockUser.celular,
        })

        expect(usuario).toEqual(mockUser)
        expect(prisma.usuario.create).toHaveBeenCalledWith({
            data: {
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
        expect(prisma.usuario.findMany).toHaveBeenCalled()
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
})
