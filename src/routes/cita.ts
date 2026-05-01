import { Router } from "express";
import { validateRequest } from "../middlewares/validatedRquest";
import { IdParamDto } from "../dto/id/IdParamDto";
import { CitaController } from "../controllers/CitaController";
import { CreateCitaDto } from "../dto/citas/CreateCitaDto";


const ROUTES = Router();

ROUTES.get("/", CitaController.getAllCitas);
ROUTES.get("/:id", validateRequest({ params: IdParamDto }), CitaController.getByIdCita);
ROUTES.post("/", validateRequest({ body: CreateCitaDto }), CitaController.postCita);
ROUTES.patch("/:id", validateRequest({ body: CreateCitaDto, params: IdParamDto }), CitaController.patchCita);
ROUTES.delete(
    "/:id",
    validateRequest({ params: IdParamDto }),
    CitaController.deleteCita
);

export default ROUTES;