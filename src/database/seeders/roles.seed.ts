import { prisma } from '../prisma'

export async function seedRoles() {
    //Limpiar tabla
    await prisma.roles.deleteMany()

    //Reiniciar los índices de autoincremento
    await prisma.$executeRawUnsafe('ALTER TABLE Roles AUTO_INCREMENT = 1')

    await prisma.roles.createMany({
        data: [
            {
                id: 1,
                nombre: 'SuperAdmin'
            },
            {
                id: 2,
                nombre: 'Admin'
            }
        ]
    })

    console.log('✅ Tabla Roles reseteada y seed insertado')
}
