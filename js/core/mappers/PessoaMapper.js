import Pessoa from "../entities/Pessoa.js";
import PessoaDTO from "../DTOs/PessoaDTO.js";

export default class PessoaMapper{
    convertToEntity(dto){
        const entity = new Pessoa();
        entity.id = dto.id;
        entity.nome = dto.nome;
        entity.endereco = dto.endereco;
        entity.telefone = dto.telefone;
        entity.email = dto.email;
        entity.razaoSocial = dto.razaoSocial;
        entity.cnpj = dto.cnpj;
        entity.cpf = dto.cpf;

        return entity;
    }

    convertToDTO(entity){
        const dto = new PessoaDTO();
        dto.id = entity.id;
        dto.nome = entity.nome;
        dto.endereco = entity.endereco;
        dto.telefone = entity.telefone?.valueOf();
        dto.email = entity.email?.valueOf();
        dto.razaoSocial = entity.razaoSocial;
        dto.cnpj = entity.cnpj?.valueOf();
        dto.cpf = entity.cpf?.valueOf();

        return dto;
    }
}