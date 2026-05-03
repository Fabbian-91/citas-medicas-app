/**
 * Modelo para enviar y recibir paciente
 */
export interface PacienteModel{
    id?:number;
    nombre:string;
    cedula:string;
    telefono:string;
    estado:boolean;
}

/**
 * Modelo para listar todos los pacientes
 */
export interface pacienteApiResponse{
    message:string;
    data:PacienteModel[];
}