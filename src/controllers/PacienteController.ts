import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { PacienteService } from "../service/PacienteService";


export class PacienteController {
    /**
     * Metodo para listar todos los pacientes
     * @param req 
     * @param res 
     */
    static getAllPacientes = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Esperamos la respuesta del service para listar todos los pacientes
            const pacientes = await PacienteService.getAllPacientes();

            // Retornamos el Response con los datos devueltos del service
            return res.status(200).json({
                message: "Ok",
                data: pacientes
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });

        }

    }

    /**
     * Meoto para obtener un paciente por su id
     * @param req 
     * @param res 
     */
    static getByIdPaciente = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Validamos que el id no venga como un arreglo de caracteres
            if (!req.params.id || Array.isArray(req.params.id)) {
                throw new AppError("ID inválido", 400);
            }
            // Esperamos la respuesta del service, y le pasamos el id enviado por parametro
            const paciente = await PacienteService.getByIdPaciente(String(req.params.id));
            // Retornamos el paciente con su estado
            return res.status(200).json({
                message: "Ok",
                data: paciente
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
     * Metodo para crear un nuevo paciente
     * @param req 
     * @param res 
     */
    static postPaciente = async (req: Request, res: Response) => {
        try {
            // Desestructuramos los datos del body
            const { nombre, cedula, telefono } = req.body;

            const paciente = await PacienteService.postPaciente(nombre, cedula, telefono);

            // Retornamos el paciente creado con su estado
            return res.status(201).json({
                message: "Paciente creado",
                data: paciente
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
     * Metodo para actualizar un paciente
     * @param req 
     * @param res 
     */
    static patchPaciente = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Validamos que el id no venga como un arreglo de caracteres
            if (!req.params.id || Array.isArray(req.params.id)) {
                throw new AppError("ID inválido", 400);
            }
            // Desestructuramos los datos del body
            const { nombre, cedula, telefono, estado } = req.body;

            // Esperamos la respuesta del service para actualizar el paciente, y le pasamos el id enviado por parametro y los datos del body
            const pacienteActualizado = await PacienteService.patchPaciente(String(req.params.id), { nombre, cedula, telefono, estado });
            
            // Retornamos el paciente actualizado con su estado
            return res.status(200).json({
                message: "Paciente actualizado",
                data: pacienteActualizado
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
     * Metodo para eliminar un paciente
     * @param req 
     * @param res 
     * @returns
     */
    static deletePaciente = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Validamos que el id no venga como un arreglo de caracteres
            if (!req.params.id || Array.isArray(req.params.id)) {
                throw new AppError("ID inválido", 400);
            }

            // Esperamos la respuesta del service para eliminar el pacienteo
            await PacienteService.deletePaciente(String(req.params.id));

            // Retornamos un mensaje de paciente eliminado
            return res.status(200).json({
                message: "Paciente eliminado"
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