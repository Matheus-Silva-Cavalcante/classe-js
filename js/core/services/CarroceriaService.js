import Carroceria from "../entities/Carroceria.js";
import { carroceriaRepository } from "../repositories/repositories.js";
import { modeloService } from "./services.js";

export default class CarroceriaService{
    _verificarCarroceriaExitente(nomeCarroceria){
        const listaCarroceria = carroceriaRepository.list();

        listaCarroceria.forEach(carroceria => {
            if(carroceria.nome.toUpperCase() == nomeCarroceria.toUpperCase()) {
                throw `Erro: Já existe uma carroceria com o nome "${nomeCarroceria}"`;
            }
        });
    }
    
    salvar(nomeCarroceria){
        this._verificarCarroceriaExitente(nomeCarroceria);

        const novaCarroceria = new Carroceria();

        novaCarroceria.nome = nomeCarroceria;
        
        const id = carroceriaRepository.save(novaCarroceria);

        return id;
    }

    alterar(id, novaCarroceria){
        const carroceria = carroceriaRepository.get(id);

        if(!carroceria) throw `Erro ao alterar a Carroceria: Não existe uma carroceria com id "${id}"`;

        if(novaCarroceria !== carroceria.nome) this._verificarCarroceriaExitente(novaCarroceria);

        carroceria.nome = novaCarroceria;

        carroceriaRepository.save(carroceria);

        return carroceria;
    }

    get(id){
        const carroceria = carroceriaRepository.get(id);

        return carroceria;
    }

    deletar(id){
        const modelos = modeloService.listarPorCarroceria(id);

        if(modelos.length > 0) throw `Erro ao deltar a Carroceria: Não é possivel apagar a Carroceria com o id "${id}" pois há ${modelos.length} Modelo(s) relacionado(s) a ela`;
        
        carroceriaRepository.delete(id);
    }

    listar(){
        const carroceria = carroceriaRepository.list();

        return carroceria;
    }
}