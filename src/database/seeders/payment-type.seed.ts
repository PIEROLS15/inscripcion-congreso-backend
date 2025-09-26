// import { prisma } from '../prisma'

// export async function seedPaymentType() {
//     //Limpiar tabla
//     await prisma.tipoPago.deleteMany()

//     //Reiniciar los índices de autoincremento
//     await prisma.$executeRawUnsafe('ALTER TABLE TipoPago AUTO_INCREMENT = 1')

//     //Insertar valores por defecto
//     await prisma.tipoPago.createMany({
//         data: [
//             { id: 1, metodoDepositoId: 1, nombre: 'Pago Directo' },
//             { id: 2, metodoDepositoId: 1, nombre: 'Pago Interbancario' },
//             { id: 3, metodoDepositoId: 2, nombre: 'Yape' },
//             { id: 4, metodoDepositoId: 2, nombre: 'Plin' },
//         ],
//     })

//     console.log('✅ Tabla TipoPago reseteada y seed insertado')
// }
