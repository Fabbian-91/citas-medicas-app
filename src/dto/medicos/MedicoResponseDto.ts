/**
 * DTO para la respuesta de un medico, incluye los datos del medico
 */
export class MedicoResponseDto {
  id: number;
  nombre: string;
  especialidad: string;
  estado: boolean;
}