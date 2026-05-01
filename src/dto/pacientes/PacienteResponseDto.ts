/**
 * DTO para la respuesta de un paciente, incluye los datos del paciente
 */
export class PacienteResponseDto {
    id: number;
    nombre: string;
    cedula: string;
    telefono: string;
    estado: boolean;
}