import { IsNotEmpty, IsString, MaxLength } from "class-validator";

/**
 * DTO para la creación de un medico, incluye validaciones para cada campo, como el nombre y la especialidad
 */
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