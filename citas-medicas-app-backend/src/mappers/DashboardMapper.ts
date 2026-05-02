import {
    ConteoCitasDto,
    ConteoEstadoDto,
    CitaDashboardDto,
    CitasPorDiaDto,
    CitasPorEstadoDto,
    DashboardResponseDto,
    ResumenDashboardDto,
} from '../dto/dashboard/dashboardResponseDto';

export class DashboardMapper {
    /**
     * Metodo para mapear conteos de entidades con estado activo/inactivo
     * @param total
     * @param activos
     * @param inactivos
     * @returns ConteoEstadoDto
     */
    static toConteoEstadoDto(
        total: number,
        activos: number,
        inactivos: number,
    ): ConteoEstadoDto {
        return {
            total,
            activos,
            inactivos,
        };
    }

    /**
     * Metodo para mapear conteos de citas
     * @param total
     * @param activas
     * @param inactivas
     * @param proximas
     * @param pasadas
     * @returns ConteoCitasDto
     */
    static toConteoCitasDto(
        total: number,
        activas: number,
        inactivas: number,
        proximas: number,
        pasadas: number,
    ): ConteoCitasDto {
        return {
            total,
            activas,
            inactivas,
            proximas,
            pasadas,
        };
    }

    /**
     * Metodo para mapear una cita del dashboard
     * @param cita
     * @returns CitaDashboardDto
     */
    static toCitaDashboardDto(cita: any): CitaDashboardDto {
        return {
            id: cita.id,
            paciente: cita.paciente,
            medico: cita.medico,
            fecha: cita.fecha,
            hora: cita.hora,
            activo: cita.activo,
        };
    }

    /**
     * Metodo para mapear una lista de citas del dashboard
     * @param citas
     * @returns CitaDashboardDto[]
     */
    static toCitaDashboardDtoList(citas: any[]): CitaDashboardDto[] {
        return citas.map(this.toCitaDashboardDto);
    }

    /**
     * Metodo para mapear datos de citas por dia
     * @param item
     * @returns CitasPorDiaDto
     */
    static toCitasPorDiaDto(item: any): CitasPorDiaDto {
        return {
            dia: item.dia,
            cantidad: Number(item.cantidad),
        };
    }

    /**
     * Metodo para mapear una lista de datos de citas por dia
     * @param data
     * @returns CitasPorDiaDto[]
     */
    static toCitasPorDiaDtoList(data: any[]): CitasPorDiaDto[] {
        return data.map(this.toCitasPorDiaDto);
    }

    /**
     * Metodo para mapear datos de citas por estado
     * @param item
     * @returns CitasPorEstadoDto
     */
    static toCitasPorEstadoDto(item: any): CitasPorEstadoDto {
        return {
            activo: item.activo,
            cantidad: Number(item.cantidad),
        };
    }

    /**
     * Metodo para mapear una lista de citas por estado
     * @param data
     * @returns CitasPorEstadoDto[]
     */
    static toCitasPorEstadoDtoList(data: any[]): CitasPorEstadoDto[] {
        return data.map(this.toCitasPorEstadoDto);
    }

    /**
     * Metodo para mapear el resumen del dashboard
     * @param pacientes
     * @param usuarios
     * @param medicos
     * @param citas
     * @returns ResumenDashboardDto
     */
    static toResumenDashboardDto(
        pacientes: ConteoEstadoDto,
        usuarios: ConteoEstadoDto,
        medicos: ConteoEstadoDto,
        citas: ConteoCitasDto,
    ): ResumenDashboardDto {
        return {
            pacientes,
            usuarios,
            medicos,
            citas,
        };
    }

    /**
     * Metodo para mapear el response completo del dashboard
     * @param resumen
     * @param proximasCitas
     * @param ultimasCitasPasadas
     * @param citasPorDia
     * @param citasPorEstado
     * @returns DashboardResponseDto
     */
    static toResponseDto(
        resumen: ResumenDashboardDto,
        proximasCitas: CitaDashboardDto[],
        ultimasCitasPasadas: CitaDashboardDto[],
        citasPorDia: CitasPorDiaDto[],
        citasPorEstado: CitasPorEstadoDto[],
    ): DashboardResponseDto {
        return {
            resumen,
            proximasCitas,
            ultimasCitasPasadas,
            citasPorDia,
            citasPorEstado,
        };
    }
}