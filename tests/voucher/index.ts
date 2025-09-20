import { prisma } from '../../src/database/prisma'
import { getVouchers, getVoucherById, createVoucher, deleteVoucher } from '../../src/api/voucher/services/voucher'
import { mockVoucher } from '../helpers/mock'


jest.mock('../../src/database/prisma', () => ({
    prisma: {
        voucher: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}))

describe('Voucher Services (mocked)', () => {
    it('should create a voucher correctly', async () => {
        (prisma.voucher.create as jest.Mock).mockResolvedValue(mockVoucher)

        const voucher = await createVoucher({
            codigo: mockVoucher.codigo,
            fechaPago: mockVoucher.fechaPago,
            filename: mockVoucher.filename,
            path: mockVoucher.path,
            mime: mockVoucher.mime,
        })

        expect(voucher).toEqual(mockVoucher)
        expect(prisma.voucher.create).toHaveBeenCalledWith({
            data: {
                codigo: mockVoucher.codigo,
                fechaPago: mockVoucher.fechaPago,
                filename: mockVoucher.filename,
                path: mockVoucher.path,
                mime: mockVoucher.mime,
            },
        })
    })

    it('should return all vouchers', async () => {
        (prisma.voucher.findMany as jest.Mock).mockResolvedValue([mockVoucher])

        const vouchers = await getVouchers()

        expect(vouchers).toEqual([mockVoucher])
        expect(prisma.voucher.findMany).toHaveBeenCalled()
    })

    it('should return a voucher by id', async () => {
        (prisma.voucher.findUnique as jest.Mock).mockResolvedValue(mockVoucher)

        const voucher = await getVoucherById(1)

        expect(voucher).toEqual(mockVoucher)
        expect(prisma.voucher.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })

    it('should delete a voucher correctly', async () => {
        (prisma.voucher.delete as jest.Mock).mockResolvedValue(mockVoucher)

        const voucher = await deleteVoucher(1)

        expect(voucher).toEqual(mockVoucher)
        expect(prisma.voucher.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })
})
