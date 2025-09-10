import * as yup from 'yup'

export const usuarioSchema = yup.object({
    dni: yup
        .string()
        .required('El DNI es requerido')
        .matches(/^\d{8}$/, 'El DNI debe tener 8 dígitos'),
    nombres: yup.string().required('Los nombres son requeridos'),
    apellidos: yup.string().required('Los apellidos son requeridos'),
    correoElectronico: yup
        .string()
        .email('Debe ser un correo válido')
        .required('El correo es requerido'),
    celular: yup
        .string()
        .matches(/^\d{9}$/, 'El celular debe tener 9 dígitos')
        .required('El celular es requerido'),
})
