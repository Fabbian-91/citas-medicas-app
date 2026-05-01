import { AppDataSource } from "../config/data-source";
import { AppError } from "../errors/AppError";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import config from "../config/config";
import { Usuario } from "../entities/Usuario";

export class AuthService {
    /**
    * Metodo para el login de usuarios, se valida el email y password, si son correctos se genera un token JWT
    * @param email
    * @param password 
    * @returns token JWT
    */
    static login = async (email: string, password: string) => {
        // Validamos que los datos no vengan vacíos, null o undefined
        if (!email || !password) {
            throw new AppError("Email y password son obligatorios", 400);
        }

        // Validamos que el email sea texto
        if (typeof email !== "string") {
            throw new AppError("El email debe ser texto", 400);
        }

        // Validamos que la password sea texto
        if (typeof password !== "string") {
            throw new AppError("La password debe ser texto", 400);
        }

        // Quitamos espacios en vacios
        const user = email.trim().toLowerCase();
        const pass = password.trim();

        // Validamos que el email no venga vacío
        if (user === "") {
            throw new AppError("El email no puede estar vacío", 400);
        }

        // Validamos que la password no venga vacía
        if (pass === "") {
            throw new AppError("La password no puede estar vacía", 400);
        }

        // Validamos que email tenga formato de email
        if (!user.includes("@")) {
            throw new AppError("El email no es válido", 400);
        }

        // Traemos el repo que interactua con la tabla usuario
        const repo = AppDataSource.getRepository(Usuario);

        // Validamos que el usuario exista y esté activo
        const userActive = await repo.findOne({
            where: {
                email: user,
                estado: true
            }
        });

        // Validamos que el usuario exista
        if (!userActive) {
            throw new AppError("Usuario o contraseña inválidos", 401);
        }

        // Validamos que la contraseña sea correcta
        const passwordOk = bcrypt.compareSync(pass, userActive.password);

        if (!passwordOk) {
            throw new AppError("Usuario o contraseña inválidos", 401);
        }

        // Generamos el token JWT
        const token = jwt.sign(
            {
                id: userActive.id,
                email: userActive.email,
                role: userActive.role
            },
            config.jwtSecret,
            { expiresIn: "3m" }
        );

        // Generamos el token completo con el role y los datos del usuario
        const tokenCompleto = {
            token: token,
            role: userActive.role,
            user: {
                id: userActive.id,
                email: userActive.email
            }
        };

        // Retornamos el token completo
        return tokenCompleto;
    };
}