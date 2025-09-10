import { Request, Response } from 'express'
import { getUsers, createUser, getUserById } from '../services/users'
import { usuarioSchema } from '../utils/validation'

export async function list(req: Request, res: Response) {
    try {
        const data = await getUsers()
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
        const data = await usuarioSchema.validate(req.body)

        const usuario = await createUser(data)
        return res.status(201).json(usuario)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la validación o creación del usuario',
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

        const user = await getUserById(id)

        if (!user) {
            return res.status(404).json({ error: `Usuario con id ${id} no encontrado` })
        }

        return res.json(user)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el usuario',
            details: (error as Error).message,
        })
    }
}
