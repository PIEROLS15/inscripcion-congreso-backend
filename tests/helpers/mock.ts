export const mockUser = {
    id: 1,
    dni: '12345678',
    nombres: 'Juan',
    apellidos: 'Pérez',
    correoElectronico: 'juan@example.com',
    celular: '987654321',
    creadoEn: new Date(),
    actualizadoEn: new Date(),
    inscripciones: [],
}

export const mockRegistrationType = {
    id: 1,
    nombre: 'Estudiante pregado',
    descripcion: 'Solo certificado',
    precio: 35,
    activo: true,
}

export const mockClassification = {
    id: 1,
    nombre: 'DOCENTE',
}

export const mockDepositMethod = {
    id: 1,
    nombre: 'Banco de la Nación',
    opciones: [],
}

export const mockPaymentType = {
    id: 1,
    metodoDepositoId: 1,
    nombre: 'Pago Directo',
}

export const mockVoucher = {
    id: 1,
    codigo: '1233211a',
    fechaPago: new Date('2025-09-19T10:30:00.000Z'),
    filename: 'file-1758333947816-177390556.png',
    path: '/uploads/file-1758333947816-177390556.png',
    mime: 'image/png'

}

export const mockInscriptionState = {
    id: 1,
    nombre: 'Pendiente'
}

export const mockInscription = {
    usuario: mockUser,
    tipoInscripcionId: 2,
    clasificacionId: 3,
    metodoDepositoId: 1,
    tipoPagoId: 1,
    estadoId: 1,
    voucherId: 2
}
