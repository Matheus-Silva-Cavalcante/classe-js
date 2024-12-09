export default class ValorMonetario{
    constructor(valor){
        this._validate(valor);

        this._value = valor;
    }

    valueOf(){
        return this._value;
    }

    _validate(value){
        if(!value) return;
        if(isNaN(value)) throw "O valor deve ser composto por número";

        if(value.length <= 0) throw "O valor é obrigatório e não pode ser 0";
    }
}