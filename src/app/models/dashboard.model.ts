export interface DashboardResponse {
    message: string;
    data: DashboardData;
}

export interface DashboardData {
    resumen: ResumenDashboard;
    proximasCitas: CitaDashboard[];
    ultimasCitasPasadas: CitaDashboard[];
    citasPorDia: CitasPorDia[];
    citasPorEstado: CitasPorEstado[];
}

export interface ResumenDashboard {
    pacientes: ResumenEstado;
    usuarios: ResumenEstado;
    medicos: ResumenEstado;
    citas: ResumenCitas;
}

export interface ResumenEstado {
    total: number;
    activos: number;
    inactivos: number;
}

export interface ResumenCitas {
    total: number;
    activas: number;
    inactivas: number;
    proximas: number;
    pasadas: number;
}

export interface CitaDashboard {
    id: number;
    paciente: PacienteDashboard;
    medico: MedicoDashboard;
    fecha: string;
    hora: string;
}

export interface PacienteDashboard {
    id: number;
    nombre: string;
    cedula: string;
    telefono: string;
    estado: boolean;
}

export interface MedicoDashboard {
    id: number;
    nombre: string;
    especialidad: string;
    estado: boolean;
}

export interface CitasPorDia {
    dia: string;
    cantidad: number;
}

export interface CitasPorEstado {
    activo: boolean;
    cantidad: number;
}