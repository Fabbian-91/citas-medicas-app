import { AppDataSource } from "../config/data-source";
import { Medico } from "../entities/Medico";
import { AppError } from "../errors/AppError";
import { MedicoMapper } from "../mappers/MedicoMapper";

export class MedicoService {
    /**
     * Metodo para listar todos los medicos
     * @returns 
     */
    static getAllMedicos = async () => {
        // Traemos el repositorio para interactuar con la tabla medico
        const repo = AppDataSource.getRepository(Medico);
        // Listamos todos los medicos que tengan un estado activo
        const medicos = await repo.find({where:{estado:true}});
        // Retornamos la lista de medicos mapeada a su responseDto
        return MedicoMapper.toResponseDtoList(medicos);
    }

    /**
     * Metodo para obtener un medico por su id  
     * @param id
     * @return
     */
    static getByIdMedico = async (id: string | null) => {
        // Validamos que el id no venga vacio
        if (!id || id.trim() === "") {
            throw new AppError("Id de medico inválido", 400);
        }

        // Extraemos el id lo combertimos en number
        const idMedico = Number(id);
        // Validamos que se un número
        if (isNaN(idMedico)) {
            throw new AppError("Id de medico inválido", 400);
        }

        // Traemos el repositorio para interactuar con la tabla medico
        const repo = AppDataSource.getRepository(Medico);
        // Obtenemos el medico por su id
        const medico = await repo.findOneBy({ id: idMedico });
        // Validamos que el medico exista
        if (!medico) {
            throw new AppError("Médico no encontrado", 404);
        }
        // Retornamos el medico mapeado a su responseDto
        return MedicoMapper.toResponseDto(medico);
    }

    /**
    * Metodo para crear un nuevo medico
    * @param nombre 
    * @param especialidad 
    */
    static postMedico = async (nombre: string, especialidad: string) => {

        // Validamos que ninguno de los datos enviados por el body venga vacío, null o undefined
        if (!nombre || !especialidad) {
            throw new AppError("Nombre y especialidad son obligatorios", 400);
        }

        // Validamos que el nombre sea texto
        if (typeof nombre !== "string") {
            throw new AppError("El nombre debe ser texto", 400);
        }

        // Validamos que la especialidad sea texto
        if (typeof especialidad !== "string") {
            throw new AppError("La especialidad debe ser texto", 400);
        }

        // Limpiamos espacios al inicio y al final
        nombre = nombre.trim();
        especialidad = especialidad.trim();

        // Validamos que el nombre no venga vacío
        if (nombre === "") {
            throw new AppError("El nombre no puede estar vacío", 400);
        }

        // Validamos que la especialidad no venga vacía
        if (especialidad === "") {
            throw new AppError("La especialidad no puede estar vacía", 400);
        }

        // Validamos que el nombre tenga al menos 2 caracteres
        if (nombre.length < 2) {
            throw new AppError("El nombre debe tener al menos 2 caracteres", 400);
        }

        // Validamos que la especialidad tenga al menos 3 caracteres
        if (especialidad.length < 3) {
            throw new AppError("La especialidad debe tener al menos 3 caracteres", 400);
        }

        // Validamos que el nombre no supere los 50 caracteres
        if (nombre.length > 50) {
            throw new AppError("El nombre no puede superar los 50 caracteres", 400);
        }

        // Validamos que la especialidad no supere los 50 caracteres
        if (especialidad.length > 50) {
            throw new AppError("La especialidad no puede superar los 50 caracteres", 400);
        }

        // Validamos que el nombre solo tenga letras, espacios y acentos
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nombreRegex.test(nombre)) {
            throw new AppError("El nombre no tiene un formato válido", 400);
        }

        // Validamos que la especialidad solo tenga letras, espacios y acentos
        const especialidadRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!especialidadRegex.test(especialidad)) {
            throw new AppError("La especialidad no tiene un formato válido", 400);
        }

        // Traemos el repositorio para interactuar con la tabla medico
        const repo = AppDataSource.getRepository(Medico);

        // Creamos una nueva instancia de medico
        const nuevoMedico = repo.create({
            nombre,
            especialidad
        });

        // Guardamos el nuevo medico en la base de datos
        const medicoGuardado = await repo.save(nuevoMedico);

        // Respondemos con el mapper de medico
        return MedicoMapper.toResponseDto(medicoGuardado);
    };

    /**
 * Metodo para actualizar un medico por su id
 * @param id 
 * @param medico 
 */
    static patchMedico = async (
        id: string,
        medico: { nombre?: string; especialidad?: string; estado?: boolean }
    ) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de médico inválido", 400);
        }

        // Extraemos el id y lo convertimos en número
        const idMedico = Number(id);

        // Validamos que sea un número válido y positivo
        if (isNaN(idMedico) || idMedico <= 0) {
            throw new AppError("Id de médico inválido", 400);
        }

        // Validamos que el body no venga vacío
        if (!medico || Object.keys(medico).length === 0) {
            throw new AppError("Debe enviar al menos un dato para actualizar", 400);
        }

        // Validamos que el nombre sea texto solo si viene en el body
        if (medico.nombre !== undefined) {
            if (typeof medico.nombre !== "string") {
                throw new AppError("El nombre debe ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            medico.nombre = medico.nombre.trim();

            // Validamos que el nombre no venga vacío
            if (medico.nombre === "") {
                throw new AppError("El nombre no puede estar vacío", 400);
            }

            // Validamos que el nombre tenga al menos 2 caracteres
            if (medico.nombre.length < 2) {
                throw new AppError("El nombre debe tener al menos 2 caracteres", 400);
            }

            // Validamos que el nombre no supere los 50 caracteres
            if (medico.nombre.length > 50) {
                throw new AppError("El nombre no puede superar los 50 caracteres", 400);
            }

            // Validamos que el nombre solo tenga letras, espacios y acentos
            const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!nombreRegex.test(medico.nombre)) {
                throw new AppError("El nombre no tiene un formato válido", 400);
            }
        }

        // Validamos que la especialidad sea texto solo si viene en el body
        if (medico.especialidad !== undefined) {
            if (typeof medico.especialidad !== "string") {
                throw new AppError("La especialidad debe ser texto", 400);
            }

            // Limpiamos espacios al inicio y al final
            medico.especialidad = medico.especialidad.trim();

            // Validamos que la especialidad no venga vacía
            if (medico.especialidad === "") {
                throw new AppError("La especialidad no puede estar vacía", 400);
            }

            // Validamos que la especialidad tenga al menos 3 caracteres
            if (medico.especialidad.length < 3) {
                throw new AppError("La especialidad debe tener al menos 3 caracteres", 400);
            }

            // Validamos que la especialidad no supere los 50 caracteres
            if (medico.especialidad.length > 50) {
                throw new AppError("La especialidad no puede superar los 50 caracteres", 400);
            }

            // Validamos que la especialidad solo tenga letras, espacios y acentos
            const especialidadRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!especialidadRegex.test(medico.especialidad)) {
                throw new AppError("La especialidad no tiene un formato válido", 400);
            }
        }

        // Validamos que el estado sea booleano solo si viene en el body
        if (medico.estado !== undefined) {
            if (typeof medico.estado !== "boolean") {
                throw new AppError("El estado debe ser verdadero o falso", 400);
            }
        }

        // Traemos el repositorio para interactuar con la tabla medico
        const repo = AppDataSource.getRepository(Medico);

        // Obtenemos el medico por su id
        const medicoExistente = await repo.findOneBy({ id: idMedico });

        // Validamos que el medico exista
        if (!medicoExistente) {
            throw new AppError("Médico no encontrado", 404);
        }

        // Actualizamos el nombre solo si viene en el body
        if (medico.nombre !== undefined) {
            medicoExistente.nombre = medico.nombre;
        }

        // Actualizamos la especialidad solo si viene en el body
        if (medico.especialidad !== undefined) {
            medicoExistente.especialidad = medico.especialidad;
        }

        // Actualizamos el estado solo si viene en el body
        if (medico.estado !== undefined) {
            medicoExistente.estado = medico.estado;
        }

        // Guardamos los cambios en la base de datos
        const medicoActualizado = await repo.save(medicoExistente);

        // Respondemos con el mapper de medico
        return MedicoMapper.toResponseDto(medicoActualizado);
    };

    /**
     * Metodo para eliminar un medico por su id
     * @param idMedico 
     */
    static deleteMedico = async (idMedico: string) => {
        // Validamos que el id no venga vacío
        if (!idMedico || idMedico.trim() === "") {
            throw new AppError("Id de médico inválido", 400);
        }
        // Extraemos el id y lo convertimos en número
        const id = Number(idMedico);
        
        // Validamos que sea un número válido y positivo
        if (isNaN(id) || id <= 0) {
            throw new AppError("Id de médico inválido", 400);
        }
        // Traemos el repositorio para interactuar con la tabla medico
        const repo = AppDataSource.getRepository(Medico);

        // Obtenemos el medico por su id
        const medicoExistente = await repo.findOneBy({ id });

        // Validamos que el medico exista
        if (!medicoExistente) {
            throw new AppError("Médico no encontrado", 404);
        }

        //Cambiamos el estado del medico a false para eliminarlo de forma lógica
        medicoExistente.estado = false;

        // Guardamos los cambios en la base de datos
        await repo.save(medicoExistente);

        // Respondemos con el mapper de medico
        return MedicoMapper.toResponseDto(medicoExistente);
    }
}