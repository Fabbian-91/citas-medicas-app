import { IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { userRole } from "../../enum/Rol.enum";

/**
 * DTO para la creación de un usuario, incluye validaciones para cada campo, como el email, password y role
 */
export class CreateUsuarioDto {
    //Validaciones de dto para crear el email
    @MaxLength(50, { message: "El maximo de caracteres debe ser 100" })
    @MinLength(6, { message: "El minimo de caracteres es de 6" })
    @IsEmail({}, { message: "El nombre de usuario debe ser un correo electronico" })
    @IsNotEmpty({ message: "El nombre de usuario es obligatorio" })
    email!: string;

    //Validaciones de dto para crear el password
    @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    @MaxLength(100, { message: "La contraseña no puede exceder los 100 caracteres" })
    @IsNotEmpty({ message: "La contraseña es obligatoria" })
    password!: string;

    //Validaciones de dto para crear el role
    @IsEnum(userRole, { message: "El rol debe ser un valor válido" })
    @IsNotEmpty({ message: "El rol es obligatorio" })
    role!: userRole;
}