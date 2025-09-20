import { Request, Response } from 'express'
import {
    getInscriptionsState,
    getInscriptionStateById,
    createInscriptionState,
    updateInscriptionState,
    deleteInscriptionState
} from '../services/inscription-state'

export async function list(req: Request, res: Response) {
    try {
        const data = await getInscriptionsState()
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
        const classification = await createInscriptionState(data)
        return res.status(201).json(classification)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación del estado de la inscripción',
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
        const classification = await getInscriptionStateById(id)
        if (!classification) {
            return res.status(404).json({ error: `Estado de inscripción con id ${id} no encontrado` })
        }
        return res.json(classification)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el estado de la inscripción',
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
        const classification = await updateInscriptionState(id, data)
        return res.status(200).json(classification)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la actualización del estado de la inscripción',
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
        await deleteInscriptionState(id)
        return res.status(200).json({ message: 'Estado de inscripción eliminada correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el estado de la inscripción',
            details: (error as Error).message,
        })
    }
}

