import { Column, Entity, OneToMany,PrimaryGeneratedColumn} from "typeorm";
import { Cita } from "./Cita";

@Entity({ name: 'tbMedico' })
export class Medico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false })
    nombre: string;

    @Column({ length: 100, nullable: false })
    especialidad: string;

    @Column({ default: true })
    estado: boolean;

    //Relacion de unos con muchos a citas
    @OneToMany(() => Cita, (cita) => cita.medico)
    citas: Cita[];
}