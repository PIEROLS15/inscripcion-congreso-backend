import { Request, Response } from 'express'
import { getInscriptions, getInscriptionById, createInscription, deleteInscription } from '../services/inscription'

// Definir tipo para el archivo de multer
type MulterFile = {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
}

// Extender Request para incluir el archivo
interface RequestWithFile extends Omit<Request, 'file'> {
    file?: MulterFile
}

export async function list(req: Request, res: Response) {
    try {
        const data = await getInscriptions()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({
            error: 'Error inesperado',
            details: (error as Error).message,
        })
    }
}

export async function create(req: RequestWithFile, res: Response) {
    try {
        console.log('📥 Datos recibidos en el backend:', req.body)
        console.log('📁 Archivo recibido:', req.file)
        
        // Manejar tanto JSON como form-data
        let requestData
        
        if (req.is('multipart/form-data')) {
            // Si viene con archivo (multipart/form-data) - NUEVO ESQUEMA
            const file = req.file
            requestData = {
                // Datos del usuario
                usuario: JSON.parse(req.body.usuario || '{}'),
                
                // IDs de relaciones
                tipoInscripcionId: parseInt(req.body.tipoInscripcionId, 10),
                clasificacionId: req.body.clasificacionId ? parseInt(req.body.clasificacionId, 10) : undefined,
                estadoId: req.body.estadoId ? parseInt(req.body.estadoId, 10) : 1,
                
                // Nuevos campos de pago integrados
                modalidadDeposito: req.body.modalidadDeposito || undefined,
                bancoSeleccionado: req.body.bancoSeleccionado || undefined,
                tipoOperacion: req.body.tipoOperacion || undefined,
                billeteraDigital: req.body.billeteraDigital || undefined,
                numeroOperacion: req.body.numeroOperacion,
                fechaPago: new Date(req.body.fechaPago),
                pago: parseFloat(req.body.pago) || 0,
                
                // Campos de descuento (convertir strings a boolean)
                esEmailInstitucional: req.body.esEmailInstitucional === 'true',
                hasDiscount: req.body.hasDiscount === 'true',
                descuento: parseFloat(req.body.descuento) || 0,
                
                // Archivo
                file: file ? file.filename : undefined
            }
        } else {
            // Si viene como JSON puro - NUEVO ESQUEMA
            requestData = {
                // Datos del usuario
                usuario: req.body.usuario,
                
                // IDs de relaciones
                tipoInscripcionId: parseInt(req.body.tipoInscripcionId, 10),
                clasificacionId: req.body.clasificacionId ? parseInt(req.body.clasificacionId, 10) : undefined,
                estadoId: req.body.estadoId ? parseInt(req.body.estadoId, 10) : 1,
                
                // Nuevos campos de pago integrados
                modalidadDeposito: req.body.modalidadDeposito || undefined,
                bancoSeleccionado: req.body.bancoSeleccionado || undefined,
                tipoOperacion: req.body.tipoOperacion || undefined,
                billeteraDigital: req.body.billeteraDigital || undefined,
                numeroOperacion: req.body.numeroOperacion,
                fechaPago: new Date(req.body.fechaPago),
                pago: parseFloat(req.body.pago) || 0,
                
                // Campos de descuento (asegurar que sean boolean)
                esEmailInstitucional: Boolean(req.body.esEmailInstitucional),
                hasDiscount: Boolean(req.body.hasDiscount),
                descuento: parseFloat(req.body.descuento) || 0,
                
                // Archivo
                file: req.body.file || undefined
            }
        }
        
        console.log('🔧 Datos procesados para Prisma:', requestData)

        const inscription = await createInscription(requestData)
        return res.status(201).json({
            success: true,
            message: 'Inscripción creada exitosamente',
            data: inscription
        })
    } catch (error) {
        console.error('❌ Error en controlador:', error)
        
        const errorMessage = (error as Error).message
        
        // Manejo específico de errores comunes
        if (errorMessage.includes('código de operación') && errorMessage.includes('ya está registrado')) {
            return res.status(409).json({
                success: false,
                error: 'Código de operación duplicado',
                message: errorMessage,
            })
        }
        
        if (errorMessage.includes('Ya existe una inscripción registrada')) {
            return res.status(409).json({
                success: false,
                error: 'Usuario ya registrado',
                message: errorMessage,
            })
        }
        
        if (errorMessage.includes('Unique constraint failed')) {
            return res.status(409).json({
                success: false,
                error: 'Datos duplicados',
                message: 'Ya existe un registro con estos datos. Por favor, verifique la información.',
            })
        }
        
        return res.status(400).json({
            success: false,
            error: 'Error en la creación de la inscripción',
            message: errorMessage,
        })
    }
}

export async function find(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número válido' })
        }
        const inscription = await getInscriptionById(id)
        if (!inscription) {
            return res.status(404).json({ error: `Inscripción con id ${id} no encontrada` })
        }
        return res.status(200).json({
            success: true,
            message: 'Inscripción encontrada',
            data: inscription
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener la inscripción',
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
        await deleteInscription(id)
        return res.status(200).json({ message: 'Inscripción eliminada correctamente' })
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar la inscripción',
            details: (error as Error).message,
        })
    }
}
