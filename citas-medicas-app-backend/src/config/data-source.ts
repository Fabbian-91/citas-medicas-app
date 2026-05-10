import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cita } from "../entities/Cita";
import { Medico } from "../entities/Medico";
import { Paciente } from "../entities/Paciente";
import { Usuario } from "../entities/Usuario";

/**
 * Configuración de la conexión a la base de datos con TypeORM
 */
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "sistema_citas_medicas",
    synchronize: true,
    logging: false,
    entities: [Usuario,
        Paciente,
        Medico,
        Cita],
});