import { Type } from "class-transformer";
import { IsInt,Min } from "class-validator";

/**
 * DTO para validar el ID enviado por parametro en las rutas, se valida que sea un número entero y mayor a 1
 */
export class IdParamDto{
    @Type(()=>Number)
    @IsInt({message:"El ID debe ser un número entero"})
    @Min(1,{message:"El Id debe ser mayor a 1"})
    id!:number
}