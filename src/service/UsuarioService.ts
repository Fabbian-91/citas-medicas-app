import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../config/data-source"
import { Usuario } from "../entities/Usuario"
import { UsuarioMapper } from "../mappers/UsuarioMapper";
import { AppError } from "../errors/AppError";
import { userRole } from "../enum/Rol.enum";

export class UsuarioService {

    /**
     * Metodo para listar todos los Usuarios
     * @returns 
     */
    static getAll = async () => {
        //Traermos el repository para interacturar con la tabla usuario
        const repo = AppDataSource.getRepository(Usuario);

        //Listamos todos los usarios que tengan un estado activo
        const usuarios = await repo.find({ where: { estado: true } })

        //Devolvemos una lista con los datos mapeados
        return UsuarioMapper.toResposeDtoList(usuarios);
    }

    /**
     * Metodo para optener el usuario por id
     */
    static getById = async (id: string | null) => {
        //validamos que el id no venga vacio
        if (!id || id.trim() === "") {
            throw new AppError("Id de usuario inválido", 400);
        }

        //Extraemos el id lo combertimos en number
        const idUsuario = Number(id);

        //Validamos que se un número
        if (isNaN(idUsuario)) {
            throw new AppError("Id de usuario inválido", 400);
        }

        //Traemos el repo para interactura con la base de datos
        const repo = AppDataSource.getRepository(Usuario);

        //Treamos el usuario
        const usuario = await repo.findOne({ where: { id: idUsuario } });

        //Validamos el usuario
        if (!usuario) {
            throw new AppError("El usurio no existe", 404);
        }

        //Repondemos con el mapper de usuario
        return UsuarioMapper.toResponseDto(usuario);
    }

    static postUsuario = async (email: string, password: string, role: userRole) => {
        // Validamos que ningún dato venga vacío, null o undefined
        if (!email || !password || !role) {
            throw new AppError("Email, password y role son obligatorios", 400);
        }

        // Validamos que el email sea texto
        if (typeof email !== "string") {
            throw new AppError("El email debe ser texto", 400);
        }

        // Validamos que la password sea texto
        if (typeof password !== "string") {
            throw new AppError("La password debe ser texto", 400);
        }

        // Limpiamos espacios al inicio y al final del email
        email = email.trim().toLowerCase();

        // Limpiamos espacios al inicio y al final de la password
        password = password.trim();

        // Validamos que el email no venga vacío
        if (email === "") {
            throw new AppError("El email no puede estar vacío", 400);
        }

        // Validamos que la password no venga vacía
        if (password === "") {
            throw new AppError("La password no puede estar vacía", 400);
        }

        // Validamos que email tenga formato de email
        if (!email.includes("@")) {
            throw new AppError("El email no es válido", 400);
        }

        // Validamos que la contraseña tenga más de 6 caracteres
        if (password.length < 6) {
            throw new AppError("La contraseña debe tener al menos 6 caracteres", 400);
        }

        // Validamos que el role sea un rol válido
        if (!Object.values(userRole).includes(role)) {
            throw new AppError("El role debe ser un rol válido", 400);
        }

        // Traemos el repo que interactúa con la tabla usuario
        const repo = AppDataSource.getRepository(Usuario);

        // Validamos si el usuario ya existe
        const usuarioExiste = await repo.findOne({
            where: { email }
        });

        if (usuarioExiste) {
            throw new AppError("El email ya está registrado", 409);
        }

        // Generamos el usuario con los datos por parámetro
        const usuario = repo.create({
            email,
            password,
            role
        });

        // Guardamos el nuevo usuario
        const usuarioGuardado = await repo.save(usuario);

        // Mapeamos el usuario y se lo devolvemos al controlador
        return UsuarioMapper.toResponseDto(usuarioGuardado);
    };

    static patchUsuario = async (
        id: string,
        usuario: { email?: string; password?: string; role?: userRole }
    ) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de usuario inválido", 400);
        }

        // Extraemos el id y lo convertimos en number
        const idUsuario = Number(id);

        // Validamos que sea un número válido y positivo
        if (isNaN(idUsuario) || idUsuario <= 0) {
            throw new AppError("Id de usuario inválido", 400);
        }

        // Validamos que el body no venga vacío
        if (!usuario || Object.keys(usuario).length === 0) {
            throw new AppError("Debe enviar al menos un dato para actualizar", 400);
        }

        // Validamos que email tenga formato de email solo si viene en el body
        if (usuario.email !== undefined) {
            if (usuario.email.trim() === "") {
                throw new AppError("El email no puede estar vacío", 400);
            }

            if (!usuario.email.includes("@")) {
                throw new AppError("El email no es válido", 400);
            }
        }

        // Validamos que la contraseña tenga más de 6 caracteres solo si viene en el body
        if (usuario.password !== undefined) {
            if (usuario.password.trim() === "") {
                throw new AppError("La contraseña no puede estar vacía", 400);
            }

            if (usuario.password.length < 6) {
                throw new AppError("La contraseña debe tener al menos 6 caracteres", 400);
            }
        }

        // Validamos que el role sea un rol válido solo si viene en el body
        if (usuario.role !== undefined) {
            if (!Object.values(userRole).includes(usuario.role)) {
                throw new AppError("El role debe ser un rol válido", 400);
            }
        }

        // Traemos el repo que interactúa con la tabla usuario
        const repo = AppDataSource.getRepository(Usuario);

        // Validamos si el usuario existe
        const usuarioExiste = await repo.findOne({
            where: { id: idUsuario }
        });

        if (!usuarioExiste) {
            throw new AppError("El usuario no existe", 404);
        }

        // Validamos que el email no esté registrado por otro usuario
        if (usuario.email !== undefined) {
            const usuarioEmail = await repo.findOne({
                where: {
                    email: usuario.email,
                    id: Not(idUsuario)
                }
            });

            if (usuarioEmail) {
                throw new AppError("El email ya está registrado", 409);
            }

            // Actualizamos el email
            usuarioExiste.email = usuario.email;
        }

        // Actualizamos la contraseña solo si viene en el body
        if (usuario.password !== undefined) {
            usuarioExiste.password = usuario.password;
        }

        // Actualizamos el role solo si viene en el body
        if (usuario.role !== undefined) {
            usuarioExiste.role = usuario.role;
        }

        // Guardamos el usuario actualizado
        const usuarioActualizado = await repo.save(usuarioExiste);

        // Mapeamos el usuario y se lo devolvemos al controlador
        return UsuarioMapper.toResponseDto(usuarioActualizado);
    };

    static deleteUsuario = async (id: string) => {
        // Validamos que el id no venga vacío
        if (!id || id.trim() === "") {
            throw new AppError("Id de usuario inválido", 400);
        }

        // Extraemos el id y lo convertimos en number
        const idUsuario = Number(id);
        // Validamos que sea un número válido y positivo
        if (isNaN(idUsuario) || idUsuario <= 0) {
            throw new AppError("Id de usuario inválido", 400);
        }

        // Traemos el repo que interactúa con la tabla usuario
        const repo = AppDataSource.getRepository(Usuario);

        // Validamos si el usuario existe
        const usuarioExiste = await repo.findOne({
            where: { id: idUsuario }
        });
        if (!usuarioExiste) {
            throw new AppError("El usuario no existe", 404);
        }
        // Cambiamos el estado del usuario a false para eliminarlo lógicamente
        usuarioExiste.estado = false;

        // Guardamos el usuario actualizado
        await repo.save(usuarioExiste);
    }
}