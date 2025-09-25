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
                id: 1,
                nombre: 'ESTUDIANTES',
                badge: 'CON KIT',
                precio: 120,
                descripcion: 'La experiencia completa para estudiantes con kit de merchandising oficial.',
                activo: true,
                caracteristicas: [
                    { icon: 'heroicons:academic-cap', text: 'Certificado Digital (100h)' },
                    { icon: 'heroicons:gift', text: 'Kit de Merchandising Oficial' },
                    { icon: 'heroicons:identification', text: 'Carnet de Identificación' },
                    { icon: 'heroicons:ticket', text: 'Acceso a todas las ponencias' },
                ],
                value: 'estudiantes_con_kit'
            },
            {
                id: 2,
                nombre: 'ESTUDIANTES',
                badge: 'SIN KIT',
                precio: 60,
                descripcion: 'La opción económica para estudiantes, con acceso a todas las ponencias.',
                activo: true,
                caracteristicas: [
                    { icon: 'heroicons:academic-cap', text: 'Certificado Digital (100h)' },
                    { icon: 'heroicons:identification', text: 'Carnet de Identificación' },
                    { icon: 'heroicons:ticket', text: 'Acceso a todas las ponencias' },
                    { icon: 'heroicons:x-mark', text: 'No incluye Kit' },
                ],
                value: 'estudiantes_sin_kit'
            },
            {
                id: 3,
                nombre: 'PÚBLICO GENERAL',
                precio: 140,
                descripcion: 'Acceso total con kit para profesionales y cualquier persona interesada.',
                activo: true,
                badge: 'INCLUYE KIT',
                caracteristicas: [
                    { icon: 'heroicons:academic-cap', text: 'Certificado Digital (100h)' },
                    { icon: 'heroicons:gift', text: 'Kit de Merchandising Oficial' },
                    { icon: 'heroicons:identification', text: 'Carnet de Identificación' },
                    { icon: 'heroicons:ticket', text: 'Acceso a todas las ponencias' },
                ],
                value: 'publico_general_con_kit'
            }
        ],
    })

    console.log('✅ Tabla TipoInscripcion reseteada y seed insertado')
}
