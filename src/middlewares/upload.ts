import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Crear directorio de uploads si no existe
const uploadsDir = 'uploads/'
if (!fs.existsSync(uploadsDir)) {
    console.log('📁 Creando directorio uploads...')
    fs.mkdirSync(uploadsDir, { recursive: true })
    console.log('✅ Directorio uploads creado exitosamente')
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Verificar que el directorio existe antes de usarlo
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
        }
        cb(null, uploadsDir)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    },
})

export const upload = multer({ storage })
