import { AppError } from "../errors/AppError";
import { CitaService } from "../service/CitaService";
import { Request, Response } from "express";

export class CitaController {
    /**
     * Metodo para listar todas las citas y sus relaciones de paciente y medico
     * @param req 
     * @param res 
     * @returns 
     */
    static getAllCitas = async (req: any, res: any) => {
        //Manejar excepciones
        try {
            //Esperamos la respuesta del service para traer todas las citas
            const citas = await CitaService.getAllCitas();

            //Retornamos las citas con su estado
            return res.status(200).json({
                message: "Citas obtenidas",
                data: citas
            });
        } catch (error) {
            //Manejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
    /**
     * Metodo para traer una cita por su id, con sus relaciones de paciente y medico
     * @param req
     * @param res
     * @return
     */
    static getByIdCita = async (req: any, res: any) => {
        //Manejar excepciones
        try {
            //Validamos que el id no venga como un arreglo de caracteres
            if (!req.params.id || Array.isArray(req.params.id)) {
                throw new Error("ID inválido");
            }

            //Esperamos la respuesta del service, y le pasamos el id enviado por parametro
            const cita = await CitaService.getByIdCita(String(req.params.id));

            //Retornamos la cita con su estado
            return res.status(200).json({
                message: "Cita obtenida",
                data: cita
            });

        } catch (error) {
            //Manejo de errores con AppError
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: "Error",
                    error: error.message
                });
            }
            //Manejo de errores internos
            return res.status(500).json({
                message: "Error interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Metodo para crear una nueva cita, se valida que el paciente y el medico existan, y que la fecha sea válida
     * @param req
     * @param res
     * @return
     */
    static postCita = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Destructuramos el body para traer los datos de la cita
            const { pacienteId, medicoId, fecha, hora, motivo, observaciones } = req.body;

            // Esperamos la respuesta del service para crear una nueva cita
            const nuevaCita = await CitaService.postCita(
                pacienteId,
                medicoId,
                fecha,
                hora,
                motivo,
                observaciones
            );

            // Retornamos la nueva cita con su estado
            return res.status(201).json({
                message: "Cita creada",
                data: nuevaCita
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
    };

    /**
     * Metodo para actualizar una cita, se valida que la cita exista, y que la fecha sea válida
     * @param req 
     * @param res 
     * @returns 
     */
    static patchCita = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Destructuramos los parámetros para extraer el id
            const { id } = req.params;

            // Destructuramos el body para traer los datos a actualizar
            const { fecha, hora, motivo, observaciones, estado } = req.body;

            // Esperamos la respuesta del patch del service
            const citaActualizada = await CitaService.patchCita(String(id), {
                fecha,
                hora,
                motivo,
                observaciones,
                estado
            });

            // Retornamos la cita actualizada con su estado
            return res.status(200).json({
                message: "Cita actualizada correctamente",
                data: citaActualizada
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

    /**
     * Metodo para eliminar una cita, se valida que la cita exista
     * @param req
     * @param res
     * @return
     */
    static deleteCita = async (req: Request, res: Response) => {
        // Manejar excepciones
        try {
            // Validamos que el id no venga como un arreglo de caracteres
            if (!req.params.id || Array.isArray(req.params.id)) {
                throw new AppError("ID inválido", 400);
            }

            // Esperamos la respuesta del service para eliminar la cita
            await CitaService.deleteCita(String(req.params.id));

            // Retornamos un mensaje de éxito
            return res.status(200).json({
                message: "Cita eliminada correctamente"
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
    };
}