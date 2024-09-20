export default class Telefone{
    constructor(telefone){
        telefone = this._sanitize(telefone);
        
        this._validate(telefone);

        this._value = telefone;
    };

    _valueOf(){
        return this._value;
    };

    _sanitize(telefone){
        return telefone.replace?.(/[^\d]+/g,'');
    };

    _validate(telefone){
        if(!telefone.match(/^\d{10,11}$/g)) throw `Número de telefone ${telefone} é inválido`;
    };
};