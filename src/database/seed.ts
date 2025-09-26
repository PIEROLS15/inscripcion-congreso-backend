import { prisma } from './prisma'
// import { seedDepositMehod } from './seeders/deposit-method.seed'
// import { seedPaymentType } from './seeders/payment-type.seed'
import { seedRegistrationType } from './seeders/registration-type.seed'
import { seedClassification } from './seeders/classification.seed'
import { seedInscriptionState } from './seeders/inscription-state'
import { seedDocumentType } from './seeders/document-type.seed'
import { seedTypePlanInscripcion } from './seeders/type-plan-inscription.seed'

async function main() {

    await seedTypePlanInscripcion()
    // await seedDepositMehod()
    // await seedPaymentType()
    await seedRegistrationType()
    await seedClassification()
    await seedInscriptionState()
    await seedDocumentType()

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
