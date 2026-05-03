import { LessThan, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { CitasPorEstadoDto, ResumenDashboardDto } from "../dto/dashboard/dashboardResponseDto";
import { Cita } from "../entities/Cita";
import { Medico } from "../entities/Medico";
import { Paciente } from "../entities/Paciente";
import { Usuario } from "../entities/Usuario";
import { DashboardMapper } from "../mappers/DashboardMapper";

export class DashboardService {
    /**
     * Metodo para obtener los datos del dashboard
     * @return DashboardResponseDto
     */
    static getDashboardData = async () => {
        //Treamos los repositorios para interactuar con la base de datos
        const repoCita = AppDataSource.getRepository(Cita);
        const repoUsuario = AppDataSource.getRepository(Usuario);
        const repoMedico = AppDataSource.getRepository(Medico);
        const repoPaciente = AppDataSource.getRepository(Paciente);

        //Obtenemos el conteo total de citas, usuarios, medicos y pacientes
        const totalCitas = await repoCita.count();
        const totalUsuarios = await repoUsuario.count();
        const totalMedicos = await repoMedico.count();
        const totalPacientes = await repoPaciente.count();

        //Obtenemos el total de citas por su estado activo
        const totalCitasPorEstadoActivo = await repoCita.count({
            where: { estado: true }
        });

        //Obtenemos el total de citas por su estado inactivo
        const totalCitasPorEstadoInactivo = await repoCita.count({
            where: { estado: false }
        });

        //Creamos un fecha de hoy para comparar con las citas proximas y pasadas
        const hoy = new Date().toISOString().split("T")[0];

        //Obtenemos las citas proximas fecha mayor a hoy
        const totalCitasProximas = await repoCita.count({
            where: { fecha: MoreThanOrEqual(hoy) }
        });

        //Obtenemos las citas pasadas fecha menor a hoy
        const totalCitasPasadas = await repoCita.count({
            where: { fecha: LessThan(hoy) }
        });

        //Obtenemos el total de pacientes activos
        const totalPacientesActivos = await repoPaciente.count({
            where: { estado: true }
        });

        //Obtenemos el total de pacientes inactivos
        const totalPacientesInactivos = await repoPaciente.count({
            where: { estado: false }
        });

        //Obtenemos el total de usuarios activos
        const totalUsuariosActivos = await repoUsuario.count({
            where: { estado: true }
        });

        //Obtenemos el total de usuarios inactivos
        const totalUsuariosInactivos = await repoUsuario.count({
            where: { estado: false }
        });

        //Obtenemos el total de medicos activos
        const totalMedicosActivos = await repoMedico.count({
            where: { estado: true }
        });

        //Obtenemos el total de medicos inactivos
        const totalMedicosInactivos = await repoMedico.count({
            where: { estado: false }
        });


        // Obtener las próximas citas activas
        const proximasCitas = await repoCita.find({
            where: {
                estado: true
            },
            order: { fecha: "ASC" },
            take: 5,
            skip: 0,
            relations: ["paciente", "medico"]
        });

        // Obtener las primeras 20 citas 
        const citasPasadas = await repoCita.find({
            where: {
                estado: false
            },
            order: { fecha: "ASC" },
            take: 5,
            skip: 0,
            relations: ["paciente", "medico"]
        });

        //Obtenemos la cantidad de citas por dia, agrupando por fecha
        const citasPorDia = await repoCita
            .createQueryBuilder("cita")
            .select("DAYNAME(cita.fecha)", "dia")
            .addSelect("COUNT(*)", "cantidad")
            .where("cita.estado = :estado", { estado: true })
            .andWhere("DAYOFWEEK(cita.fecha) BETWEEN 2 AND 6")
            .groupBy("DAYOFWEEK(cita.fecha)")
            .addGroupBy("DAYNAME(cita.fecha)")
            .orderBy("DAYOFWEEK(cita.fecha)", "ASC")
            .getRawMany();

        //Obtenemos la cantidad de citas por su estado activos
        const citasActivas = await repoCita.count({
            where: {
                estado: true
            }
        });

        //Obtenemos la cantidad de citas por su estado inactivos
        const citasInactivas = await repoCita.count({
            where: {
                estado: false
            }
        });

        // Creamos un arreglo de objetos con la cantidad de citas por su estado
        const resultado: CitasPorEstadoDto[] = [
            {
                activo: true,
                cantidad: citasActivas
            },
            {
                activo: false,
                cantidad: citasInactivas
            }
        ];


        //listamos los datos de los pacientes
        const pacientesResumen = DashboardMapper.toConteoEstadoDto(
            totalPacientes,
            totalPacientesActivos,
            totalPacientesInactivos
        );
        //listamos los datos de los usuarios
        const usuariosResumen = DashboardMapper.toConteoEstadoDto(
            totalUsuarios,
            totalUsuariosActivos,
            totalUsuariosInactivos
        );
        //listamos los datos de los medicos
        const medicosResumen = DashboardMapper.toConteoEstadoDto(
            totalMedicos,
            totalMedicosActivos,
            totalMedicosInactivos
        );
        //listamos los datos de las citas
        const citasResumen = DashboardMapper.toConteoCitasDto(
            totalCitas,
            totalCitasPorEstadoActivo,
            totalCitasPorEstadoInactivo,
            totalCitasProximas,
            totalCitasPasadas
        );
        //listamos el resumen del dashboard
        const resumen = DashboardMapper.toResumenDashboardDto(
            pacientesResumen,
            usuariosResumen,
            medicosResumen,
            citasResumen
        );
        //listamos la respuesta del dashboard
        const response = DashboardMapper.toResponseDto(
            resumen,
            proximasCitas.map(cita => DashboardMapper.toCitaDashboardDto(cita)),
            citasPasadas.map(cita => DashboardMapper.toCitaDashboardDto(cita)),
            citasPorDia.map(item => DashboardMapper.toCitasPorDiaDto(item)),
            resultado.map(item => DashboardMapper.toCitasPorEstadoDto(item))
         );
        //Retornamos la respuesta del dashboard
        return response;
    }

}