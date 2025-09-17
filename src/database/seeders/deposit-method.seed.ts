import { prisma } from '../prisma'

export async function seedDepositMehod() {
    //Limpiar tabla
    await prisma.metodoDeposito.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE MetodoDeposito AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.metodoDeposito.createMany({
        data: [
            { nombre: 'Banco de la Nación' },
            { nombre: 'Billetera Digital' },
        ],
    })

    console.log('✅ Tabla MetodoDeposito reseteada y seed insertado')
}
