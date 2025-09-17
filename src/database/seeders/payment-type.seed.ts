import { prisma } from '../prisma'

export async function seedPaymentType() {
    //Limpiar tabla
    await prisma.tipoPago.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE TipoPago AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.tipoPago.createMany({
        data: [
            { metodoDepositoId: 1, nombre: 'Pago Directo' },
            { metodoDepositoId: 1, nombre: 'Pago Interbancario' },
            { metodoDepositoId: 2, nombre: 'Yape' },
            { metodoDepositoId: 2, nombre: 'Plin' },
        ],
    })

    console.log('✅ Tabla TipoPago reseteada y seed insertado')
}
