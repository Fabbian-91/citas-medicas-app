import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateMedicoDto {
    //Validaciones del dto para actualizar, nombre
    @IsOptional()
    @IsString({ message: "El nombre debe ser texto" })
    @MaxLength(50, { message: "El nombre no puede superar los 50 caracteres" })
    nombre?: string;

    //Validaciones del dto para actualizar, especialidad
    @IsOptional()
    @IsString({ message: "La especialidad debe ser texto" })
    @MaxLength(100, { message: "La especialidad no puede superar los 100 caracteres" })
    especialidad?: string;

    //Validaciones de dto para actualizar el estado
    @IsOptional()
    @IsString({ message: "El estado debe ser verdadero o falso" })
    estado?: boolean;
}