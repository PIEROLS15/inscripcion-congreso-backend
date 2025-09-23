import { prisma } from '../../../database/prisma'
import { Contact } from '../../../types/contact'

export async function getContacts() {
    return prisma.contact.findMany()
}

export async function getContactById(id: number) {
    return prisma.contact.findUnique({
        where: { id },
    })
}

export async function createContact(data: Contact) {
    return prisma.contact.create({ data })
}

export async function deleteContact(id: number) {
    return prisma.contact.delete({
        where: { id },
    })
}
