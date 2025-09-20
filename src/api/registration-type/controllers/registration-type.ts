import { Request, Response } from 'express'
import { getRegistrationTypes, getRegistrationTypeById, createRegistrationType, updateRegistrationType, deleteRegistrationType } from '../services/registration-type'

export async function list(req: Request, res: Response) {
    try {
        const data = await getRegistrationTypes()
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
        const registrationType = await createRegistrationType(data)
        return res.status(201).json(registrationType)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación del tipo de inscripción',
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
        const registrationType = await getRegistrationTypeById(id)
        if (!registrationType) {
            return res.status(404).json({ error: `Tipo de inscripción con id ${id} no encontrado` })
        }
        return res.json(registrationType)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el tipo de inscripción',
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
        const updatedRegistrationType = await updateRegistrationType(id, data)
        return res.json(updatedRegistrationType)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la actualización del tipo de inscripción',
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
        await deleteRegistrationType(id)
        return res.status(200).json({ message: 'Tipo de inscripción eliminado correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el tipo de inscripción',
            details: (error as Error).message,
        })
    }
}

