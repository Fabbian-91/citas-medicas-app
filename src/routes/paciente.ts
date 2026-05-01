import { Router } from "express";
import { validateRequest } from "../middlewares/validatedRquest";
import { IdParamDto } from "../dto/id/IdParamDto";
import { PacienteController } from "../controllers/PacienteController";
import { CreatePacienteDto } from "../dto/pacientes/CreatePacienteDto";


const ROUTES = Router();

ROUTES.get("/", PacienteController.getAllPacientes);
ROUTES.get("/:id", validateRequest({ params: IdParamDto }), PacienteController.getByIdPaciente);
ROUTES.post("/", validateRequest({ body: CreatePacienteDto}), PacienteController.postPaciente);
ROUTES.patch("/:id", validateRequest({ body: CreatePacienteDto, params: IdParamDto }), PacienteController.patchPaciente);
ROUTES.delete(
    "/:id",
    validateRequest({ params: IdParamDto }),
    PacienteController.deletePaciente
);

export default ROUTES;