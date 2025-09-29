/* eslint-disable no-unused-vars */
export enum DocumentType {
    DNI = 'dni',
    CE = 'ce',
    RUC = 'ruc'
}

export interface normaliceData {
    numero: string;
    idTipoDocumento: DocumentType;
    nombres: string;
    apellidos: string;
}