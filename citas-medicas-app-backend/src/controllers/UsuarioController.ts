import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";
import { AppError } from "../errors/AppError";
import { userRole } from "../enum/Rol.enum";


export class UsuarioController {
    /**
     * Metodo del controlador para obtener todo los usuarios
     * @param req 
     * @param res 
     * @returns 
     */
    static getAllUsuarios = async (req: Request, res: Response) => {
        //Manejar excepciones
        try {
            //Esperamos la repuestas de el metodo de listar todos los usurios del service
            const usuarios = await UsuarioService.getAll();

            //Retornamos el Reponse con los datos devueltos del service
            return res.status(200).json({
                message: "Ok",
                data: usuarios
            })

        } catch (error) {
            //Maenejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Metodo del controlador para obtener un usuario por su id
     * @param req 
     * @param res 
     */
    static getByIdUsuario = async (req: Request, res: Response) => {
        //Manejar excepciones
        try {
            //Validamos que el id no venga como un arreglo de caracters
            if (Array.isArray(req.params.id)) {
                //Generamos exepcion
                throw new AppError("Id de usuario inválido", 400);
            }

            //Esperamos repuesta del service, y le pasamos el id enviado por parametro
            const usuario = await UsuarioService.getById(String(req.params.id));

            //Retornamos el usurio con su estado
            return res.status(200).json({
                message: "Ok",
                data: usuario
            });

        } catch (error) {
            //Validamos si el error es intancia de appErro
            if (error instanceof AppError) {
                //Repondemos el error deacuerdo a clase
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }
            //Maenejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Metodo del controller para crear un núevo usuario
     * @param req 
     * @param res 
     * @returns 
     */
    static postUsuario = async (req: Request, res: Response) => {
        //Manejar exepciones
        try {
            //Destructuramos el body para traer los datos de núevo usuario
            const { email, password, role } = req.body;

            //Esperamos al resupuesta del post del service
            const usuarioCreado = await UsuarioService.postUsuario(email, password, role as userRole);

            //Retornamos el usurio con su estado
            return res.status(201).json({
                message: "Usuario creado correctamente",
                data: usuarioCreado
            });

        } catch (error) {
            //Validamos si el error es intancia de appErro
            if (error instanceof AppError) {
                //Repondemos el error deacuerdo a clase
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }
            //Maenejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
 * Metodo del controller para actualizar un usuario
 * @param req 
 * @param res 
 * @returns 
 */
    static patchUsuario = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Destructuramos los parámetros para extraer el id
            const { id } = req.params;

            // Destructuramos el body para traer los datos a actualizar
            const { email, password, role } = req.body;

            // Esperamos la respuesta del patch del service
            const usuarioActualizado = await UsuarioService.patchUsuario(String(id), {
                email,
                password,
                role: role as userRole
            });

            // Retornamos el usuario actualizado con su estado
            return res.status(200).json({
                message: "Usuario actualizado correctamente",
                data: usuarioActualizado
            });

        } catch (error) {
            // Validamos si el error es instancia de AppError
            if (error instanceof AppError) {
                // Respondemos el error de acuerdo a la clase
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            // Manejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    };

    static deleteUsuario = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Destructuramos los parámetros para extraer el id
            const { id } = req.params;
            // Esperamos la respuesta del delete del service
            await UsuarioService.deleteUsuario(String(id));
            // Retornamos un mensaje de éxito
            return res.status(200).json({
                message: "Usuario eliminado correctamente",
            });
        } catch (error) {
            // Validamos si el error es instancia de AppError
            if (error instanceof AppError) {
                // Respondemos el error de acuerdo a la clase
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }
            // Manejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    };
}