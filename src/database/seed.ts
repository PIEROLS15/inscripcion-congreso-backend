import { prisma } from './prisma'
import { seedDepositMehod } from './seeders/deposit-method.seed'
import { seedPaymentType } from './seeders//payment-type.seed'

async function main() {

    await seedDepositMehod()
    await seedPaymentType()

    console.log('✅ Seeds completados!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
