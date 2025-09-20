import { prisma } from '../prisma'

export async function seedRegistrationType() {
    //Limpiar tabla
    await prisma.tipoInscripcion.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE TipoInscripcion AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.tipoInscripcion.createMany({
        data: [
            {
                nombre: 'Estudiantes pregrado',
                precio: 35,
                descripcion: 'Solo Certificado',
                activo: true
            },
            {
                nombre: 'Pregrado',
                precio: 80,
                descripcion: 'Certificado + Merchandising',
                activo: true
            },
            {
                nombre: 'Docentes UNDC',
                precio: 35,
                descripcion: 'Solo Certificado',
                activo: true
            },
            {
                nombre: 'Posgrado',
                precio: 120,
                descripcion: 'Certificado + Merchandising',
                activo: true
            },
        ],
    })

    console.log('✅ Tabla TipoInscripcion reseteada y seed insertado')
}
