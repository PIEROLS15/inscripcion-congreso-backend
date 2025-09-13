import { Request, Response } from 'express'
import { getClassifications, getClassificationById, createClassification, updateClassification, deleteClassification } from '../services/classification'

export async function list(req: Request, res: Response) {
    try {
        const data = await getClassifications()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({
            error: 'Error inesperado',
            details: (error as Error).message,
        })
    }
}

export async function create(req: Request, res: Response) {
    try {
        const data = req.body
        const classification = await createClassification(data)
        return res.status(201).json(classification)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación de la clasificación',
            details: (error as Error).message,
        })
    }
}

export async function find(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número válido' })
        }
        const classification = await getClassificationById(id)
        if (!classification) {
            return res.status(404).json({ error: `Clasificación con id ${id} no encontrado` })
        }
        return res.json(classification)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener la clasificación',
            details: (error as Error).message,
        })
    }
}

export async function update(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número válido' })
        }
        const data = req.body
        const classification = await updateClassification(id, data)
        return res.status(200).json(classification)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la actualización de la clasificación',
            details: (error as Error).message,
        })
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número válido' })
        }
        await deleteClassification(id)
        return res.status(200).json({ message: 'Clasificación eliminada correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar la clasificación',
            details: (error as Error).message,
        })
    }
}
