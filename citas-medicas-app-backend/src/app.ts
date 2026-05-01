import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { AppDataSource } from "./config/data-source";
import routes from "./routes";
/* import routes from "./routes"; */

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        const app: Application = express();

        // Permite recibir JSON del frontend
        app.use(express.json());

        // Configuración de CORS
        app.use(
            cors({
                // Permitimos solo peticiones desde Angular
                origin: "http://localhost:4200",

                // Exponemos el header personalizado "token"
                // para que Angular pueda leerlo con response.headers.get('token')
                exposedHeaders: ["token"],
            })
        );

        // Agrega cabeceras de seguridad
        app.use(helmet());

        // Rutas principales de la API
        app.use("/api", routes);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error initializing Data Source:", error);
    });
