import { prisma } from '../../../database/prisma'
import { Inscription, CreateInscription } from '../../../types/inscription'

export async function getInscriptions() {
    return prisma.inscripcion.findMany({
        include: {
            usuario: true,
            tipoInscripcion: true,
            clasificacion: true,
            estado: true,
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
            estado: true,
        },
    })
}

export async function createInscription(data: CreateInscription): Promise<Inscription> {
    // Transacción para crear usuario e inscripción de forma atómica
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


        // 4. Verificar si el código de operación ya existe
        const existingOperation = await tx.inscripcion.findFirst({
            where: { numeroOperacion: data.numeroOperacion }
        })

        if (existingOperation) {
            throw new Error(`El código de operación "${data.numeroOperacion}" ya está registrado. Por favor, verifique su código o use uno diferente.`)
        }

        // Si el email es institucional, marcar el campo correspondiente
        let hasDiscountInstitucionalEmail = isInstitutionalEmail(data.usuario.correoElectronico)

        let planInscripcion = await tx.tipoInscripcion.findUnique({
            where: { id: data.tipoInscripcionId }
        })
        if (!planInscripcion) {
            throw new Error(`El tipo de inscripción con id "${data.tipoInscripcionId}" no existe.`)
        }

        // 5. Crear la inscripción con todos los datos
        const inscription = await tx.inscripcion.create({
            data: {
                usuarioId: user.id,
                tipoInscripcionId: data.tipoInscripcionId || null,
                clasificacionId: data.clasificacionId || null,
                modalidadDeposito: data.modalidadDeposito || null,
                bancoSeleccionado: data.bancoSeleccionado || null,
                tipoOperacion: data.tipoOperacion || null,
                billeteraDigital: data.billeteraDigital || null,
                file: data.file || null,
                numeroOperacion: data.numeroOperacion,
                fechaPago: data.fechaPago,
                pago: hasDiscountInstitucionalEmail ? planInscripcion.institutionalPrice : planInscripcion.precio,
                esEmailInstitucional: hasDiscountInstitucionalEmail,
                hasDiscount: data.hasDiscount || false,
                descuento: data.descuento || 0,
                estadoId: data.estadoId || 1, // Estado por defecto 'Pendiente'
            },
            include: {
                usuario: true,
                tipoInscripcion: true,
                clasificacion: true,
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


const isInstitutionalEmail = (email: string): boolean => {
    const institutionalDomains = ['undc.edu.pe']
    const emailDomain = email.split('@')[1].toLowerCase()
    return institutionalDomains.includes(emailDomain)
}