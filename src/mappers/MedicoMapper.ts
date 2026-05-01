import { MedicoResponseDto } from "../dto/medicos/MedicoResponseDto";
import { Medico } from "../entities/Medico";

export class MedicoMapper {
    /**
        * Metodo  para mappear el response de medico
        * @param entity 
        * @returns MedicoResponseDto
        */
    static toResponseDto(entity: Medico): MedicoResponseDto {
        return {
            id: entity.id,
            nombre: entity.nombre,
            especialidad: entity.especialidad,
            estado: entity.estado
        };
    }

    /**
     * Metodo para mapear una lista de todos los medicos
     * @param entities 
     * @returns MedicoResponseDto[]
     */
    static toResponseDtoList(entities: Medico[]): MedicoResponseDto[] {
        return entities.map(this.toResponseDto);
    }
}