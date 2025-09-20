import { prisma } from '../../../database/prisma'
import { Inscription, CreateInscription } from '../../../types/inscription'
import { createUser } from '../../users/services/users'

export async function getInscriptions() {
    return prisma.inscripcion.findMany({
        include: {
            usuario: true,
            tipoInscripcion: true,
            clasificacion: true,
            metodoDeposito: true,
            tipoPago: true,
            estado: true,
            voucher: true,
        },
    })
}

export async function getInscriptionById(id: number) {
    return prisma.inscripcion.findUnique({
        where: { id },
        include: {
            usuario: true,
            tipoInscripcion: true,
            clasificacion: true,
            metodoDeposito: true,
            tipoPago: true,
            estado: true,
            voucher: true,
        },
    })
}

export async function createInscription(data: CreateInscription): Promise<Inscription> {

    const user = await createUser(data.usuario)

    return await prisma.inscripcion.create({
        data: {
            usuarioId: user.id,
            tipoInscripcionId: data.tipoInscripcionId,
            clasificacionId: data.clasificacionId,
            metodoDepositoId: data.metodoDepositoId,
            tipoPagoId: data.tipoPagoId,
            estadoId: data.estadoId,
            voucherId: data.voucherId,
        },
    })
}

export async function deleteInscription(id: number) {
    return prisma.inscripcion.delete({
        where: { id }
    })
}
