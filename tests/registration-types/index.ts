import { prisma } from '../../src/database/prisma'
import { getRegistrationTypes, getRegistrationTypeById, createRegistrationType, updateRegistrationType, deleteRegistrationType } from '../../src/api/registration-type/services/registration-type'
import { mockRegistrationType } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        tipoInscripcion: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}))

describe('Endpoints Registration Types', () => {
    it('should create a registration type correctly', async () => {

        (prisma.tipoInscripcion.create as jest.Mock).mockResolvedValue(mockRegistrationType)

        const registrationType = await createRegistrationType({
            nombre: mockRegistrationType.nombre,
            descripcion: mockRegistrationType.descripcion,
            precio: mockRegistrationType.precio,
            activo: mockRegistrationType.activo,
        })

        expect(registrationType).toEqual(mockRegistrationType)
        expect(prisma.tipoInscripcion.create).toHaveBeenCalledWith({
            data: {
                nombre: mockRegistrationType.nombre,
                descripcion: mockRegistrationType.descripcion,
                precio: mockRegistrationType.precio,
                activo: mockRegistrationType.activo,
            },
        })
    })

    it('should return all registration types', async () => {
        (prisma.tipoInscripcion.findMany as jest.Mock).mockResolvedValue([mockRegistrationType])
        const registrationTypes = await getRegistrationTypes()

        expect(registrationTypes).toEqual([mockRegistrationType])
        expect(prisma.tipoInscripcion.findMany).toHaveBeenCalled()
    })

    it('should return a registration type by id', async () => {
        (prisma.tipoInscripcion.findUnique as jest.Mock).mockResolvedValue(mockRegistrationType)
        const registrationType = await getRegistrationTypeById(1)

        expect(registrationType).toEqual(mockRegistrationType)
        expect(prisma.tipoInscripcion.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })

    it('should update a registration type by id', async () => {
        (prisma.tipoInscripcion.update as jest.Mock).mockResolvedValue(mockRegistrationType)
        const registrationType = await updateRegistrationType(1, { nombre: 'Inscripción Regular' })
        expect(registrationType).toEqual(mockRegistrationType)
        expect(prisma.tipoInscripcion.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { nombre: 'Inscripción Regular' },
        })
    })

    it('should delete a registration type by id', async () => {
        (prisma.tipoInscripcion.delete as jest.Mock).mockResolvedValue(mockRegistrationType)
        const registrationType = await deleteRegistrationType(1)
        expect(registrationType).toEqual(mockRegistrationType)
        expect(prisma.tipoInscripcion.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })
})
