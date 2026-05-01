import { Usuario } from "../entities/Usuario";
import { UsuarioResponseDto } from "../dto/usuarios/UsuarioResponseDto";

export class UsuarioMapper {

    /**
     * Metodo  para mappear el response de usuario
     * @param entity 
     * @returns UsuarioResponseDto
     */
    static toResponseDto(entity: Usuario): UsuarioResponseDto {
        return {
            id: entity.id,
            userName: entity.email,
            role: entity.role,
            password: entity.password,
            estado: entity.estado
        };
    }

    /**
     * Metodo para mapear una lista de todos los usuarios
     * @param entities 
     * @returns UsuarioResponseDto[]
     */
    static toResponseDtoList(entities: Usuario[]): UsuarioResponseDto[] {
        return entities.map(this.toResponseDto);
    }
}