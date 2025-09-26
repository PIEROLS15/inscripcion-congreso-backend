// import { prisma } from '../../../database/prisma'
import { Voucher } from '../../../types/voucher'

export async function getVouchers() {
    // return prisma.voucher.findMany()
    return { success: false, message: 'no implementado' }

}

export async function getVoucherById(id: number) {
    // return prisma.voucher.findUnique({
    //     where: { id }
    // })
    return { success: false, message: 'no implementado', id }

}

export async function createVoucher(data: Voucher) {
    // return prisma.voucher.create({ data })
    return { success: false, message: 'no implementado', data }

}

export async function deleteVoucher(id: number) {
    // return prisma.voucher.delete({
    //     where: { id }
    // })
    return { success: false, message: 'no implementado', id }

}

export async function checkVoucherCodeExists(codigo: string) {
    // const voucher = await prisma.voucher.findUnique({
    //     where: { codigo }
    // })
    // return !!voucher // Retorna true si existe, false si no
    return { success: false, message: 'no implementado', codigo }

}
