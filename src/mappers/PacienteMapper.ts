import { PacienteResponseDto } from "../dto/pacientes/PacienteResponseDto";
import { Paciente } from "../entities/Paciente";

export class PacienteMapper {
    /**
    * Metodo  para mappear el response de paciente
    * @param entity 
    * @returns PacienteResponseDto
    */
    static toResponseDto(entity: Paciente): PacienteResponseDto {
        return {
            id: entity.id,
            nombre: entity.nombre,
            cedula: entity.cedula,
            telefono: entity.telefono,
            estado: entity.estado
        };
    }

    /**
     * Metodo para mapear una lista de todos los pacientes
     * @param entities 
     * @returns PacienteResponseDto[]
     */
    static toResponseDtoList(entities: Paciente[]): PacienteResponseDto[] {
        return entities.map(this.toResponseDto);
    }
}