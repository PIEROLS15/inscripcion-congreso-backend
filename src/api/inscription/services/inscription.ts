import { prisma } from '../../../database/prisma'
import { Inscription, CreateInscription } from '../../../types/inscription'

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
    // Transacción para crear usuario, voucher e inscripción de forma atómica
    return await prisma.$transaction(async (tx) => {
        // 1. Verificar si el usuario ya existe por email o DNI
        const existingUser = await tx.usuario.findFirst({
            where: {
                OR: [
                    { correoElectronico: data.usuario.correoElectronico },
                    { dni: data.usuario.dni }
                ]
            }
        })

        // 2. Si ya existe, verificar si ya tiene una inscripción
        if (existingUser) {
            const existingInscription = await tx.inscripcion.findFirst({
                where: { usuarioId: existingUser.id }
            })

            if (existingInscription) {
                throw new Error(`Ya existe una inscripción registrada con el DNI "${data.usuario.dni}" o el email "${data.usuario.correoElectronico}". No se permite registrar el mismo usuario múltiples veces.`)
            }
        }

        // 3. Crear el usuario si no existe, o usar el existente
        let user = existingUser
        if (!user) {
            user = await tx.usuario.create({
                data: {
                    numero: data.usuario.dni, // El campo numero debe ser igual al DNI
                    dni: data.usuario.dni,
                    nombres: data.usuario.nombres,
                    apellidos: data.usuario.apellidos,
                    correoElectronico: data.usuario.correoElectronico,
                    celular: data.usuario.celular,
                }
            })
        }

        // 4. Verificar si el código del voucher ya existe
        const existingVoucher = await tx.voucher.findUnique({
            where: { codigo: data.voucher.codigo }
        })

        if (existingVoucher) {
            throw new Error(`El código de voucher "${data.voucher.codigo}" ya está registrado. Por favor, verifique su código o use uno diferente.`)
        }

        // 5. Crear el voucher
        const voucher = await tx.voucher.create({
            data: {
                codigo: data.voucher.codigo,
                fechaPago: data.voucher.fechaPago,
                filename: data.voucher.archivo || null,
                path: data.voucher.archivo || null,
            }
        })

        // 6. Crear la inscripción
        const inscription = await tx.inscripcion.create({
            data: {
                usuarioId: user.id,
                voucherId: voucher.id,
                tipoInscripcionId: data.tipoInscripcionId || null,
                clasificacionId: data.clasificacionId || null,
                metodoDepositoId: data.metodoDepositoId,
                tipoPagoId: data.tipoPagoId,
                estadoId: data.estadoId || 1, // Estado por defecto 'Pendiente'
            },
            include: {
                usuario: true,
                voucher: true,
                tipoInscripcion: true,
                clasificacion: true,
                metodoDeposito: true,
                tipoPago: true,
                estado: true,
            }
        })

        return inscription
    })
}

export async function deleteInscription(id: number) {
    return prisma.inscripcion.delete({
        where: { id }
    })
}
