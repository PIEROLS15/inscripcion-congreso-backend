import { prisma } from '../prisma'

export async function seedClassification() {
    //Limpiar tabla
    await prisma.clasificacion.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE Clasificacion AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.clasificacion.createMany({
        data: [
            {   id: 1,
                nombre: 'DOCENTE',
            },
            {
                id: 2,
                nombre: 'POSGRADO',
            },
            {
                id: 3,
                nombre: 'ESTUDIANTE - I CICLO',
            },
            {
                id: 4,
                nombre: 'ESTUDIANTE - II CICLO',
            },
            {
                id: 5,
                nombre: 'ESTUDIANTE - III CICLO',
            },
            {
                id: 6,
                nombre: 'ESTUDIANTE - IV CICLO',
            },
            {
                id: 7,
                nombre: 'ESTUDIANTE - V CICLO',
            },
            {
                id: 8,
                nombre: 'ESTUDIANTE - VI CICLO',
            },
            {
                id: 9,
                nombre: 'ESTUDIANTE - VII CICLO',
            },
            {
                id: 10,
                nombre: 'ESTUDIANTE - VIII CICLO',
            },
            {
                id: 11,
                nombre: 'ESTUDIANTE - IX CICLO',
            },
            {
                id: 12,
                nombre: 'ESTUDIANTE - X CICLO',
            },
        ],
    })

    console.log('✅ Tabla Clasificacion reseteada y seed insertado')
}
