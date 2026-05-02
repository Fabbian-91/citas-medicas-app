/**
 * DTO reutilizaable para contar el total de pacientes, usuarios, medicos y citas por su estado
 */
export class ConteoEstadoDto {
    total: number;
    activos: number;
    inactivos: number;
}

/**
 * DTO para contar el total de citas por su estado, proximas y pasadas
 */
export class ConteoCitasDto {
    total: number;
    activas: number;
    inactivas: number;
    proximas: number;
    pasadas: number;
}

/**
 * DTO para mostrar la informacion de las citas en el dashboard
 */
export class CitaDashboardDto {
    id: number;
    paciente: string;
    medico: string;
    fecha: string;
    hora: string;
    activo: boolean;
}

/**
 * DTO para mostrar la cantidad de citas por dia
 */
export class CitasPorDiaDto {
    dia: string;
    cantidad: number;
}

/**
 * DTO para mostrar la cantidad de citas por su estado, activas e inactivas
 */
export class CitasPorEstadoDto {
    activo: boolean;
    cantidad: number;
}

/**
 * DTO para el resumen del dashboard
 */
export class ResumenDashboardDto {
    pacientes: ConteoEstadoDto;
    usuarios: ConteoEstadoDto;
    medicos: ConteoEstadoDto;
    citas: ConteoCitasDto;
}
/**
 * DTO para la respuesta del dashboard
 */
export class DashboardResponseDto {
    resumen: ResumenDashboardDto;
    proximasCitas: CitaDashboardDto[];
    ultimasCitasPasadas: CitaDashboardDto[];
    citasPorDia: CitasPorDiaDto[];
    citasPorEstado: CitasPorEstadoDto[];
}