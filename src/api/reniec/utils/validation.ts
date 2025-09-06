import * as yup from 'yup'

export const reniecSchema = yup.object({
  number: yup
    .string()
    .required('El número es requerido')
    .matches(/^\d{8}$/, 'Debe ser un DNI válido de 8 dígitos'),
})
