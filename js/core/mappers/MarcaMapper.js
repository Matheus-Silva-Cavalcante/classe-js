import Marca from "../entities/Marca.js"
import MarcaDTO from "../DTOs/MarcaDTO.js"

export default class MarcaMapper{
    convertToEntity(dto){
        const entity = new Marca();
        entity.id = dto.id;
        entity.nome = dto.nome;

        return entity;
    }

    convertToDTO(entity){
        const dto = new MarcaDTO();
        dto.id = entity.id;
        dto.nome = entity.nome;

        return dto;
    }
};