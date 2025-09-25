import { prisma } from '../../../database/prisma'
import { Voucher } from '../../../types/voucher'

export async function getVouchers() {
    return prisma.voucher.findMany()
}

export async function getVoucherById(id: number) {
    return prisma.voucher.findUnique({
        where: { id }
    })
}

export async function createVoucher(data: Voucher) {
    return prisma.voucher.create({ data })
}

export async function deleteVoucher(id: number) {
    return prisma.voucher.delete({
        where: { id }
    })
}

export async function checkVoucherCodeExists(codigo: string) {
    const voucher = await prisma.voucher.findUnique({
        where: { codigo }
    })
    return !!voucher // Retorna true si existe, false si no
}
