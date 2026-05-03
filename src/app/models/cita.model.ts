/**
 * Modelo para enviar citas
 * */
export interface CitaModel{
    id?:number;
    fecha:string;
    hora:string;
    motivo:string;
    estado:boolean;
    observaciones?:string | null;
    paciente:{
        id?:number;
        nombre:string;
        cedula:string;
        telefono:string;
    };
    medico:{
        id?:number;
        nombre:string;
        especialidad:string;
    }
}
/**
 * Modelo para recibir la lista de citas
 */
export interface citaApiReponse{
    message:string;
    data:CitaModel[];
}