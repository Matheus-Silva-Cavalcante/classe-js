export default class CNPJ{
    constructor(cnpj){
        cnpj = this._sanitize(cnpj);

        this._validate(cnpj);

        this._value = cnpj;
        
    };

    valueOf(){
        return this._value;
    };

    _sanitize(cnpj){
        return cnpj.replace?.(/[^\d]+/g,'');
    };

    _validate(cnpj){
        if(typeof cnpj != "string") throw "CNPJ precisa ser uma string";

        if (cnpj.length !== 14) throw "O CNPJ precisa ter 14 caracteres";

        if (/^(.)\1+$/.test(cnpj)) throw `O CNPJ ${cnpj} não pode ter números repetidos`;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        };

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado !== parseInt(digitos.charAt(0), 10)) throw `CNPJ ${cnpj} não é válido`;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        };

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        return resultado === parseInt(digitos.charAt(1), 10);
    };
};

