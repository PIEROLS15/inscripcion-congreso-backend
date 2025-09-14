import { prisma } from '../../src/database/prisma'
import { getClassifications, getClassificationById, createClassification, updateClassification, deleteClassification } from '../../src/api/classification/services/classification'
import { mockClassification } from '../helpers/mock'

jest.mock('../../src/database/prisma', () => ({
    prisma: {
        clasificacion: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}))

describe('Endpoints Classifications', () => {
    it('should create a classification correctly', async () => {
        (prisma.clasificacion.create as jest.Mock).mockResolvedValue(mockClassification)

        const classification = await createClassification({
            nombre: mockClassification.nombre,
        })
        expect(classification).toEqual(mockClassification)
        expect(prisma.clasificacion.create).toHaveBeenCalledWith({
            data: {
                nombre: mockClassification.nombre,
            },
        })
    })

    it('should return all classifications', async () => {
        (prisma.clasificacion.findMany as jest.Mock).mockResolvedValue([mockClassification])
        const classifications = await getClassifications()
        expect(classifications).toEqual([mockClassification])
        expect(prisma.clasificacion.findMany).toHaveBeenCalled()
    })

    it('should return a classification by id', async () => {
        (prisma.clasificacion.findUnique as jest.Mock).mockResolvedValue(mockClassification)
        const classification = await getClassificationById(1)
        expect(classification).toEqual(mockClassification)
        expect(prisma.clasificacion.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })

    it('should update a classification by id', async () => {
        (prisma.clasificacion.update as jest.Mock).mockResolvedValue(mockClassification)
        const classification = await updateClassification(1, { nombre: 'DOCENTE' })
        expect(classification).toEqual(mockClassification)
        expect(prisma.clasificacion.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { nombre: 'DOCENTE' },
        })
    })

    it('should delete a classification by id', async () => {
        (prisma.clasificacion.delete as jest.Mock).mockResolvedValue(mockClassification)
        const classification = await deleteClassification(1)
        expect(classification).toEqual(mockClassification)
        expect(prisma.clasificacion.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        })
    })
})
