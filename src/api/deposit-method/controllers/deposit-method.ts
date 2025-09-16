import { Request, Response } from 'express'
import { getDepositMethods, getDepositMethodById, createDepositMethod, updateDepositMethod, deleteDepositMethod } from '../services/deposit-method'

export async function list(req: Request, res: Response) {
    try {
        const data = await getDepositMethods()
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
        const depositMethod = await createDepositMethod(data)
        return res.status(201).json(depositMethod)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación del método de depósito',
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
        const depositMethod = await getDepositMethodById(id)
        if (!depositMethod) {
            return res.status(404).json({ error: `Método de depósito con id ${id} no encontrado` })
        }
        return res.json(depositMethod)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el método de depósito',
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
        const updatedDepositMethod = await updateDepositMethod(id, data)
        return res.json(updatedDepositMethod)
    } catch (error) {
        return res.status(400).json({
            error: 'Error al actualizar el método de depósito',
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
        await deleteDepositMethod(id)
        return res.status(200).json({ message: 'Metodo de depósito eliminado correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el método de depósito',
            details: (error as Error).message,
        })
    }
}
