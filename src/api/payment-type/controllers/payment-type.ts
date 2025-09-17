import { Request, Response } from 'express'
import { getPaymentTypes, getPaymentTypeById, createPaymentType, updatePaymentType, deletePaymentType } from '../services/payment-type'

export async function list(req: Request, res: Response) {
    try {
        const data = await getPaymentTypes()
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
        const paymentType = await createPaymentType(data)
        return res.status(201).json(paymentType)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación del tipo de pago',
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
        const paymentType = await getPaymentTypeById(id)
        if (!paymentType) {
            return res.status(404).json({ error: `Tipo de pago con id ${id} no encontrado` })
        }
        return res.json(paymentType)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el tipo de pago',
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
        const updatedPaymentType = await updatePaymentType(id, data)
        return res.json(updatedPaymentType)
    } catch (error) {
        return res.status(400).json({
            error: 'Error al actualizar el tipo de pago',
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
        await deletePaymentType(id)
        return res.status(200).json({ message: 'Tipo de pago eliminado correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el tipo de pago',
            details: (error as Error).message,
        })
    }
}
