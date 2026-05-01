import { Router } from "express";
import { validateRequest } from "../middlewares/validatedRquest";
import { IdParamDto } from "../dto/id/IdParamDto";
import { PacienteController } from "../controllers/PacienteController";
import { MedicoController } from "../controllers/MedicoController";
import { CreateMedicoDto } from "../dto/medicos/CreateMedicoDto";
import { UpdateMedicoDto } from "../dto/medicos/UpdateMedicoDto";

//Intancia del router de express para las rutas de medicos
const ROUTES = Router();

//Rutas para las operaciones CRUD de medicos
ROUTES.get("/", MedicoController.getAllMedicos);
ROUTES.get("/:id", validateRequest({ params: IdParamDto }), MedicoController.getByIdMedico);
ROUTES.post("/", validateRequest({ body: CreateMedicoDto}), MedicoController.postMedico);
ROUTES.patch("/:id", validateRequest({ body: UpdateMedicoDto, params: IdParamDto }), MedicoController.patchMedico);
ROUTES.delete(
    "/:id",
    validateRequest({ params: IdParamDto }),
    MedicoController.deleteMedico
);

export default ROUTES;