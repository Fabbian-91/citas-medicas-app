import { NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Usuario } from "../entities/Usuario";

/**
 * Metodo para verificar si el usuario tiene el rol permitido para acceder a la ruta
 * @param rolesPermitidos 
 * @returns 
 */
export const checkRole = (rolesPermitidos: string[]) => {
  return async (req: any, res: any, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "No autorizado: userId no encontrado" });
    }

    const repo = AppDataSource.getRepository(Usuario);
    const user = await repo.findOneBy({ id: userId });

    if (!user) {
      return res.status(401).json({ message: "No autorizado: usuario no existe" });
    }

    if (!rolesPermitidos.includes(user.role)) {
      return res.status(403).json({ message: "No autorizado: rol insuficiente" });
    }
    
    //Le indicamos next para que continue con la siguiente función
    next();
  };
};