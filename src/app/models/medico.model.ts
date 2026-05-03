/**
 * Modelo para enviar medicos
 */
export interface MedicoModel{
    id?: number;
    nombre: string;
    especialidad: string;
    estado: boolean;
}

/**
 * Modelo para recibir lista de medicos
 */
export interface medicoApiResponse {
    message: string;
    data: MedicoModel[];
}