import { prisma } from '../prisma'

export async function seedClassification() {
    //Limpiar tabla
    await prisma.clasificacion.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE Clasificacion AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.clasificacion.createMany({
        data: [
            {
                nombre: 'DOCENTE',
            },
            {
                nombre: 'POSGRADO',
            },
            {
                nombre: 'ESTUDIANTE - I CICLO',
            },
            {
                nombre: 'ESTUDIANTE - II CICLO',
            },
            {
                nombre: 'ESTUDIANTE - III CICLO',
            },
            {
                nombre: 'ESTUDIANTE - IV CICLO',
            },
            {
                nombre: 'ESTUDIANTE - V CICLO',
            },
            {
                nombre: 'ESTUDIANTE - VI CICLO',
            },
            {
                nombre: 'ESTUDIANTE - VII CICLO',
            },
            {
                nombre: 'ESTUDIANTE - VIII CICLO',
            },
            {
                nombre: 'ESTUDIANTE - IX CICLO',
            },
            {
                nombre: 'ESTUDIANTE - X CICLO',
            },
        ],
    })

    console.log('✅ Tabla Clasificacion reseteada y seed insertado')
}
