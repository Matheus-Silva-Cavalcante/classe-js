import Modelo from "./Modelo.js";
import Pessoa from "./Pessoa.js";
import ValorMonetario from "../valueObjects/ValorMonetario.js";

export default class Carro {
    get id(){
        return this._id;
    };
    set id(value){
        if(isNaN(value)) throw "id precisa ser um numero";
        this._id = value;
    };

    get modelo(){
        return this._modelo;
    };
    set modelo(value){
        if(value && value.constructor !== Modelo) throw "O campo modelo precisa ser uma instância da classe " + Modelo.name;
        this._modelo = value;
    };

    get complementoCarro(){
        return this._complementoCarro;
    }
    set complementoCarro(value){
        // if (typeof value != 'string') throw 'O Complemento do Carro deve ser uma string'

        this._complementoCarro = value;
    }

    get anoFabricacao(){
        return this._anoFabricacao; 
    };
    set anoFabricacao(value){
        if(isNaN(value)) throw 'Ano de fabricação precisa ser um número';
        if(value < 1900) throw 'Ano de fabricação precisa ser maior que 1900';

        const hoje = new Date();
        if(hoje.getFullYear() < value) throw 'Ano de fabricação precisa ser menor ou igual o ano atual';

        this._anoFabricacao = value;
    };

    get anoModelo(){
        return this._anoModelo;
    };
    set anoModelo(value){
        if(isNaN(value)) throw "O ano do modelo precisa ser um número";
        if(value < 1900) throw 'Ano do modelo precisa ser maior que 1900';

        const hoje = new Date();
        if(hoje.getFullYear() + 1 < value) throw "Ano de fabricação não é valido";

        this._anoModelo = value;
    };

    get quilometragem(){
        return this._quilometragem; 
    };
    set quilometragem(value){
        if(isNaN(value)) throw "A Quilometragem do Carro precisa ser um número";

        this._quilometragem = value;
    };

    get cor(){
        return this._cor;
    };
    set cor(value){
        if(typeof value != 'string') throw "O nome da cor precisa ser uma string";
        if(!value.match(/[a-z][A-Z]*/)) throw "O mone da cor precisa ser composto por letras";

        this._cor = value;
    };

    get placa(){
        return this._placa;
    };
    set placa(value){
        if(value.length !== 7) throw "A placa tem que conter 7 caracteres";

        const placaMaiusculo = value.toUpperCase();
        if(!placaMaiusculo.match(/[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/)) throw "A placa do carro deve conter os seguintes caracteres de letras é números:'AAA0A00'";

        this._placa = placaMaiusculo;
    };

    get renavam(){
        return this._renavam;
    };
    set renavam(value){
        if(isNaN(value)) throw "O renavam precisa ser composto por número";
        if(value.length !== 11) throw "O número do renavam precisa ter 11 caracteres";

        this._renavam = value;
    };

    get valorCompra(){
        return this._valorCompra;
    };
    set valorCompra(value){
        this._valorCompra = new ValorMonetario(value);
    };

    get valorAnunciado(){
        return this._valorAnunciado;
    };
    set valorAnunciado(value){
        this._valorAnunciado = new ValorMonetario(value)
    };

    get valorVenda(){
        return this._valorVenda;
    };
    set valorVenda(value){
        this._valorVenda = new ValorMonetario(value);
    };

    get proprietarioAnterior(){
        return this._proprietarioAnterior;
    };
    set proprietarioAnterior(value){
        if(value && value.constructor !== Pessoa) {
            throw "O campo proprietarioAnterior precisa ser uma instância da classe " + Pessoa.name;
        };

        this._proprietarioAnterior = value;
    }

    get cliente(){
        return this._cliente;
    };
    set cliente(value){
        if(value && value.constructor !== Pessoa) throw "O campo cliente precisa ser uma instância da classe " + Pessoa.name;

        this._cliente = value;
    };
};

