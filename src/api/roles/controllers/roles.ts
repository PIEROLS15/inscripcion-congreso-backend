import { Request, Response } from 'express'
import {
    getRoles,
    getRoleById,
    createRole,
    updateRole
} from '../services/roles'

export async function list(req: Request, res: Response) {
    try {
        const data = await getRoles()
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
        const role = await createRole(data)
        return res.status(201).json(role)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación del rol',
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
        const role = await getRoleById(id)
        if (!role) {
            return res.status(404).json({ error: `Rol con id ${id} no encontrado` })
        }
        return res.json(role)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el rol',
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
        const role = await updateRole(id, data)
        return res.status(200).json(role)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la actualización del rol',
            details: (error as Error).message,
        })
    }
}
