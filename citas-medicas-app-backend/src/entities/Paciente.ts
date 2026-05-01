import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cita } from "./Cita";

@Entity({name:'tbPaciente'})
export class Paciente{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:50,nullable:false})
    nombre:string;

    @Column({length:50,unique:true,nullable:false})
    cedula:string;

    @Column({length:50,unique:true,nullable:false})
    telefono:string;

    @Column({default:true})
    estado:boolean;

    //Relacion de unos a muchos con citas
    @OneToMany(()=>Cita,(cita)=>cita.paciente)
    citas:Cita[];
}