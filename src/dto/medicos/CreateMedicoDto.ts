import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMedicoDto {
    //Validaciones del dto para crear medico,nombre
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsString({ message: "El nombre debe ser texto" })
    @MaxLength(50, { message: "El nombre no puede superar los 50 caracteres" })
    nombre: string;

    //Validaciones del dto para crear medico,especialidad
    @IsNotEmpty({ message: "La especialidad es obligatoria" })
    @IsString({ message: "La especialidad debe ser texto" })
    @MaxLength(100, { message: "La especialidad no puede superar los 100 caracteres" })
    especialidad: string;
}