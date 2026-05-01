import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";

/**
 * Middleware para verificar el token JWT en las rutas protegidas
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    // Extraemos el token del header Authorization
    const authHeader = req.headers.authorization;

    // Validamos que el header exista y tenga el formato correcto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No autorizado: falta Bearer token",
        });
    }

    // Extraemos el token del header
    const token = authHeader.split(" ")[1];

    //Validamos que el token exista
    if (!token) {
        return res.status(401).json({
            message: "No autorizado: falta el token",
        });
    }

    //Manejamos excepciones al verificar el token
    try {
        // Verificamos el token con la clave secreta y si es válido, continuamos con la siguiente función
        jwt.verify(token, config.jwtSecret);
        return next();
    } catch (error) {
        // Si el token es inválido o ha expirado, respondemos con un error de no autorizado
        return res.status(401).json({
            message: "No autorizado: token vencido o incorrecto",
        });
    }
};