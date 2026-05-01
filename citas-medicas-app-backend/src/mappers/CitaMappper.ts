import { CitaResponseDto } from "../dto/citas/CitaReponseDto";
import { Cita } from "../entities/Cita";

export class CitaMapper{
    /**
            * Metodo  para mappear el response de Cita
            * @param entity 
            * @returns CitaResponseDto
            */
        static toResponseDto(entity: Cita): CitaResponseDto{
            return {
                id: entity.id,
                fecha:entity.fecha,
                hora:entity.hora,
                motivo:entity.motivo,
                estado:entity.estado,
                observaciones:entity.observaciones,
                paciente:entity.paciente,
                medico:entity.medico
            };
        }
    
        /**
         * Metodo para mapear una lista de todos los Cita
         * @param entities 
         * @returns CitaResponseDto[]
         */
        static toResponseDtoList(entities: Cita[]): CitaResponseDto[] {
            return entities.map(this.toResponseDto);
        }
}