import MotorizacaoDTO from "../DTOs/MotorizacaoDTO.js";
import Motorizacao from "../entities/Motorizacao.js";

export default class MotorizacaoMapper{
    convertToEntity(dto){
        const entity = new Motorizacao();
        entity.id = dto.id;
        entity.nome = dto.nome;

        return entity;
    }

    convertToDTO(entity){
        const dto = new MotorizacaoDTO()
        dto.id = entity.id;
        dto.nome = entity.nome;
        
        return dto;
    }
}