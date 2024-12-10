import Modelo from "../entities/Modelo.js";
import ModeloDTO from "../DTOs/ModeloDTO.js";

export default class ModeloMapper{
    _marcaRepository;
    _motorizacaoRepository;
    _carroceriaRepository;

    constructor(marcaRepository, motorizacaoRepository, carroceriaRepository){
        this._marcaRepository = marcaRepository;
        this._motorizacaoRepository = motorizacaoRepository;
        this._carroceriaRepository = carroceriaRepository;
    }

    convertToEntity(dto){
        const entity = new Modelo();
        entity.id = dto.id;
        entity.nome = dto.nome;        
        entity.marca = dto.marca ? this._marcaRepository.get(dto.marca) : null;
        entity.motorizacao = dto.motorizacao ? this._motorizacaoRepository.get(dto.motorizacao) : null;
        entity.carroceria = dto.carroceria ? this._carroceriaRepository.get(dto.carroceria) : null;
        entity.portas = dto.portas;

        return entity;
    }

    convertToDTO(entity){
        const dto = new ModeloDTO();
        dto.id = entity.id;
        dto.nome = entity.nome;
        dto.marca = entity.marca?.id;
        dto.motorizacao = entity.motorizacao?.id;
        dto.carroceria = entity.carroceria?.id;
        dto.portas = entity.portas;

        return dto;
    }
}