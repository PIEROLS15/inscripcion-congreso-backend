import { prisma } from '../../src/database/prisma'
import { getContacts, getContactById, createContact, deleteContact } from '../../src/api/contact/services/contact'
import { mockContact } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        contact: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}))

describe('Endpoints Contact', () => {
    it('should create a contact correctly', async () => {
        (prisma.contact.create as jest.Mock).mockResolvedValue(mockContact)

        const classification = await createContact({
            firstName: mockContact.firstName,
            lastName: mockContact.lastName,
            email: mockContact.email,
            subject: mockContact.subject,
            message: mockContact.message,
            timestamp: mockContact.timestamp
        })
        expect(classification).toEqual(mockContact)
        expect(prisma.contact.create).toHaveBeenCalledWith({
            data: {
                firstName: mockContact.firstName,
                lastName: mockContact.lastName,
                email: mockContact.email,
                subject: mockContact.subject,
                message: mockContact.message,
                timestamp: mockContact.timestamp
            },
        })
    })

    it('should return all contacts', async () => {
        (prisma.contact.findMany as jest.Mock).mockResolvedValue([mockContact])
        const classifications = await getContacts()
        expect(classifications).toEqual([mockContact])
        expect(prisma.contact.findMany).toHaveBeenCalled()
    })

    it('should return a contact by id', async () => {
        (prisma.contact.findUnique as jest.Mock).mockResolvedValue(mockContact)
        const classification = await getContactById(1)
        expect(classification).toEqual(mockContact)
        expect(prisma.contact.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })

    it('should delete a contact by id', async () => {
        (prisma.contact.delete as jest.Mock).mockResolvedValue(mockContact)
        const classification = await deleteContact(1)
        expect(classification).toEqual(mockContact)
        expect(prisma.contact.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })
})
