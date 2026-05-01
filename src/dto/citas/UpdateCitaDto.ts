import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

/**
 * DTO para la actualización de una cita, incluye validaciones para cada campo, como el ID del paciente y medico, la fecha, hora, motivo, estado y observaciones
 */
export class UpdateCitaDto {
    //Validacion de dto para actualizar cita, paciente
    @IsOptional()
    @IsNumber({}, { message: "El ID del paciente debe ser un número" })
    pacienteId?: number;

    //Validacion de dto para actualizar cita, medico
    @IsOptional()
    @IsNumber({}, { message: "El ID del médico debe ser un número" })
    medicoId?: number;

    //Validacion de dto para actualizar cita, fecha
    @IsOptional()
    @IsDateString({}, { message: "La fecha debe tener un formato válido" })
    fecha?: string;

    //Validacion de dto para actualizar cita, hora
    @IsOptional()
    @IsString({ message: "La hora debe ser texto" })
    hora?: string;

    //Validacion de dto para actualizar cita, motivo
    @IsOptional()
    @IsString({ message: "El motivo debe ser texto" })
    @MaxLength(255, { message: "El motivo no puede superar los 255 caracteres" })
    motivo?: string;

    //Validacion de dto para actualizar cita, estado
    @IsOptional()
    @IsBoolean({ message: "El estado debe ser verdadero o falso" })
    estado?: boolean;

    //Validacion de dto para actualizar cita, observaciones
    @IsOptional()
    @IsString({ message: "Las observaciones deben ser texto" })
    @MaxLength(255, { message: "Las observaciones no pueden superar los 255 caracteres" })
    observaciones?: string;
}