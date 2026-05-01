import { UsuarioResposeDto } from "../dto/usuarios/UsuarioResponseDto";
import { Usuario } from "../entities/Usuario";

export class UsuarioMapper {

    /**
     * Metodo  para mappear el response de usuario
     * @param entity 
     * @returns Usuario
     */
    static toResponseDto(entity: Usuario): UsuarioResposeDto {
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
    static toResposeDtoList(entities: Usuario[]): UsuarioResposeDto[] {
        return entities.map(this.toResponseDto);
    }
}