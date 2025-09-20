import { prisma } from '../../src/database/prisma'
import { getInscriptions, getInscriptionById, createInscription, deleteInscription } from '../../src/api/inscription/services/inscription'
import { mockInscription, mockUser } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        inscripcion: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        usuario: {
            create: jest.fn(),
        },
    },
}))

describe('Endpoints Inscriptions', () => {
    it('should create an inscription correctly', async () => {
        (prisma.usuario.create as jest.Mock).mockResolvedValue(mockUser),
            (prisma.inscripcion.create as jest.Mock).mockResolvedValue(mockInscription)

        const inscription = await createInscription(mockInscription)

        expect(inscription).toEqual(mockInscription)
        expect(prisma.inscripcion.create).toHaveBeenCalledWith({
            data: {
                usuarioId: mockInscription.usuario.id,
                tipoInscripcionId: mockInscription.tipoInscripcionId,
                clasificacionId: mockInscription.clasificacionId,
                metodoDepositoId: mockInscription.metodoDepositoId,
                tipoPagoId: mockInscription.tipoPagoId,
                estadoId: mockInscription.estadoId,
                voucherId: mockInscription.voucherId,
            },
        })
    })

    it('should return all inscriptions', async () => {
        (prisma.inscripcion.findMany as jest.Mock).mockResolvedValue([mockInscription])

        const inscriptions = await getInscriptions()

        expect(inscriptions).toEqual([mockInscription])
        expect(prisma.inscripcion.findMany).toHaveBeenCalled()
    })

    it('should return an inscription by id', async () => {
        (prisma.inscripcion.findUnique as jest.Mock).mockResolvedValue(mockInscription)

        const inscription = await getInscriptionById(1)

        expect(inscription).toEqual(mockInscription)
        expect(prisma.inscripcion.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                clasificacion: true,
                estado: true,
                metodoDeposito: true,
                tipoInscripcion: true,
                tipoPago: true,
                usuario: true,
                voucher: true,
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
