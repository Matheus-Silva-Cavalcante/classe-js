import Carroceria from "../entities/Carroceria.js"
import CarroceriaDTO from "../DTOs/CarroceriaDTO.js"

export default class CarroceriaMapper{
    convertToEntity(dto){
        const entity = new Carroceria();
        entity.id = dto.id;
        entity.nome = dto.nome;

        return entity;
    }

    convertToDTO(entity){
        const dto = new CarroceriaDTO();
        dto.id = entity.id;
        dto.nome = entity.nome;

        return dto;
    }
}