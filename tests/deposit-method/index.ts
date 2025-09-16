import { prisma } from '../../src/database/prisma'
import { getDepositMethods, getDepositMethodById, createDepositMethod, updateDepositMethod, deleteDepositMethod } from '../../src/api/deposit-method/services/deposit-method'
import { mockDepositMethod } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        metodoDeposito: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}))

describe('Endpoints Deposit Methods', () => {
    it('should create a deposit method correctly', async () => {
        (prisma.metodoDeposito.create as jest.Mock).mockResolvedValue(mockDepositMethod)
        const depositMethod = await createDepositMethod({
            nombre: mockDepositMethod.nombre,
        })
        expect(depositMethod).toEqual(mockDepositMethod)
        expect(prisma.metodoDeposito.create).toHaveBeenCalledWith({
            data: {
                nombre: mockDepositMethod.nombre,
            },
        })
    })

    it('should return all deposit methods', async () => {
        (prisma.metodoDeposito.findMany as jest.Mock).mockResolvedValue([mockDepositMethod])
        const depositMethods = await getDepositMethods()
        expect(depositMethods).toEqual([mockDepositMethod])
        expect(prisma.metodoDeposito.findMany).toHaveBeenCalled()
    })

    it('should return a deposit method by id', async () => {
        (prisma.metodoDeposito.findUnique as jest.Mock).mockResolvedValue(mockDepositMethod)
        const depositMethod = await getDepositMethodById(1)
        expect(depositMethod).toEqual(mockDepositMethod)
        expect(prisma.metodoDeposito.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: { opciones: true },
        })
    })

    it('should update a deposit method by id', async () => {
        (prisma.metodoDeposito.update as jest.Mock).mockResolvedValue(mockDepositMethod)
        const depositMethod = await updateDepositMethod(1, { nombre: 'Banco de Crédito' })
        expect(depositMethod).toEqual(mockDepositMethod)
        expect(prisma.metodoDeposito.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { nombre: 'Banco de Crédito' },
        })
    })

    it('should delete a deposit method by id', async () => {
        (prisma.metodoDeposito.delete as jest.Mock).mockResolvedValue(mockDepositMethod)
        const depositMethod = await deleteDepositMethod(1)
        expect(depositMethod).toEqual(mockDepositMethod)
        expect(prisma.metodoDeposito.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })
})
