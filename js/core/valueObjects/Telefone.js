export default class Telefone{
    constructor(Telefone){
        if(this._validate(Telefone));
        this._value = Telefone;
    };

    _validate(Telefone){
        if(isNaN(Telefone)) throw "O telefone dever ser composto por número";
        if(!Telefone.match(/^\d{2}?\s*\d{5}\-?\d{4}$/g)) throw `Número de telefone ${Telefone} inválido`;
        // if(Telefone.length !== 11) throw "O número de telefone deve conter 11 caracteres";
    };
};