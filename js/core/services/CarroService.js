import Carro from "../entities/Carro.js";
import { carroRepository, modeloRepository } from "../repositories/repositories.js";
import { modeloService, pessoaService } from "./services.js";

export default class CarroService{
    _verificarDadosExistente(placa, renavam, id){
        const carros = carroRepository.list();

        carros.forEach(carro => {
            if(carro.id == id) return;

            if(carro.placa.toUpperCase() == placa.toUpperCase()) throw `Erro ao salvar: Já existe um carro salvo com a placa "${placa}"`;

            if(carro.renavam == renavam) throw `Erro ao salvar: Já existe um carro salvo com o renavam "${renavam}"`;
        });
    }

    _pegarModelo(idModelo){
        const modelo = modeloService.get(idModelo);

        if(!modelo) throw `Erro ao carregar Modelo: Não existe Modelo com o id: "${idModelo}"`;

        return modelo;
    }

    _pegarPessoa(idPessoa){
        const pessoa = pessoaService.get(idPessoa);

        if (pessoa === null) return

        if(!pessoa) throw `Erro ao carregar Pessoa: Não existe Pessao com o id: "${idPessoa}"`;

        return pessoa;
    }

    _verificarDados(idModelo, complementoCarro, anoFabricacao, anoModelo, quilometragem, cor, placa, renavam, idProprietarioAnterior, valorCompra, valorAnunciado, idCliente, valorVenda){
        if(!idModelo) throw "Erro ao salvar: O Modelo é obrigatório";
        if(!complementoCarro) throw "Erro ao salvar: O complemento do carro é obrigatório";
        if(!anoFabricacao) throw "Erro ao salvar: O ano de Fabricação é obrigatório";
        if(!anoModelo) throw "Erro ao salvar: O ano do Modelo é obrigatório";
        if(!quilometragem) throw "Erro ao salvar: A Quilometragem é obrigatória"
        if(!cor) throw "Erro ao salvar: A cor do carro é obrigatório";
        if(!placa) throw "Erro ao salvar: A Placa do carro é obrigatório";
        if(!renavam) throw "Erro ao salvar: O Renavam é obrigatório";
        if(!idProprietarioAnterior) throw "Erro ao salvar: O Proprietario Anterior é obrigatório";
        if(!valorCompra) throw "Erro ao salvar: O valor de Compra é obrigatório";
        if(!valorAnunciado) throw "Erro ao salvar: O valor de Anuncio é obrigatório";
        
        if(idCliente && !valorVenda) throw "Ao informar o comprador, o valor da venda é obrigatório";
        if(valorVenda && !idCliente) throw "Ao informar o valor da venda, é obrigatório indicar o comprador";
    }

    salvar(idModelo, complementoCarro, anoFabricacao, anoModelo, quilometragem, cor, placa, renavam, idProprietarioAnterior, valorCompra, valorAnunciado, idCliente, valorVenda){
        this._verificarDados(idModelo, complementoCarro, anoFabricacao, anoModelo, quilometragem, cor, placa, renavam, idProprietarioAnterior, valorCompra, valorAnunciado, idCliente, valorVenda);

        this._verificarDadosExistente(placa, renavam);

        const carro = new Carro();

        carro.modelo = this._pegarModelo(idModelo);
        carro.complementoCarro = complementoCarro;
        carro.anoFabricacao = anoFabricacao;
        carro.anoModelo = anoModelo;
        carro.quilometragem = quilometragem;
        carro.cor = cor;
        carro.placa = placa;
        carro.renavam = renavam;
        carro.valorCompra = valorCompra;
        carro.valorAnunciado = valorAnunciado;
        carro.valorVenda = valorVenda;
        carro.proprietarioAnterior = this._pegarPessoa(idProprietarioAnterior);
        carro.cliente = this._pegarPessoa(idCliente);

        const id = carroRepository.save(carro);
        return id;
    }

    alterar(id, idModelo, complementoCarro, anoFabricacao, anoModelo, quilometragem, cor, placa, renavam, idProprietarioAnterior, valorCompra, valorAnunciado, idCliente, valorVenda){
        this._verificarDadosExistente(placa, renavam, id);

        const carro = carroRepository.get(id);

        if(!carro) throw `Erro ao alterar: Não existe um Carro com id: "${id}"`;

        carro.modelo = this._pegarModelo(idModelo);
        carro.complementoCarro = complementoCarro;
        carro.anoFabricacao = anoFabricacao;
        carro.anoModelo = anoModelo;
        carro.quilometragem = quilometragem;
        carro.cor = cor;
        carro.placa = placa;
        carro.renavam = renavam;
        carro.proprietarioAnterior = this._pegarPessoa(idProprietarioAnterior);
        carro.valorCompra = valorCompra;
        carro.valorAnunciado = valorAnunciado;
        carro.cliente = this._pegarPessoa(idCliente);
        carro.valorVenda = valorVenda;

        carroRepository.save(carro);

        return carro;
    }

    get(id){
        const carro = carroRepository.get(id);

        return carro;
    }

    deletar(id){
        carroRepository.delete(id);
    }

    listar(){
        const carro = carroRepository.list();

        return carro;
    }

    listarPorModelo(idModelo){
        return carroRepository.list().filter(carro => carro.modelo.id == idModelo);
    }

    listarPorPessoa(idPessoa){
        return carroRepository.list().filter(carro => carro.cliente.id == idPessoa || carro.proprietarioAnterior.id == idPessoa);
    }
}