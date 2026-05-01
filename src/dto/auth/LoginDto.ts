import { IsEmail, IsNotEmpty } from "class-validator";

export class loginDto {
    //Validaciones de Dto para el email
    @IsEmail({}, { message: "Datos incorrectos al autenticarse" })
    @IsNotEmpty({ message: "Datos incorrectos al autenticarse" })
    email!: string;

    //Validaciones de Dto para el password
    @IsNotEmpty({ message: "Datos incorrectos al autenticarse" })
    password!: string;
}