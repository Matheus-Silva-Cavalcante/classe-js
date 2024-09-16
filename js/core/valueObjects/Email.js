export default class Email{
    constructor(Email){
        if(this._validate(Email));
        this._value = Email;
    };

    valueOf(){
        return this._value;
    };

    _validate(Email){
        if(!Email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/)) throw `O email "${Email}" não é válido`;

        return true;
    };
};