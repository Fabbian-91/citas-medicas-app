/**
 * Modelo para enviar la autentificación
 */
export interface LoginModel {
    email: string,
    password: string
}

/**
 * Modelo para enviar la respuesta de la autentificación
 */
export interface LoginResponse {
    message: string;
    token: string;
    usuario: {
        id: number;
        email: string;
        rol: string;
    };
}