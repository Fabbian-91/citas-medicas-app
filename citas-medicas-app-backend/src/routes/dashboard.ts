import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";

//Intancia del router de express para las rutas de usuarios
const ROUTES = Router();

//Rutas para las operaciones CRUD de usuarios
ROUTES.get("/",DashboardController.getDashboardData);


export default ROUTES;