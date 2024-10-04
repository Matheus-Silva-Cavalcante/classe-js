import CNPJ from "../valueObjects/CNPJ.js";
import CPF from "../valueObjects/CPF.js";
import Email from "../valueObjects/Email.js";
import Telefone from "../valueObjects/Telefone.js";

export default class Pessoa{
    get id(){
        return this._id;
    };

    set id(value){
        if( isNaN(value) ) throw "Id tem que ser um número, seu otário!";
        this._id = value;
    };

    get nome(){
        return this._nome;
    };
    set nome(value){
        if(typeof value != 'string') throw "Nome precisa ser uma string";
        if(value.length < 3) throw "O nome precisa ter pelo menos 3 caracteres";
        if( !value.match(/[a-z][A-Z]*/) ) throw "O nome precisa ser composto por letras, enfie seu nome de números e símbolos no cu do Elon Musk";

        this._nome = value;
    };

    get endereco(){
        return this._endereco;
    };
    set endereco(value){
        if(!value.match(/([\w\W]+)\s(\d+)/)) throw "O enderço não é válido";

        this._endereco = value;
    };

    get telefone(){
        return this._telefone;
    };
    set telefone(value){
        this._telefone = new Telefone(value);
    };

    get email(){
        return this._email;
    };
    set email(value){
        this._email = new Email(value);
    };

    get cnpj(){
        return this._cnpj;
    };
    set cnpj(value) {
        this._cnpj = new CNPJ(value);
    };

    get cpf(){
        return this._cpf;
    };
    set cpf(value){
        this._cpf = new CPF(value);
    };
};