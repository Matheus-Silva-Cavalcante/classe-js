import Modelo from "../entities/Modelo.js";
import { modeloRepository } from "../repositories/repositories.js";

export default class ModeloService{
    

    salvar(nome, marca, motorizacao, carroceria, portas){
        const novoModelo = new Modelo();
        novoModelo.nome = nome;
        // novoModelo.marca = marca
        // novoModelo.motorizacao = motorizacao 
        // novoModelo.carroceria = carroceria   
        novoModelo.portas = portas;
        
        const id = modeloRepository.save(novoModelo)
        return id
    }

    alterar(){

    }

    get(id){
        const modelo = modeloRepository.get(id);

        return modelo;
    }

    deletar(){

    }

    listar(){
        const modelo = modeloRepository.list();

        return modelo;
    }
}