import { Router } from "express";
import { validateRequest } from "../middlewares/validatedRquest";
import { IdParamDto } from "../dto/id/IdParamDto";
import { PacienteController } from "../controllers/PacienteController";
import { MedicoController } from "../controllers/MedicoController";
import { CreateMedicoDto } from "../dto/medicos/CreateMedicoDto";


const ROUTES = Router();

ROUTES.get("/", MedicoController.getAllMedicos);
ROUTES.get("/:id", validateRequest({ params: IdParamDto }), MedicoController.getByIdMedico);
ROUTES.post("/", validateRequest({ body: CreateMedicoDto}), MedicoController.postMedico);
ROUTES.patch("/:id", validateRequest({ body: CreateMedicoDto, params: IdParamDto }), MedicoController.patchMedico);
ROUTES.delete(
    "/:id",
    validateRequest({ params: IdParamDto }),
    PacienteController.deletePaciente
);

export default ROUTES;