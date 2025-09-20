import { Request, Response } from 'express'
import { getInscriptions, getInscriptionById, createInscription, deleteInscription } from '../services/inscription'

export async function list(req: Request, res: Response) {
    try {
        const data = await getInscriptions()
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
        const classification = await createInscription(data)
        return res.status(201).json(classification)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación de la inscripción',
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
        const classification = await getInscriptionById(id)
        if (!classification) {
            return res.status(404).json({ error: `Inscripción con id ${id} no encontrado` })
        }
        return res.json(classification)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener la inscripción',
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
        await deleteInscription(id)
        return res.status(200).json({ message: 'Inscripción eliminada correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar la inscripción',
            details: (error as Error).message,
        })
    }
}
