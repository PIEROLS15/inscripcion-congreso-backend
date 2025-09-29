import { Request, Response } from 'express'
import { create, get, getById, remove, update } from '../services/document-type.srv'

export async function listCtrl(req: Request, res: Response) {
    try {
        const data = await get()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({
            error: 'Error inesperado',
            details: (error as Error).message,
        })
    }
}

export async function createCtrl(req: Request, res: Response) {
    try {
        const data = req.body
        const documentType = await create(data)
        return res.status(201).json(documentType)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la creación del tipo de documento',
            details: (error as Error).message,
        })
    }
}

export async function findCtrl(req: Request, res: Response) {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({ error: 'El id no es valido' })
        }
        const documentType = await getById(id)
        if (!documentType) {
            return res.status(404).json({ error: `Tipo de documento con id ${id} no encontrado` })
        }
        return res.json(documentType)
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el tipo de documento',
            details: (error as Error).message,
        })
    }
}

export async function updateCtrl(req: Request, res: Response) {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ error: 'El id no es valido' })
        }
        const data = req.body
        const updatedDocumentType = await update(id, data)
        return res.json(updatedDocumentType)
    } catch (error) {
        return res.status(400).json({
            error: 'Error en la actualización del tipo de documento',
            details: (error as Error).message,
        })
    }
}

export async function removeCtrl(req: Request, res: Response) {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ error: 'El id no es valido' })
        }
        await remove(id)
        return res.status(200).json({ message: 'Tipo de documento eliminado correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el tipo de documento',
            details: (error as Error).message,
        })
    }
}

