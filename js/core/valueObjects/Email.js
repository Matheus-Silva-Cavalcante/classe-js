export default class Email{
    constructor(email){
        email = this._sanitize(email);
        this._validate(email);
        this._value = email;
    };

    valueOf(){
        return this._value;
    };

    _sanitize(email){
        return email.trim();
    };

    _validate(email){
        if(!email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/)) throw `O email "${email}" não é válido`;
    };
};