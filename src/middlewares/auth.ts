import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en .env')
}

interface UserData {
    id: number
    nombres: string
    apellidos: string
    correoElectronico: string
    rolId: number
    rolNombre: string
}

interface CustomJwtPayload extends DefaultJwtPayload {
    user: UserData
}

export interface AuthenticatedRequest extends Request {
    user?: UserData
}

export function verifyAdminRole(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(401).json({ message: 'Falta el token de autorización' })
        return
    }

    const [, token] = authHeader.split(' ')

    if (!token) {
        res.status(401).json({ message: 'Formato de token inválido' })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload

        if (decoded.user.rolId !== 1) {
            res.status(403).json({ message: 'Acceso denegado: requiere rol de administrador' })
            return
        }

        req.user = decoded.user

        next()
    } catch (error) {
        console.error('Error en middleware de autenticación:', error)
        res.status(401).json({ message: 'Token inválido o expirado' })
    }
}
