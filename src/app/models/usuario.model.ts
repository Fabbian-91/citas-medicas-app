export interface Usuario {
    id?: number;
    email: string;
    role: string;
    estado: boolean;
}

export interface usuarioApiResponse {
    message: string,
    data: Usuario[]
}