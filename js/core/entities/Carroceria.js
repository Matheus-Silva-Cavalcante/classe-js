export default class Carroceria {
    get id(){
        return this._id;
    };
    set id(value){
        if(isNaN(value)) throw "O id precisa ser um número";
        this._id = value;
    };

    get nome(){
        return this._nome;
    };
    set nome(value){
        if(typeof value != 'string') throw "Nome da Carroceria deve ser escrito em texto";
        if(!value.match(/[a-z][A-Z]*/)) throw "O nome da Carroceria precisa ser composto por letras";

        this._nome = value;
    };
};