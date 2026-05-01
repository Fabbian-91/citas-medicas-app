import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePacienteDto {
    //Validaciones del dto para actualizar parciente, nombre
    @IsOptional()
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @IsString({ message: "El nombre debe ser texto" })
    @MaxLength(50, { message: "El nombre no puede superar los 50 caracteres" })
    nombre?: string;

    //Validaciones del dto para actualizar parciente, cedula
    @IsOptional()
    @IsString({ message: "La cédula debe ser texto" })
    @MaxLength(50, { message: "La cédula no puede superar los 50 caracteres" })
    cedula?: string;

    //Validaciones del dto para actualizar parciente, telefono
    @IsOptional()
    @IsString({ message: "El teléfono debe ser texto" })
    @MaxLength(50, { message: "El teléfono no puede superar los 50 caracteres" })
    telefono?: string;

    //Validaciones de dto para actualizar el estado
    @IsOptional()
    @IsBoolean({ message: "El estado debe ser verdadero o falso" })
    estado?: boolean;
}