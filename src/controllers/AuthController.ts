import { AppError } from "../errors/AppError";
import { AuthService } from "../service/AuthService";

export class AuthController {
    /**
     * Metodo para el login de usuarios
     * @param req 
     * @param res 
     * @returns 
     */
    static login = async (req: any, res: any) => {
        //Manejar excepciones
        try {
            //Desestructuramos los datos del body
            const { email, password } = req.body;

            //Esperamos la respuesta del service para el login, 
            const token = await AuthService.login(email, password);

            //retornamos el token generado con su estado
            return res.status(200).json({
                message: "Login exitoso",
                token: token
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
}