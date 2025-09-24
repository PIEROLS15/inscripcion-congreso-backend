import { Request, Response } from 'express'
import { getContacts, getContactById, createContact, deleteContact } from '../services/contact'

export async function list(req: Request, res: Response) {
    try {
        const data = await getContacts()
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
        const classification = await createContact(data)
        return res.status(201).json(classification)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación del contacto',
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
        const classification = await getContactById(id)
        if (!classification) {
            return res.status(404).json({ error: `Contacto con id ${id} no encontrado` })
        }
        return res.json(classification)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el contacto',
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
        await deleteContact(id)
        return res.status(200).json({ message: 'Contacto eliminado correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el contacto',
            details: (error as Error).message,
        })
    }
}
