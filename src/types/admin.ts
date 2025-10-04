export interface Administradores {
    nombres: string
    apellidos: string
    correoElectronico: string
    contrasena: string
    creadoEn: Date
    actualizadoEn: Date
    rolId: number
}

export interface AdminWithRole extends Administradores {
    id: number,
    rol: Roles
}

export interface Roles {
    nombre: string
}

