import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateRequest } from "../middlewares/validatedRquest";
import { loginDto } from "../dto/auth/LoginDto";

//Intancia del router de express para las rutas de autenticación
const ROUTES = Router();

//Ruta para el login de usuarios
ROUTES.post("/login",validateRequest({body:loginDto}),AuthController.login);

export default ROUTES;