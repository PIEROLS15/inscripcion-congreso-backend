import { ReniecResponse } from '../../../types/reniec'

export async function fetchReniecData(number: string) {
  const tokenReniec = process.env.RENIEC_TOKEN
  const api_dni = process.env.API_RENIEC_DNI

  if (!tokenReniec) {
    throw new Error('Falta RENIEC_TOKEN')
  }

  if (!api_dni) {
    throw new Error('Falta API_RENIEC_DNI')
  }

  const response = await fetch(`${api_dni}${number}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenReniec}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || 'Error en upstream')
  }

  const json = (await response.json()) as ReniecResponse
  return json
}
