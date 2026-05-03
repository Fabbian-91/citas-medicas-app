/**
 * Modelo para recibir el resumen de todo el dashboard
 */
export interface DashboardResponse {
    message: string;
    data: DashboardData;
}

/**
 * modelod para recibir los arreglos y el resumen de dashboard
 */
export interface DashboardData {
    resumen: ResumenDashboard;
    proximasCitas: CitaDashboard[];
    ultimasCitasPasadas: CitaDashboard[];
    citasPorDia: CitasPorDia[];
    citasPorEstado: CitasPorEstado[];
}

/**
 * Modelo para recibir el resumen principal los cards
 */
export interface ResumenDashboard {
    pacientes: ResumenEstado;
    usuarios: ResumenEstado;
    medicos: ResumenEstado;
    citas: ResumenCitas;
}

/**
 * Modelo para recimir el resumen por estado y hacer la grafica de estados
 */
export interface ResumenEstado {
    total: number;
    activos: number;
    inactivos: number;
}

/**
 * Modelo para recibir resumen de citas
 */
export interface ResumenCitas {
    total: number;
    activas: number;
    inactivas: number;
    proximas: number;
    pasadas: number;
}

/**
 * Modelo para recibir la citas
 */
export interface CitaDashboard {
    id: number;
    paciente: PacienteDashboard;
    medico: MedicoDashboard;
    fecha: string;
    hora: string;
}

/**
 * Modelo para recibir todos lo pacientes
 */
export interface PacienteDashboard {
    id: number;
    nombre: string;
    cedula: string;
    telefono: string;
    estado: boolean;
}

/**
 * Modelo para recibir todo los medicos
 */
export interface MedicoDashboard {
    id: number;
    nombre: string;
    especialidad: string;
    estado: boolean;
}

/**
 * Modelo para recibir todo las citas por dia
 */
export interface CitasPorDia {
    dia: string;
    cantidad: number;
}

/**
 * Modelo para recibir todo la citas por estado
 */
export interface CitasPorEstado {
    activo: boolean;
    cantidad: number;
}