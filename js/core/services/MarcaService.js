import Marca from "../entities/Marca.js";
import { marcaRepository } from "../repositories/repositories.js";
import { modeloService } from "./services.js";

export default class MarcaService{
    _verificarMarcaExistente(nomeMarca){
        const listaMarca = marcaRepository.list();

        listaMarca.forEach(marca => {
            if (marca.nome.toUpperCase() == nomeMarca.toUpperCase()) {
                throw `Erro: Já existe uma Marca com nome "${nomeMarca}"`;
            } 
        });
    }

    /**
     * Salva uma nova marca
     * 
     * @param {string} nomeMarca 
     * @returns {number}
     */
    salvar(nomeMarca) {
        this._verificarMarcaExistente(nomeMarca);
        const novaMarca = new Marca();
        novaMarca.nome = nomeMarca;

        const id = marcaRepository.save(novaMarca);

        return id;
    }

    /**
     * ...
     * 
     * @param {number} id 
     * @param {string} novoNome 
     * @returns {Marca}
     */
    alterar(id, novoNome) {
        const marca = marcaRepository.get(id)

        if(!marca) throw `Erro ao alterar a Marca: Não existe uma Marca com id: "${id}"`;

        if(novoNome.toUpperCase() !== marca.nome.toUpperCase()) this._verificarMarcaExistente(novoNome);

        marca.nome = novoNome;
        
        marcaRepository.save(marca);

        return marca;
    }

    get(id){
        const marca = marcaRepository.get(id);

        return marca;
    }

    deletar(id) {
        const modelos = modeloService.listarPorMarca(id);

        if(modelos.length > 0) throw `Erro ao deletar a Marca: Não é possível apagar a Marca de id "${id}" pois há ${modelos.length} Modelo(s) relacionado(s) a ela.`;

        marcaRepository.delete(id);
    }

    listar(){
        const marcas = marcaRepository.list()

        return marcas;
    }
}