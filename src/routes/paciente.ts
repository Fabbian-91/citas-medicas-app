import { Router } from "express";
import { validateRequest } from "../middlewares/validatedRquest";
import { IdParamDto } from "../dto/id/IdParamDto";
import { PacienteController } from "../controllers/PacienteController";
import { CreatePacienteDto } from "../dto/pacientes/CreatePacienteDto";
import { UpdatePacienteDto } from "../dto/pacientes/UpdatePacienteDto";

//Instacia del router de express para las rutas de pacientes
const ROUTES = Router();

//Rutas para las operaciones CRUD de pacientes
ROUTES.get("/", PacienteController.getAllPacientes);
ROUTES.get("/:id", validateRequest({ params: IdParamDto }), PacienteController.getByIdPaciente);
ROUTES.post("/", validateRequest({ body: CreatePacienteDto}), PacienteController.postPaciente);
ROUTES.patch("/:id", validateRequest({ body: UpdatePacienteDto, params: IdParamDto }), PacienteController.patchPaciente);
ROUTES.delete(
    "/:id",
    validateRequest({ params: IdParamDto }),
    PacienteController.deletePaciente
);

export default ROUTES;