import { IsBoolean, IsEmail, IsEnum, IsOptional, MaxLength, MinLength } from "class-validator";
import { userRole } from "../../enum/Rol.enum";

export class UpdateUsuarioDto {
    //Validaciones de dto para actualizar el email
    @IsOptional()
    @MaxLength(100, { message: "El maximo de caracteres debe ser 100" })
    @MinLength(6, { message: "El minimo de caracteres es de 6" })
    @IsEmail({}, { message: "El nombre de usuario debe ser un correo electronico" })
    email?: string;

    //Validaciones de dto para actualizar el password
    @IsOptional()
    @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    @MaxLength(100, { message: "La contraseña no puede exceder los 100 caracteres" })
    password?: string;

    //Validaciones de dto para role el password
    @IsOptional()
    @IsEnum(userRole, { message: "El rol debe ser un valor válido" })
    role?: userRole;

    //Validaciones de dto para actualizar el estado
    @IsOptional()
    @IsBoolean({ message: "El estado debe ser verdadero o falso" })
    estado?: boolean;
}