import { Type } from "class-transformer";
import { IsInt,Min } from "class-validator";

export class IdParamDto{
    @Type(()=>Number)
    @IsInt({message:"El ID debe ser un número entero"})
    @Min(1,{message:"El Id debe ser mayor a 1"})
    id!:number
}