/**
 * Metodo para devolver el reponse del login, con el token generado y los datos del usuario
 * @param token 
 * @param usuario 
 */
export class LoginResponseDto {
    token: string;
    usuario: {
        id: number;
        nombre: string;
        email: string;
        rol: string;
    };
}