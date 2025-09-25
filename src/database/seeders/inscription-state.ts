import { prisma } from '../prisma'

export async function seedInscriptionState() {
    //Limpiar tabla
    await prisma.estadoInscripcion.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE EstadoInscripcion AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.estadoInscripcion.createMany({
        data: [
            { id: 1, nombre: 'Pendiente' },        // Inscripción creada, esperando revisión
            { id: 2, nombre: 'Aprobado' },         // Voucher verificado y aprobado
            { id: 3, nombre: 'Rechazado' },        // Voucher rechazado (problema con el pago)
            { id: 4, nombre: 'En Revisión' },      // Voucher siendo verificado por el equipo
            { id: 5, nombre: 'Cancelado' },        // Inscripción cancelada por el usuario
        ],
    })

    console.log('✅ Tabla EstadoInscripcion reseteada y seed insertado')
}
