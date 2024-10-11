import Marca from "../entities/Marca.js";
import { marcaRepository } from "../repositories/repositories.js";

export default class MarcaService{
    _verificarMarcaExistente(nomeMarca){
        const listaMarca = marcaRepository.list();

        listaMarca.forEach(marca => {
            if (marca.nome.toUpperCase() == nomeMarca.toUpperCase()) {
                throw `Já existe uma Marca com nome ${nomeMarca}`;
            } 
        });
    }

    salvar(nomeMarca) {
        this._verificarMarcaExistente(nomeMarca);
        const novaMarca = new Marca();
        novaMarca.nome = nomeMarca;

        const id = marcaRepository.save(novaMarca);

        return id;
    }

    alterar(id, novoNome) {
        const marca = marcaRepository.get(id)

        if(!marca) throw `Erro ao alterar. Não existe uma Marca com id: ${id}`;

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
        // todo : verificar se está sendo usado
        marcaRepository.delete(id);
    }

    listar(){
        const marcas = marcaRepository.list()

        return marcas;
    }
}