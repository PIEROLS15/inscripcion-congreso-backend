import { prisma } from '../../src/database/prisma'
import { getInscriptions, getInscriptionById, createInscription, deleteInscription } from '../../src/api/inscription/services/inscription'
import { mockInscription } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        $transaction: jest.fn(),
        inscripcion: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        usuario: {
            create: jest.fn(),
            findFirst: jest.fn(),
        },
    },
}))

describe('Endpoints Inscriptions', () => {
    it('should create an inscription correctly', async () => {
        const mockTransaction = jest.fn().mockResolvedValue(mockInscription);
        (prisma.$transaction as jest.Mock).mockImplementation(mockTransaction)

        const inscription = await createInscription(mockInscription)

        expect(inscription).toEqual(mockInscription)
        expect(prisma.$transaction).toHaveBeenCalled()
    })

    it('should return all inscriptions', async () => {
        (prisma.inscripcion.findMany as jest.Mock).mockResolvedValue([mockInscription])

        const inscriptions = await getInscriptions()

        expect(inscriptions).toEqual([mockInscription])
        expect(prisma.inscripcion.findMany).toHaveBeenCalledWith({
            include: {
                usuario: true,
                tipoInscripcion: true,
                clasificacion: true,
                estado: true,
            },
        })
    })

    it('should return an inscription by id', async () => {
        (prisma.inscripcion.findUnique as jest.Mock).mockResolvedValue(mockInscription)

        const inscription = await getInscriptionById(1)

        expect(inscription).toEqual(mockInscription)
        expect(prisma.inscripcion.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                usuario: true,
                tipoInscripcion: true,
                clasificacion: true,
                estado: true,
            },
        })
    })

    it('should delete an inscription by id', async () => {
        (prisma.inscripcion.delete as jest.Mock).mockResolvedValue(mockInscription)

        const inscription = await deleteInscription(1)

        expect(inscription).toEqual(mockInscription)
        expect(prisma.inscripcion.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })
})
