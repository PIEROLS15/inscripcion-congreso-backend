import { prisma } from '../prisma'

export async function seedPaymentType() {
    //Limpiar tabla
    await prisma.tipoDocumento.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE tipoDocumento AUTO_INCREMENT = 1')

    //Insertar valores por defecto
    await prisma.tipoDocumento.createMany({
        data: [
            { id: 'dni', nombre: 'Documento Nacional de Identidad', abreviatura: 'DNI' },
            { id: 'ruc', nombre: 'Registro Único de Contribuyentes', abreviatura: 'RUC' },
            { id: 'ce', nombre: 'Carnet de Extranjería', abreviatura: 'CE' },
        ],
    })

    console.log('✅ Tabla TipoDocumento reseteada y seed insertado')
}
