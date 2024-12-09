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
        entity.complementoCarro = dto.complementoCarro;
        entity.anoFabricacao = dto.anoFabricacao;
        entity.anoModelo = dto.anoModelo;
        entity.quilometragem = dto.quilometragem;
        entity.cor = dto.cor;
        entity.placa = dto.placa;
        entity.renavam = dto.renavam;
        entity.valorCompra = dto.valorCompra;
        entity.valorAnunciado = dto.valorAnunciado;
        entity.valorVenda = dto.valorVenda;
        entity.proprietarioAnterior = dto.proprietarioAnterior ? this._pessoaRepository.get(dto.proprietarioAnterior) : null;
        entity.cliente = dto.cliente ? this._clienteRepository.get(dto.cliente) : null;

        return entity;
    }

    convertToDTO(entity){
        const dto = new CarroDTO();
        dto.id = entity.id;
        dto.modelo = entity.modelo?.id;
        dto.complementoCarro = entity.complementoCarro;
        dto.anoFabricacao = entity.anoFabricacao;
        dto.anoModelo = entity.anoModelo;
        dto.quilometragem = entity.quilometragem;
        dto.cor = entity.cor;
        dto.placa = entity.placa;
        dto.renavam = entity.renavam;
        dto.valorCompra = entity.valorCompra?.valueOf();
        dto.valorAnunciado = entity.valorAnunciado?.valueOf();
        dto.valorVenda = entity.valorVenda?.valueOf();
        dto.proprietarioAnterior = entity.proprietarioAnterior?.id;
        dto.cliente = entity.cliente?.id;

        return dto;
    }
}