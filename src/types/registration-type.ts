export interface Caracteristica {
    icon: string
    text: string
}

export interface RegistrationType {
    nombre: string
    badge?: string
    precio: number
    descripcion: string
    institutionalPrice: number 
    activo: boolean
    caracteristicas?: Caracteristica[] | null
    value?: string
}