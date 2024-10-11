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

    get razaoSocial(){
        return this._razaoSocial;
    };
    set razaoSocial(value){
        // console.log(value);
        if(!value) return;
        if(this._isPJ === false) throw "Razão Social é para pessoa Jurídica";

        if(typeof value != 'string') throw "Nome da Razão Social precisa ser uma string";
        if(value.length < 3) throw "O mone precisa ter pelo menos 3 caracteres";

        this._razaoSocial = value;
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

    // _isPJ = false;//valor padrão do campo
    get isPJ(){
        return this._isPJ;
    };
    set isPJ(value){
        if(typeof value !== "boolean") throw "O campo isPJ precisa ser um boolean";
            
        // true > pessoa juridca > nao pode receber o CPF
        // false > pessoa fisica > nao pode receber o CNPJ

        if(value && this._cpf) throw "Pessoa Jurídica não pode receber o CPF";
        if(value && this._cnpj) throw "Pessoa Física não pode receber o CNPJ";

        this._isPJ = value;     
    };

    get cnpj(){
        return this._cnpj;
    };
    set cnpj(value) {
        // console.log(this._isPJ, "pessoa jurídica")
        if(!value) return;
        if(this._isPJ === false) throw "Não é pssivel colocar o CPF em pessoa Jurídica";

        this._cnpj = new CNPJ(value);
    };

    get cpf(){
        return this._cpf;
    };
    set cpf(value){
        // console.log(this._isPJ, "pessoa física1")
        if(!value) return;
        if(this._isPJ === true) throw "Não é possivel colocar o CNPJ em pessoa Física";

        this._cpf = new CPF(value);
    };
};