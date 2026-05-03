/**
 * Modelo para enviar y recibir usuarios
 */
export interface UsuarioModel {
    id?: number;
    email: string;
    role: string;
    estado: boolean;
}

/**
 * Modelo para listar usuarios
 */
export interface usuarioApiResponse {
    message: string,
    data: UsuarioModel[]
}