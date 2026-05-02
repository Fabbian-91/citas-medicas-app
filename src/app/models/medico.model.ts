export interface Medico {
    id?: number;
    nombre: string;
    especialidad: string;
    estado: boolean;
}

export interface medicoApiResponse {
    message: string;
    data: Medico[];
}