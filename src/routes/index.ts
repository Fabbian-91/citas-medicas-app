import { Router } from "express";
import auth from "./auth";
import usuario from "./usuario";
import paciente from "./paciente";
import medico from "./medico";
import cita from "./cita";

//Intancia del router principal de express para las rutas de la aplicación
const ROUTES = Router();
//Uso de las rutas de autenticación, usuarios, pacientes, medicos y citas
ROUTES.use("/auth", auth);
ROUTES.use("/usuarios", usuario);
ROUTES.use("/pacientes", paciente);
ROUTES.use("/medicos", medico);
ROUTES.use("/citas", cita);


export default ROUTES;
