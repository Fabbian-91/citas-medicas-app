import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePacienteDto {
    //Validaciones del dto para crear parciente, nombre
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsString({ message: "El nombre debe ser texto" })
    @MaxLength(50, { message: "El nombre no puede superar los 50 caracteres" })
    nombre: string;

    //Validaciones del dto para crear parciente, cedula
    @IsNotEmpty({ message: "La cédula es obligatoria" })
    @IsString({ message: "La cédula debe ser texto" })
    @MaxLength(50, { message: "La cédula no puede superar los 50 caracteres" })
    cedula: string;

    //Validaciones del dto para crear parciente, telefono
    @IsNotEmpty({ message: "El teléfono es obligatorio" })
    @IsString({ message: "El teléfono debe ser texto" })
    @MaxLength(50, { message: "El teléfono no puede superar los 50 caracteres" })
    telefono: string;
}