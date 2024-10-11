import Motorizacao from "../entities/Motorizacao.js";
import { motorizacaoRepository } from "../repositories/repositories.js";

export default class MotorizacaoService{
    _verificarMotorizacaoExistente(nomeMotorizacao){
        const listaMotorizacao = motorizacaoRepository.list();

        listaMotorizacao.forEach(motorizacao =>{
            if(motorizacao.nome.toUpperCase() == nomeMotorizacao.toUpperCase()){
                throw `Já existe uma Motorização com o nome ${nomeMotorizacao}`;
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

        if(!motorizacao) throw `Erro. não existe uma motorização com id ${id}`;

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
        // todo : verifica se está sendo usado
        motorizacaoRepository.delete(id);
    }

    listar(){
        const motorizacao = motorizacaoRepository.list();

        return motorizacao;
    }
}