import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

/**
 * DTO para la creación de una cita, incluye validaciones para cada campo, como el ID del paciente y medico, la fecha, hora, motivo y observaciones
 */
export class CreateCitaDto {
    //Validacion de dto para crear cita, paciente
    @IsNotEmpty({ message: "El ID del paciente es obligatorio" })
    @IsNumber({}, { message: "El ID del paciente debe ser un número" })
    pacienteId: number;

    //Validacion de dto para crear cita, medico
    @IsNotEmpty({ message: "El ID del médico es obligatorio" })
    @IsNumber({}, { message: "El ID del médico debe ser un número" })
    medicoId: number;

    //Validacion de dto para crear cita, fecha
    @IsNotEmpty({ message: "La fecha es obligatoria" })
    @IsDateString({}, { message: "La fecha debe tener un formato válido" })
    fecha: string;

    //Validacion de dto para crear cita, hora
    @IsNotEmpty({ message: "La hora es obligatoria" })
    @IsString({ message: "La hora debe ser texto" })
    hora: string;

    //Validacion de dto para crear cita, motivo
    @IsNotEmpty({ message: "El motivo es obligatorio" })
    @IsString({ message: "El motivo debe ser texto" })
    @MaxLength(255, { message: "El motivo no puede superar los 255 caracteres" })
    motivo: string;

    //Validacion de dto para crear cita, observaciones
    @IsOptional()
    @IsString({ message: "Las observaciones deben ser texto" })
    @MaxLength(255, { message: "Las observaciones no pueden superar los 255 caracteres" })
    observaciones?: string;
}