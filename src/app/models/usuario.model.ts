export interface UsuarioModel{
    id?: number;
    userName: string;
    role: string;
    estado: boolean;
}

export interface usuarioApiResponse {
    message: string,
    data: UsuarioModel[]
}