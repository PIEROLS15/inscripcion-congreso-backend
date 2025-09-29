import { Request, Response } from 'express'
import { getUsers, createUser, getUserById, getUserByEmail, updateUser, deleteUser } from '../services/users'
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

        // Agregar el campo numero que es igual al DNI
        const userDataWithNumber = {
            ...data,
            numero: data.dni
        }

        const usuario = await createUser(userDataWithNumber)
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

export async function findByEmail(req: Request, res: Response) {
    try {
        const email = req.params.email
        if (!email) {
            return res.status(400).json({ error: 'El email es requerido' })
        }
        const user = await getUserByEmail(email)
        if (!user) {
            return res.status(404).json({ error: `Usuario con email ${email} no encontrado` })
        }
        return res.json(user)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el usuario por email',
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
        const updatedUser = await updateUser(id, data)
        return res.json(updatedUser)
    } catch (error) {
        return res.status(400).json({
            error: 'Error al actualizar el usuario',
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
        await deleteUser(id)
        return res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el usuario',
            details: (error as Error).message,
        })
    }
}
