import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cita } from "../entities/Cita";
import { Medico } from "../entities/Medico";
import { Paciente } from "../entities/Paciente";
import { Usuario } from "../entities/Usuario";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234", // ajusta
    database: "sistema_citas_medicas", // crea esta DB
    synchronize: false, // solo desarrollo
    logging: false,
    entities: [Usuario,
        Paciente,
        Medico,
        Cita],
});