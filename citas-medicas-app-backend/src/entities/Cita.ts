import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from "./Paciente";
import { Medico } from "./Medico";

@Entity({ name: 'tbCita' })
export class Cita {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    fecha: string;

    @Column({ type: 'time', nullable: false })
    hora: string;

    @Column({ length: 255 })
    motivo: string;

    @Column({ default: true, nullable: false })
    estado: boolean;

    @Column({ nullable: true, length: 255 })
    observaciones: string;

    //Relacion de muchos a unos para Paciente
    @ManyToOne(() => Paciente, (paciente) => paciente.citas, { nullable: false })
    @JoinColumn({ name: "pacienteId" })
    paciente: Paciente;

    //Relacion de muchos a unos para Medico
    @ManyToOne(() => Medico, (medico) => medico.citas, { nullable: false })
    @JoinColumn({ name: "medicoId" })
    medico: Medico;
}