import Motorizacao from "../entities/Motorizacao.js";
import { motorizacaoRepository } from "../repositories/repositories.js";
import { modeloService } from "./services.js";

export default class MotorizacaoService{
    _verificarMotorizacaoExistente(nomeMotorizacao){
        const listaMotorizacao = motorizacaoRepository.list();

        listaMotorizacao.forEach(motorizacao =>{
            if(motorizacao.nome.toUpperCase() == nomeMotorizacao.toUpperCase()){
                throw `Erro: Já existe uma Motorização com o nome ${nomeMotorizacao}`;
            }
        });
    }
    
    salvar(nomeMotorizacao){
        this._verificarMotorizacaoExistente(nomeMotorizacao);
        const novaMotorizacao = new Motorizacao();
        novaMotorizacao.nome = nomeMotorizacao;

        const id = motorizacaoRepository.save(novaMotorizacao);
        return id;
    }

    alterar(id, novaMotorizacao){
        const motorizacao = motorizacaoRepository.get(id);

        if(!motorizacao) throw `Erro ao alterar a Motorização: Não existe uma motorização com id "${id}"`;

        if(novaMotorizacao.toUpperCase() !== motorizacao.nome.toUpperCase()) this._verificarMotorizacaoExistente(novaMotorizacao);

        motorizacao.nome = novaMotorizacao;

        motorizacaoRepository.save(motorizacao);

        return motorizacao;
    }

    get(id){
        const motorizacao = motorizacaoRepository.get(id);

        return motorizacao;
    }

    deletar(id){
        const modelos = modeloService.listarPorMotorizacao(id);

        if(modelos.length > 0) throw `Erro ao deletar a Motorização: Não é possível apagar a Motorização de id "${id}" pois há "${modelos.length}" Modelo(s) relacionado(s) a ela.`;
        
        motorizacaoRepository.delete(id);
    }

    listar(){
        const motorizacao = motorizacaoRepository.list();

        return motorizacao;
    }
}