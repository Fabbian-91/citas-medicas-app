import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { validateRequest } from "../middlewares/validatedRquest";
import { CreateUsuarioDto } from "../dto/usuarios/CreateUsuarioDto";
import { UpdateUsuarioDto } from "../dto/usuarios/UpdateUsuarioDto";
import { IdParamDto } from "../dto/id/IdParamDto";

//Intancia del router de express para las rutas de usuarios
const ROUTES = Router();

//Rutas para las operaciones CRUD de usuarios
ROUTES.get("/", UsuarioController.getAllUsuarios);
ROUTES.get("/:id", validateRequest({ params: IdParamDto }), UsuarioController.getByIdUsuario);
ROUTES.post("/", validateRequest({ body: CreateUsuarioDto }), UsuarioController.postUsuario);
ROUTES.patch("/:id", validateRequest({ body: UpdateUsuarioDto, params: IdParamDto }), UsuarioController.patchUsuario);
ROUTES.delete(
    "/:id",
    validateRequest({ params: IdParamDto }),
    UsuarioController.deleteUsuario
);

export default ROUTES;