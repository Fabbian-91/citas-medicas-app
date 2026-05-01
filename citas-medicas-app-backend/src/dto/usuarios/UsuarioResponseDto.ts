/**
 * DTO para la respuesta de un usuario, incluye los campos id, userName, password, role y estado
 */
export class UsuarioResponseDto {
    id: number;
    userName: string;
    password: string;
    role: string;
    estado: boolean;
}