import Modelo from "../entities/Modelo.js";
import { modeloRepository } from "../repositories/repositories.js";
import { marcaService, motorizacaoService, carroceriaService, carroService } from "./services.js";

export default class ModeloService{
    _pegarMarca(idMarca){
        const marca = marcaService.get(idMarca);

        if(!marca) throw `Erro ao carregar Marca: Não existe Marca com o id: "${idMarca}"`;

        return marca;
    }
    _pegarMotorizacao(idMotorizacao){
        const motorizacao = motorizacaoService.get(idMotorizacao)

        if(!motorizacao) throw `Erro ao carregar Motorização: Não existe Motorizacao com o id: "${idMotorizacao}"`;

        return motorizacao;
    }
    _pegarCarroceria(idCarroceria){
        const carroceria = carroceriaService.get(idCarroceria);

        if(!carroceria) throw `Erro ao carregar Carrocaria: Não existe Carroceria com o id: "${idCarroceria}"`;

        return carroceria;
    }

    salvar(nome, idMarca, idMotorizacao, idCarroceria, portas){
        const novoModelo = new Modelo();
        novoModelo.nome = nome;
        novoModelo.marca = this._pegarMarca(idMarca);
        novoModelo.motorizacao = this._pegarMotorizacao(idMotorizacao);
        novoModelo.carroceria = this._pegarCarroceria(idCarroceria);   
        novoModelo.portas = portas;
        
        const id = modeloRepository.save(novoModelo);
        return id;
    }

    alterar(id, nome, idMarca, idMotorizacao, idCarroceria, novaPortas){
        const modelo = modeloRepository.get(id);

        if(!modelo) throw `Erro ao alterar o Modelo: Não existe Modelo com o id: "${id}"`;

        modelo.nome = nome;
        modelo.marca = this._pegarMarca(idMarca)
        modelo.motorizacao = this._pegarMotorizacao(idMotorizacao)
        modelo.carroceria = this._pegarCarroceria(idCarroceria)
        modelo.portas = novaPortas
        
        modeloRepository.save(modelo);

        return modelo;
    }

    get(id){
        const modelo = modeloRepository.get(id);

        return modelo;
    }

    deletar(id){
        const carros = carroService.listarPorModelo(id);

        if(carros.length > 0) throw `Erro ao deletar o Modelo: Não é possível apagar o Modelo de id "${id}" pois há ${carros.length} Carro(s) relacionado(s) a ela.`;
        
        modeloRepository.delete(id);
    }

    listar(){
        const modelo = modeloRepository.list();

        return modelo;
    }

    listarPorMarca(idMarca){
        return modeloRepository.list().filter( modelo =>  modelo.marca?.id == idMarca);
    }

    listarPorMotorizacao(idMotorizacao){
        return modeloRepository.list().filter( modelo => modelo.motorizacao?.id == idMotorizacao);
    }

    listarPorCarroceria(idCarroceria){
        return modeloRepository.list().filter( modelo => modelo.carroceria?.id == idCarroceria);
    }
}