import { prisma } from '../prisma'

export async function seedInscriptionState() {
    //Limpiar tabla
    await prisma.estadoInscripcion.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE EstadoInscripcion AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.estadoInscripcion.createMany({
        data: [
            { nombre: 'Pendiente' },
            { nombre: 'Pagado' },
            { nombre: 'Cancelado' },
        ],
    })

    console.log('✅ Tabla EstadoInscripcion reseteada y seed insertado')
}
