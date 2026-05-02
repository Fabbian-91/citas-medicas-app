import { DashboardService } from "../service/DashboardService";
import { Request,Response } from "express";

export class DashboardController {

    static getDashboardData = async (req: Request, res: Response) => {
        //Manejar excepciones
        try {
            //Esperamos la respuesta del service para traer todas las citas
            const data = await DashboardService.getDashboardData();

            //Retornamos las citas con su estado
            return res.status(200).json({
                message: "Dashboard data obtenido correctamente",
                data: data
            });
        } catch (error) {
            //Manejo de errores internos
            return res.status(500).json({
                message: "Error interno al obtener datos del dashboard",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}