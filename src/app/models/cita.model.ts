export interface Cita{
    id?:number;
    fecha:string;
    hora:string;
    motivo:string;
    estoda:boolean;
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

export interface citaApiReponse{
    message:string;
    data:Cita[];
}