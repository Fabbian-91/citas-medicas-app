import { Request, Response } from "express";
import { MedicoService } from "../service/MedicoService";
import { AppError } from "../errors/AppError";

export class MedicoController {
    /**
     * Metodo para listar todos los medicos
     * @param req 
     * @param res 
     * @returns 
     */
    static getAllMedicos = async (req: any, res: any) => {
        // Manejar excepciones
        try {
            // Esperamos la respuesta del service para listar todos los medicos
            const medicos = await MedicoService.getAllMedicos();

            // Retornamos el Response con los datos devueltos del service
            return res.status(200).json({
                message: "Ok",
                data: medicos
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Metodo para obtener un medico por su id  
     * @param req
     * @param res
     * @returns 
     */
    static getByIdMedico = async (req: any, res: any) => {
        // Manejar excepciones
        try {
            // Validamos que el id no venga como un arreglo de caracteres
            if (!req.params.id || Array.isArray(req.params.id)) {
                throw new AppError("ID inválido", 400);
            }
            // Esperamos la respuesta del service, y le pasamos el id enviado por parametro
            const medico = await MedicoService.getByIdMedico(String(req.params.id));
            // Retornamos el medico con su estado
            return res.status(200).json({
                message: "Ok",
                data: medico
            });
        } catch (error) {
            // Manejo de errores con AppError
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: "Error",
                    error: error.message
                });
            }

            // Manejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Metodo para crear un nuevo medico
     * @param req
     * @param res
     * @returns 
     */
    static postMedico = async (req: any, res: any) => {
        // Manejar excepciones
        try {
            const { nombre, especialidad } = req.body;

            // Esperamos la respuesta del service para crear un nuevo medico, y le pasamos el body de la solicitud
            const medico = await MedicoService.postMedico(nombre, especialidad);

            // Retornamos el medico creado con su estado
            return res.status(201).json({
                message: "Médico creado",
                data: medico
            });

        } catch (error) {
            // Manejo de errores con AppError
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: "Error",
                    error: error.message
                });
            }
            // Manejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Metodo para acutualizar un medico por su id
     * @param req 
     * @param res
     * @return
     * */
    static patchMedico = async (req: any, res: any) => {
        // Manejar excepciones
        try {
            // Validamos que el id no venga como un arreglo de caracteres
            if (!req.params.id || Array.isArray(req.params.id)) {
                throw new AppError("ID inválido", 400);
            }

            // Extraemos el id enviado por parametro y lo convertimos en string
            const idMedico = String(req.params.id);

            // Desestructuramos los datos del body
            const { nombre, especialidad, estado } = req.body;

            // Esperamos la respuesta del service para actualizar un medico
            const medico = await MedicoService.patchMedico(idMedico, { nombre, especialidad, estado });

            // Retornamos el medico actualizado con su estado
            return res.status(200).json({
                message: "Médico actualizado",
                data: medico
            });
        } catch (error) {
            // Manejo de errores con AppError
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: "Error",
                    error: error.message
                });
            }
            // Manejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Metodo para eliminar un medico por su id
     * @param req
     * @param res
     * @return
     */
    static deleteMedico = async (req: any, res: any) => {
        // Manejar excepciones
        try {
            // Validamos que el id no venga como un arreglo de caracteres
            if (!req.params.id || Array.isArray(req.params.id)) {
                throw new AppError("ID inválido", 400);
            }

            // Extraemos el id enviado por parametro y lo convertimos en string
            const idMedico = String(req.params.id);

            // Esperamos la respuesta del service para eliminar un medico   
            await MedicoService.deleteMedico(idMedico);

            // Retornamos un mensaje de éxito
            return res.status(200).json({
                message: "Médico eliminado"
            });
        } catch (error) {

            // Manejo de errores con AppError
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: "Error",
                    error: error.message
                });
            }
            // Manejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

}