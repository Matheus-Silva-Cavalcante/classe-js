import Carro from "../entities/Carro.js"
import CarroDTO from "../DTOs/CarroDTO.js"

export default class CarroMapper{
    _modeloRepository;
    _pessoaRepository;
    _clienteRepository;

    constructor(modeloRepository, pessoaRepository, clienteRepository){
        this._modeloRepository = modeloRepository;
        this._pessoaRepository = pessoaRepository;
        this._clienteRepository = clienteRepository;
    }

    convertToEntity(dto){
        const entity = new Carro()
        entity.id = dto.id;
        entity.modelo = dto.modelo ? this._modeloRepository.get(dto.modelo) : null;
        entity.anoFabricacao = dto.anoFabricacao;
        entity.anoModelo = dto.anoModelo;
        entity.cor = dto.cor;
        entity.placa = dto.placa;
        entity.renavam = dto.renavam;
        entity.compra = dto.compra;
        entity.venda = dto.venda;
        entity.proprietarioAnterior = dto.proprietarioAnterior ? this._pessoaRepository.get(dto.proprietarioAnterior) : null;
        entity.cliente = dto.cliente ? this._clienteRepository.get(dto.cliente) : null;

        return entity;
    }

    convertToDTO(entity){
        const dto = new CarroDTO();
        dto.id = entity.id;
        dto.modelo = entity.modelo?.id;
        dto.anoFabricacao = entity.anoFabricacao;
        dto.anoModelo = entity.anoModelo;
        dto.cor = entity.cor;
        dto.placa = entity.placa;
        dto.renavam = entity.renavam;
        dto.compra = entity.compra;
        dto.venda = entity.venda;
        dto.proprietarioAnterior = entity.proprietarioAnterior?.id;
        dto.cliente = entity.cliente?.id;

        return dto;
    }
}