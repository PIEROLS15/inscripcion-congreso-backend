import { prisma } from '../prisma'

export async function seedClassification() {
    //Limpiar tabla
    await prisma.clasificacion.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE Clasificacion AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.clasificacion.createMany({
        data: [
            { id: 1, nombre: 'ESTUDIANTE - I CICLO', },
            { id: 2, nombre: 'ESTUDIANTE - II CICLO', },
            { id: 3, nombre: 'ESTUDIANTE - III CICLO', },
            { id: 4, nombre: 'ESTUDIANTE - IV CICLO', },
            { id: 5, nombre: 'ESTUDIANTE - V CICLO', },
            { id: 6, nombre: 'ESTUDIANTE - VI CICLO', },
            { id: 7, nombre: 'ESTUDIANTE - VII CICLO', },
            { id: 8, nombre: 'ESTUDIANTE - VIII CICLO', },
            { id: 9, nombre: 'ESTUDIANTE - IX CICLO', },
            { id: 10, nombre: 'ESTUDIANTE - X CICLO', },
        ],
    })

    console.log('✅ Tabla Clasificacion reseteada y seed insertado')
}
