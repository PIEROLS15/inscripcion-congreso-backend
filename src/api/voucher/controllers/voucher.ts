import { Request, Response } from 'express'
import { getVouchers, getVoucherById, createVoucher, deleteVoucher } from '../services/voucher'

export async function list(req: Request, res: Response) {
    try {
        const data = await getVouchers()
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
        const { codigo, fechaPago } = req.body

        const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined

        const voucher = await createVoucher({
            codigo,
            fechaPago: new Date(fechaPago),
            filename: req.file?.filename,
            path: fileUrl,
            mime: req.file?.mimetype,
        })

        return res.status(201).json(voucher)

    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación del voucher',
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

        const classification = await getVoucherById(id)

        if (!classification) {
            return res.status(404).json({ error: `Voucher con id ${id} no encontrado` })
        }

        return res.json(classification)

    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el voucher',
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

        await deleteVoucher(id)

        return res.status(200).json({ message: 'Voucher eliminado correctamente' })

    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el Voucher',
            details: (error as Error).message,
        })
    }
}
