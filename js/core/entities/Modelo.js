import Motorizacao from "./Motorizacao.js";
import Marca from "./Marca.js";
import Carroceria from "./Carroceria.js";

export default class Modelo {
    get id(){
        return this._id;
    };
    set id(value){
        if (isNaN(value)) throw "id precisa ser um numero";
        this._id = value; 
    };

    get nomeModelo(){
        return this._nomeModelo;
    };
    set nomeModelo(value){
        if(typeof value != 'string') throw "Nome do modelo precisa ser uma texto";
        if(value.length <= 0) throw "Nome do modelo precisa ter pelo menos um caractere";
        this._nomeModelo = value;
    };;

    get marca(){
        return this._marca;
    };
    set marca(value){
        if(value && value.constructor !== Marca) throw "O campo marca precisa ser uma instância da classe " + Marca.name;
        this._marca = value;
    };

    get motorizacao(){
        return this._motorizacao;
    };
    set motorizacao(value){
        if(value && value.constructor !== Motorizacao) throw "O campo motorização precisa ser uma instâcia da classe " + Motorizacao.name;
        
        this._motorizacao = value;
    };

    get carroceria(){
        return this._carroceria;
    };
    set carroceria(value){
        if(value && value.constructor !== Carroceria) throw "O campo carroceria precisa ser uma instância da classe " + Carroceria.name;
        
        this._carroceria = value;
    };

    get portas(){
        return this._portas;
    };
    set portas(value){
        if(isNaN(value)) throw "A quantidade de portas tem que ser em números";
        if(value.length <= 0) throw "A qunatidade de portas é obrigatória";
        if(value === 0) throw "A qunatidade de portas não pode ser 0";
        
        this._portas = value;
    };
};