import { prisma } from '../prisma'

export async function seedTypePlanInscripcion() {
    //Limpiar tabla
    await prisma.tipoPlanInscripcion.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE TipoPlanInscripcion AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.tipoPlanInscripcion.createMany({
        data: [
            {
                id: 1,
                nombre: 'ESTUDIANTES',
                // precioCorreoInstitucional: 120  
            },
            {
                id: 2,
                nombre: 'PROFESIONALES Y PUBLICO EN GENERAL',
                // precioCorreoInstitucional
            },
        ],
    })

    console.log('✅ Tabla TipoPlanInscripcion reseteada y seed insertado')
}
