export class CitaResponseDto {
  id: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado: boolean;
  observaciones?: string | null;

  paciente: {
    id: number;
    nombre: string;
    cedula: string;
    telefono: string;
  };

  medico: {
    id: number;
    nombre: string;
    especialidad: string;
  };
}