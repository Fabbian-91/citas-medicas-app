import { AppDataSource } from "../config/data-source";
import { Cita } from "../entities/Cita";
import { Medico } from "../entities/Medico";
import { Paciente } from "../entities/Paciente";
import { AppError } from "../errors/AppError";
import { CitaMapper } from "../mappers/CitaMappper";

export class CitaService {
    /**
     * Metodo para listar todas las citas
     * @returns 
     */
    static getAllCitas = async () => {
        // Traemos el repositorio para interactuar con la base de datos
        const repo = AppDataSource.getRepository(Cita);

        // Traemos todas las citas con sus relaciones de paciente y medico
        const citas = await repo.find({
            relations: {
                paciente: true,
                medico: true
            }
        });

        // Respondemos con el mapper de citas
        return CitaMapper.toResponseDtoList(citas);
    }

    /**
    * Metodo para traer una cita por su id
    * @param id 
    * @returns 
    */
    static getByIdCita = async (id: string) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de cita inválido", 400);
        }

        // Extraemos el id y lo convertimos en número
        const idCita = Number(id);

        // Validamos que sea un número válido, entero y positivo
        if (isNaN(idCita) || !Number.isInteger(idCita) || idCita <= 0) {
            throw new AppError("Id de cita inválido", 400);
        }

        // Traemos el repositorio para interactuar con la base de datos
        const repo = AppDataSource.getRepository(Cita);

        // Traemos la cita con sus relaciones de paciente y medico
        const cita = await repo.findOne({
            where: { id: idCita },
            relations: {
                paciente: true,
                medico: true
            }
        });

        // Validamos la cita
        if (!cita) {
            throw new AppError("La cita no existe", 404);
        }

        // Respondemos con el mapper de citas
        return CitaMapper.toResponseDto(cita);
    };

    /**
     * Metodo para crear una cita, se validan los datos enviados por body, si son correctos se crea la cita
     * @param pacienteId 
     * @param medicoId 
     * @param fecha 
     * @param hora 
     * @param motivo 
     * @param observaciones 
     */
    static postCita = async (
        pacienteId: number,
        medicoId: number,
        fecha: string,
        hora: string,
        motivo: string,
        observaciones?: string
    ) => {
        // Validamos que ningún dato obligatorio venga vacío
        if (!pacienteId || !medicoId || !fecha || !hora || !motivo) {
            throw new AppError("Paciente, médico, fecha, hora y motivo son obligatorios", 400);
        }

        // Validamos que el id del paciente sea número
        if (typeof pacienteId !== "number") {
            throw new AppError("El ID del paciente debe ser un número", 400);
        }

        // Validamos que el id del médico sea número
        if (typeof medicoId !== "number") {
            throw new AppError("El ID del médico debe ser un número", 400);
        }

        // Validamos que los ids sean números válidos, enteros y positivos
        if (
            isNaN(pacienteId) ||
            isNaN(medicoId) ||
            !Number.isInteger(pacienteId) ||
            !Number.isInteger(medicoId) ||
            pacienteId <= 0 ||
            medicoId <= 0
        ) {
            throw new AppError("Los IDs de paciente y médico deben ser números válidos", 400);
        }

        // Validamos que la fecha sea texto
        if (typeof fecha !== "string") {
            throw new AppError("La fecha debe ser texto", 400);
        }

        // Validamos que la hora sea texto
        if (typeof hora !== "string") {
            throw new AppError("La hora debe ser texto", 400);
        }

        // Validamos que el motivo sea texto
        if (typeof motivo !== "string") {
            throw new AppError("El motivo debe ser texto", 400);
        }

        // Limpiamos espacios al vacios
        fecha = fecha.trim();
        hora = hora.trim();
        motivo = motivo.trim();

        // Validamos que la fecha no venga vacía
        if (fecha === "") {
            throw new AppError("La fecha no puede estar vacía", 400);
        }

        // Validamos que la hora no venga vacía
        if (hora === "") {
            throw new AppError("La hora no puede estar vacía", 400);
        }

        // Validamos que el motivo no venga vacío
        if (motivo === "") {
            throw new AppError("El motivo no puede estar vacío", 400);
        }

        // Validamos que la fecha tenga formato
        const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!fechaRegex.test(fecha)) {
            throw new AppError("La fecha debe tener el formato YYYY-MM-DD", 400);
        }

        // Validamos que la hora tenga formato
        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!horaRegex.test(hora)) {
            throw new AppError("La hora debe tener el formato HH:mm", 400);
        }

        // Validamos que el motivo no supere los 255 caracteres
        if (motivo.length > 255) {
            throw new AppError("El motivo no puede superar los 255 caracteres", 400);
        }

        // Validamos observaciones solo si viene en el body
        if (observaciones !== undefined) {
            if (typeof observaciones !== "string") {
                throw new AppError("Las observaciones deben ser texto", 400);
            }

            observaciones = observaciones.trim();

            if (observaciones.length > 255) {
                throw new AppError("Las observaciones no pueden superar los 255 caracteres", 400);
            }
        }

        // Traemos el repositorio para interactuar con la base de datos
        const repo = AppDataSource.getRepository(Cita);

        //Validar que no haya una cita con el mismo médico, fecha y hora
        const citaExistente = await repo.findOne({
            where: {
                medico: { id: medicoId },
                fecha,
                hora,
                estado: true
            }
        });

        //Validar si existe la cita
        if (citaExistente) {
            throw new AppError("Ya existe una cita para ese médico en la fecha y hora seleccionadas", 400);
        }

        // Creamos la cita con los datos por parámetro
        const cita = repo.create({
            paciente: { id: pacienteId } as Paciente,
            medico: { id: medicoId } as Medico,
            fecha,
            hora,
            motivo,
            observaciones
        });

        // Guardamos la cita en la base de datos
        await repo.save(cita);
    };

    /**
     * Metodo para actualizar una cita
     * @param id
     * @param citaData 
     */
    static patchCita = async (
        id: string,
        citaData: {
            fecha?: string;
            hora?: string;
            motivo?: string;
            observaciones?: string;
            estado?: boolean;
        }
    ) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de cita inválido", 400);
        }

        // Extraemos el id y lo convertimos en número
        const idCita = Number(id);

        // Validamos que sea un número válido, entero y positivo
        if (isNaN(idCita) || !Number.isInteger(idCita) || idCita <= 0) {
            throw new AppError("Id de cita inválido", 400);
        }

        // Validamos que el body no venga vacío
        if (!citaData || Object.keys(citaData).length === 0) {
            throw new AppError("Debe enviar al menos un dato para actualizar", 400);
        }

        // Validamos que la fecha sea texto solo si viene en el body
        if (citaData.fecha !== undefined) {
            if (typeof citaData.fecha !== "string") {
                throw new AppError("La fecha debe ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            citaData.fecha = citaData.fecha.trim();

            // Validamos que la fecha no venga vacía
            if (citaData.fecha === "") {
                throw new AppError("La fecha no puede estar vacía", 400);
            }

            // Validamos que la fecha tenga formato YYYY-MM-DD
            const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!fechaRegex.test(citaData.fecha)) {
                throw new AppError("La fecha debe tener el formato YYYY-MM-DD", 400);
            }

            // Validamos que la fecha sea una fecha real
            const fechaDate = new Date(citaData.fecha);
            if (isNaN(fechaDate.getTime())) {
                throw new AppError("La fecha no es válida", 400);
            }
        }

        // Validamos que la hora sea texto solo si viene en el body
        if (citaData.hora !== undefined) {
            if (typeof citaData.hora !== "string") {
                throw new AppError("La hora debe ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            citaData.hora = citaData.hora.trim();

            // Validamos que la hora no venga vacía
            if (citaData.hora === "") {
                throw new AppError("La hora no puede estar vacía", 400);
            }

            // Validamos que la hora tenga formato HH:mm
            const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            if (!horaRegex.test(citaData.hora)) {
                throw new AppError("La hora debe tener el formato HH:mm", 400);
            }
        }

        // Validamos que el motivo sea texto solo si viene en el body
        if (citaData.motivo !== undefined) {
            if (typeof citaData.motivo !== "string") {
                throw new AppError("El motivo debe ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            citaData.motivo = citaData.motivo.trim();

            // Validamos que el motivo no venga vacío
            if (citaData.motivo === "") {
                throw new AppError("El motivo no puede estar vacío", 400);
            }

            // Validamos que el motivo tenga al menos 3 caracteres
            if (citaData.motivo.length < 3) {
                throw new AppError("El motivo debe tener al menos 3 caracteres", 400);
            }

            // Validamos que el motivo no supere los 255 caracteres
            if (citaData.motivo.length > 255) {
                throw new AppError("El motivo no puede superar los 255 caracteres", 400);
            }
        }

        // Validamos las observaciones solo si vienen en el body
        if (citaData.observaciones !== undefined) {
            if (typeof citaData.observaciones !== "string") {
                throw new AppError("Las observaciones deben ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            citaData.observaciones = citaData.observaciones.trim();

            // Validamos que las observaciones no superen los 255 caracteres
            if (citaData.observaciones.length > 255) {
                throw new AppError("Las observaciones no pueden superar los 255 caracteres", 400);
            }
        }

        // Validamos que el estado sea booleano solo si viene en el body
        if (citaData.estado !== undefined) {
            if (typeof citaData.estado !== "boolean") {
                throw new AppError("El estado debe ser verdadero o falso", 400);
            }
        }

        // Traemos el repositorio para interactuar con la tabla cita
        const repo = AppDataSource.getRepository(Cita);

        // Buscamos la cita por su id
        const citaExistente = await repo.findOne({
            where: { id: idCita },
            relations: {
                paciente: true,
                medico: true
            }
        });

        // Validamos que la cita exista
        if (!citaExistente) {
            throw new AppError("La cita no existe", 404);
        }

        // Actualizamos la fecha solo si viene en el body
        if (citaData.fecha !== undefined) {
            citaExistente.fecha = citaData.fecha;
        }

        // Actualizamos la hora solo si viene en el body
        if (citaData.hora !== undefined) {
            citaExistente.hora = citaData.hora;
        }

        // Actualizamos el motivo solo si viene en el body
        if (citaData.motivo !== undefined) {
            citaExistente.motivo = citaData.motivo;
        }

        // Actualizamos las observaciones solo si vienen en el body
        if (citaData.observaciones !== undefined) {
            citaExistente.observaciones = citaData.observaciones;
        }

        // Actualizamos el estado solo si viene en el body
        if (citaData.estado !== undefined) {
            citaExistente.estado = citaData.estado;
        }

        // Guardamos la cita actualizada en la base de datos
        const citaActualizada = await repo.save(citaExistente);

        // Respondemos con el mapper de cita
        return CitaMapper.toResponseDto(citaActualizada);
    };

    /**
     * Metodo para eliminar una cita, se valida que la cita exista
     * @param id
     */
    static deleteCita = async (id: string) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de cita inválido", 400);
        }
        // Extraemos el id y lo convertimos en número
        const idCita = Number(id);
        // Validamos que sea un número válido, entero y positivo
        if (isNaN(idCita) || !Number.isInteger(idCita) || idCita <= 0) {
            throw new AppError("Id de cita inválido", 400);
        }
        // Traemos el repositorio para interactuar con la tabla cita
        const repo = AppDataSource.getRepository(Cita);
        // Buscamos la cita por su id
        const citaExistente = await repo.findOne({
            where: { id: idCita }
        });
        // Validamos que la cita exista
        if (!citaExistente) {
            throw new AppError("La cita no existe", 404);
        }
        //Desactivamos la cita en lugar de eliminarla físicamente
        citaExistente.estado = false;

        // Guardamos la cita actualizada en la base de datos
        await repo.save(citaExistente);
    }
}