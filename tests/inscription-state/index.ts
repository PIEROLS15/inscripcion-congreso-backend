import { prisma } from '../../src/database/prisma'
import { getInscriptionsState, getInscriptionStateById, createInscriptionState, updateInscriptionState, deleteInscriptionState } from '../../src/api/inscription-state/services/inscription-state'
import { mockInscriptionState } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        estadoInscripcion: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}))

describe('Endpoints Inscription State', () => {
    it('should create a inscription state correctly', async () => {
        (prisma.estadoInscripcion.create as jest.Mock).mockResolvedValue(mockInscriptionState)

        const classification = await createInscriptionState({
            nombre: mockInscriptionState.nombre,
        })
        expect(classification).toEqual(mockInscriptionState)
        expect(prisma.estadoInscripcion.create).toHaveBeenCalledWith({
            data: {
                nombre: mockInscriptionState.nombre,
            },
        })
    })

    it('should return all inscription state', async () => {
        (prisma.estadoInscripcion.findMany as jest.Mock).mockResolvedValue([mockInscriptionState])
        const classifications = await getInscriptionsState()
        expect(classifications).toEqual([mockInscriptionState])
        expect(prisma.estadoInscripcion.findMany).toHaveBeenCalled()
    })

    it('should return a inscription state by id', async () => {
        (prisma.estadoInscripcion.findUnique as jest.Mock).mockResolvedValue(mockInscriptionState)
        const classification = await getInscriptionStateById(1)
        expect(classification).toEqual(mockInscriptionState)
        expect(prisma.estadoInscripcion.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })

    it('should update a inscription state by id', async () => {
        (prisma.estadoInscripcion.update as jest.Mock).mockResolvedValue(mockInscriptionState)
        const classification = await updateInscriptionState(1, { nombre: 'Pendiente' })
        expect(classification).toEqual(mockInscriptionState)
        expect(prisma.estadoInscripcion.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { nombre: 'Pendiente' },
        })
    })

    it('should delete a inscription state by id', async () => {
        (prisma.estadoInscripcion.delete as jest.Mock).mockResolvedValue(mockInscriptionState)
        const classification = await deleteInscriptionState(1)
        expect(classification).toEqual(mockInscriptionState)
        expect(prisma.estadoInscripcion.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })
})
