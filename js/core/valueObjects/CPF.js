export default class CPF{
    constructor(cpf){
        cpf = this._sanitize(cpf);

        this._validate(cpf);

        this._value = cpf
    };

    valueOf(){
        return this._value;
    };

    _sanitize(cpf){
        return cpf.replace?.(/[^\d]+/g,'');
    };

    _validate(cpf){
        if(typeof cpf != "string") throw "CPF precisa ser uma string";

        if(cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) throw "CPF tem que ter 11 números";
        
        [9,10].forEach(function(j){
            var soma = 0, r;
            cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
                soma += parseInt(e) * ((j+2)-(i+1));
            });
            r = soma % 11;
            r = (r <2)?0:11-r;
            if(r != cpf.substring(j, j+1)) throw `O número de CPF "${cpf}" é inválido`;
        });
    };
};