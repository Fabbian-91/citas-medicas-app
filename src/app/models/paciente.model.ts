export interface Paciente{
    id?:number;
    nombre:string;
    cedula:string;
    telefono:string;
    estado:boolean;
}

export interface pacienteApiResponse{
    message:string;
    data:Paciente[];
}