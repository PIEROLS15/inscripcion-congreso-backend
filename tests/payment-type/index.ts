import { prisma } from '../../src/database/prisma'
import { getPaymentTypes, getPaymentTypeById, createPaymentType, updatePaymentType, deletePaymentType } from '../../src/api/payment-type/services/payment-type'
import { mockPaymentType } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        tipoPago: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}))

describe('Endpoints Payment Types', () => {
    it('should create a payment type correctly', async () => {
        (prisma.tipoPago.create as jest.Mock).mockResolvedValue(mockPaymentType)
        const paymentType = await createPaymentType({
            metodoDepositoId: mockPaymentType.metodoDepositoId,
            nombre: mockPaymentType.nombre,
        })
        expect(paymentType).toEqual(mockPaymentType)
        expect(prisma.tipoPago.create).toHaveBeenCalledWith({
            data: {
                metodoDepositoId: mockPaymentType.metodoDepositoId,
                nombre: mockPaymentType.nombre,
            },
        })
    })

    it('should return all payment types', async () => {
        (prisma.tipoPago.findMany as jest.Mock).mockResolvedValue([mockPaymentType])
        const paymentTypes = await getPaymentTypes()
        expect(paymentTypes).toEqual([mockPaymentType])
        expect(prisma.tipoPago.findMany).toHaveBeenCalled()
    }
    )

    it('should return a payment type by id', async () => {
        (prisma.tipoPago.findUnique as jest.Mock).mockResolvedValue(mockPaymentType)
        const paymentType = await getPaymentTypeById(1)
        expect(paymentType).toEqual(mockPaymentType)
        expect(prisma.tipoPago.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })

    it('should update a payment type by id', async () => {
        (prisma.tipoPago.update as jest.Mock).mockResolvedValue(mockPaymentType)
        const paymentType = await updatePaymentType(1, { metodoDepositoId: 2, nombre: 'Pago en línea' })
        expect(paymentType).toEqual(mockPaymentType)
        expect(prisma.tipoPago.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { metodoDepositoId: 2, nombre: 'Pago en línea' },
        })
    })

    it('should delete a payment type by id', async () => {
        (prisma.tipoPago.delete as jest.Mock).mockResolvedValue(mockPaymentType)
        const paymentType = await deletePaymentType(1)
        expect(paymentType).toEqual(mockPaymentType)
        expect(prisma.tipoPago.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })
})
