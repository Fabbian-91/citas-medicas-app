import { Not } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Paciente } from "../entities/Paciente";
import { AppError } from "../errors/AppError";
import { PacienteMapper } from "../mappers/PacienteMapper";

export class PacienteService {

    /**
     * Metodo para listar todos los pacientes
     * @returns 
     */
    static getAllPacientes = async () => {
        // Traemos el repositorio para interactuar con la tabla paciente
        const repo = AppDataSource.getRepository(Paciente);
        // Listamos todos los pacientes que tengan un estado activo
        const pacientes = await repo.find({ where: { estado: true } });
        // Devolvemos una lista con los datos mapeados
        return PacienteMapper.toResponseDtoList(pacientes);
    }

    /**
     * Metodo para obtener un paciente por su id
     * @param id 
     * @returns 
     */
    static getByIdPaciente = async (id: string | null) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de paciente inválido", 400);
        }
        // Extraemos el id y lo convertimos en número
        const idPaciente = Number(id);
        // Validamos que sea un número
        if (isNaN(idPaciente)) {
            throw new AppError("Id de paciente inválido", 400);
        }
        // Traemos el repositorio para interactuar con la base de datos
        const repo = AppDataSource.getRepository(Paciente);
        // Traemos el paciente
        const paciente = await repo.findOne({ where: { id: idPaciente } });
        // Validamos el paciente
        if (!paciente) {
            throw new AppError("El paciente no existe", 404);
        }
        // Respondemos con el mapper de paciente
        return PacienteMapper.toResponseDto(paciente);
    }

    /**
    * Metodo para crear un nuevo paciente
    * @param nombre 
    * @param cedula 
    * @param telefono 
    * @returns 
    */
    static postPaciente = async (nombre: string, cedula: string, telefono: string) => {

        // Validamos que ningún dato venga vacío, null o undefined
        if (!nombre || !cedula || !telefono) {
            throw new AppError("Nombre, cédula y teléfono son obligatorios", 400);
        }

        // Validamos que el nombre sea texto
        if (typeof nombre !== "string") {
            throw new AppError("El nombre debe ser texto", 400);
        }

        // Validamos que la cédula sea texto
        if (typeof cedula !== "string") {
            throw new AppError("La cédula debe ser texto", 400);
        }

        // Validamos que el teléfono sea texto
        if (typeof telefono !== "string") {
            throw new AppError("El teléfono debe ser texto", 400);
        }

        // Limpiamos espacios al inicio y al final
        nombre = nombre.trim();
        cedula = cedula.trim();
        telefono = telefono.trim();

        // Validamos que el nombre no venga vacío
        if (nombre === "") {
            throw new AppError("El nombre no puede estar vacío", 400);
        }

        // Validamos que la cédula no venga vacía
        if (cedula === "") {
            throw new AppError("La cédula no puede estar vacía", 400);
        }

        // Validamos que el teléfono no venga vacío
        if (telefono === "") {
            throw new AppError("El teléfono no puede estar vacío", 400);
        }

        // Validamos que el nombre tenga al menos 2 caracteres
        if (nombre.length < 2) {
            throw new AppError("El nombre debe tener al menos 2 caracteres", 400);
        }

        // Validamos que la cédula tenga al menos 5 caracteres
        if (cedula.length < 5) {
            throw new AppError("La cédula debe tener al menos 5 caracteres", 400);
        }

        // Validamos que el teléfono tenga al menos 8 caracteres
        if (telefono.length < 8) {
            throw new AppError("El teléfono debe tener al menos 8 caracteres", 400);
        }

        // Validamos que el teléfono no supere los 50 caracteres
        if (telefono.length > 50) {
            throw new AppError("El teléfono no puede superar los 50 caracteres", 400);
        }

        // Validamos que la cédula no supere los 50 caracteres
        if (cedula.length > 50) {
            throw new AppError("La cédula no puede superar los 50 caracteres", 400);
        }

        // Validamos que el nombre no supere los 50 caracteres
        if (nombre.length > 50) {
            throw new AppError("El nombre no puede superar los 50 caracteres", 400);
        }

        // Validamos que la cédula tenga un formato válido, solo números y guiones
        const cedulaRegex = /^[0-9-]+$/;
        if (!cedulaRegex.test(cedula)) {
            throw new AppError("La cédula no tiene un formato válido", 400);
        }

        // Validamos que la cédula tenga al menos un número
        if (!/[0-9]/.test(cedula)) {
            throw new AppError("La cédula debe contener números", 400);
        }

        // Validamos que el teléfono tenga un formato válido, solo números, espacios y guiones
        const telefonoRegex = /^[0-9\s-]+$/;
        if (!telefonoRegex.test(telefono)) {
            throw new AppError("El teléfono no tiene un formato válido", 400);
        }

        // Validamos que el teléfono tenga al menos un número
        if (!/[0-9]/.test(telefono)) {
            throw new AppError("El teléfono debe contener números", 400);
        }

        // Validamos que el nombre solo tenga letras, espacios y acentos
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nombreRegex.test(nombre)) {
            throw new AppError("El nombre no tiene un formato válido", 400);
        }

        // Traemos el repo que interactúa con la tabla paciente
        const repo = AppDataSource.getRepository(Paciente);

        // Validamos que la cédula no exista en la base de datos
        const pacienteExiste = await repo.findOne({
            where: { cedula }
        });

        if (pacienteExiste) {
            throw new AppError("La cédula ya está registrada", 409);
        }

        // Creamos el paciente
        const paciente = repo.create({
            nombre,
            cedula,
            telefono
        });

        // Guardamos el paciente en la base de datos
        const pacienteGuardado = await repo.save(paciente);

        // Respondemos con el mapper de paciente
        return PacienteMapper.toResponseDto(pacienteGuardado);
    };

    /**
     * Metodo para actualizar un paciente, se pueden actualizar uno o varios datos a la vez
     * @param id 
     * @param paciente 
     * @returns 
     */
    static patchPaciente = async (
        id: string,
        paciente: { nombre?: string; cedula?: string; telefono?: string; estado?: boolean }
    ) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de paciente inválido", 400);
        }

        // Extraemos el id y lo convertimos en número
        const idPaciente = Number(id);

        // Validamos que sea un número válido y positivo
        if (isNaN(idPaciente) || idPaciente <= 0) {
            throw new AppError("Id de paciente inválido", 400);
        }

        // Validamos que el body no venga vacío
        if (!paciente || Object.keys(paciente).length === 0) {
            throw new AppError("Debe enviar al menos un dato para actualizar", 400);
        }

        // Validamos que el nombre sea texto solo si viene en el body
        if (paciente.nombre !== undefined) {
            if (typeof paciente.nombre !== "string") {
                throw new AppError("El nombre debe ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            paciente.nombre = paciente.nombre.trim();

            // Validamos que el nombre no venga vacío
            if (paciente.nombre === "") {
                throw new AppError("El nombre no puede estar vacío", 400);
            }

            // Validamos que el nombre tenga al menos 2 caracteres
            if (paciente.nombre.length < 2) {
                throw new AppError("El nombre debe tener al menos 2 caracteres", 400);
            }

            // Validamos que el nombre no supere los 50 caracteres
            if (paciente.nombre.length > 50) {
                throw new AppError("El nombre no puede superar los 50 caracteres", 400);
            }

            // Validamos que el nombre solo tenga letras, espacios y acentos
            const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!nombreRegex.test(paciente.nombre)) {
                throw new AppError("El nombre no tiene un formato válido", 400);
            }
        }

        // Validamos que la cédula sea texto solo si viene en el body
        if (paciente.cedula !== undefined) {
            if (typeof paciente.cedula !== "string") {
                throw new AppError("La cédula debe ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            paciente.cedula = paciente.cedula.trim();

            // Validamos que la cédula no venga vacía
            if (paciente.cedula === "") {
                throw new AppError("La cédula no puede estar vacía", 400);
            }

            // Validamos que la cédula tenga al menos 5 caracteres
            if (paciente.cedula.length < 5) {
                throw new AppError("La cédula debe tener al menos 5 caracteres", 400);
            }

            // Validamos que la cédula no supere los 50 caracteres
            if (paciente.cedula.length > 50) {
                throw new AppError("La cédula no puede superar los 50 caracteres", 400);
            }

            // Validamos que la cédula tenga un formato válido, solo números y guiones
            const cedulaRegex = /^[0-9-]+$/;
            if (!cedulaRegex.test(paciente.cedula)) {
                throw new AppError("La cédula no tiene un formato válido", 400);
            }

            // Validamos que la cédula tenga al menos un número
            if (!/[0-9]/.test(paciente.cedula)) {
                throw new AppError("La cédula debe contener números", 400);
            }
        }

        // Validamos que el teléfono sea texto solo si viene en el body
        if (paciente.telefono !== undefined) {
            if (typeof paciente.telefono !== "string") {
                throw new AppError("El teléfono debe ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            paciente.telefono = paciente.telefono.trim();

            // Validamos que el teléfono no venga vacío
            if (paciente.telefono === "") {
                throw new AppError("El teléfono no puede estar vacío", 400);
            }

            // Validamos que el teléfono tenga al menos 8 caracteres
            if (paciente.telefono.length < 8) {
                throw new AppError("El teléfono debe tener al menos 8 caracteres", 400);
            }

            // Validamos que el teléfono no supere los 50 caracteres
            if (paciente.telefono.length > 50) {
                throw new AppError("El teléfono no puede superar los 50 caracteres", 400);
            }

            // Validamos que el teléfono tenga un formato válido, solo números, espacios y guiones
            const telefonoRegex = /^[0-9\s-]+$/;
            if (!telefonoRegex.test(paciente.telefono)) {
                throw new AppError("El teléfono no tiene un formato válido", 400);
            }

            // Validamos que el teléfono tenga al menos un número
            if (!/[0-9]/.test(paciente.telefono)) {
                throw new AppError("El teléfono debe contener números", 400);
            }
        }

        // Validamos que el estado sea booleano solo si viene en el body
        if (paciente.estado !== undefined) {
            if (typeof paciente.estado !== "boolean") {
                throw new AppError("El estado debe ser booleano", 400);
            }
        }

        // Traemos el repositorio para interactuar con la base de datos
        const repo = AppDataSource.getRepository(Paciente);

        // Traemos el paciente
        const pacienteExistente = await repo.findOne({
            where: { id: idPaciente }
        });

        // Validamos el paciente
        if (!pacienteExistente) {
            throw new AppError("El paciente no existe", 404);
        }

        // Validamos que la cédula no esté registrada por otro paciente
        if (paciente.cedula !== undefined) {
            const pacienteCedula = await repo.findOne({
                where: {
                    cedula: paciente.cedula,
                    id: Not(idPaciente)
                }
            });

            if (pacienteCedula) {
                throw new AppError("La cédula ya está registrada", 409);
            }
        }

        // Actualizamos el nombre solo si viene en el body
        if (paciente.nombre !== undefined) {
            pacienteExistente.nombre = paciente.nombre;
        }

        // Actualizamos la cédula solo si viene en el body
        if (paciente.cedula !== undefined) {
            pacienteExistente.cedula = paciente.cedula;
        }

        // Actualizamos el teléfono solo si viene en el body
        if (paciente.telefono !== undefined) {
            pacienteExistente.telefono = paciente.telefono;
        }

        // Actualizamos el estado solo si viene en el body
        if (paciente.estado !== undefined) {
            pacienteExistente.estado = paciente.estado;
        }

        // Guardamos el paciente actualizado en la base de datos
        const pacienteActualizado = await repo.save(pacienteExistente);

        // Respondemos con el mapper de paciente
        return PacienteMapper.toResponseDto(pacienteActualizado);
    };


    /**
     * Metodo para eliminar un paciente
     * @param id 
     */
    static deletePaciente = async (id: string) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de paciente inválido", 400);
        }

        // Extraemos el id y lo convertimos en número
        const idPaciente = Number(id);
        // Validamos que sea un número válido y positivo
        if (isNaN(idPaciente) || idPaciente <= 0) {
            throw new AppError("Id de paciente inválido", 400);
        }

        // Traemos el repositorio para interactuar con la base de datos
        const repo = AppDataSource.getRepository(Paciente);

        // Traemos el paciente
        const pacienteExistente = await repo.findOne({
            where: { id: idPaciente }
        });

        // Validamos el paciente
        if (!pacienteExistente) {
            throw new AppError("El paciente no existe", 404);
        }

        pacienteExistente.estado = false;

        // Eliminamos el paciente de la base de datos
        await repo.save(pacienteExistente);
    };
}