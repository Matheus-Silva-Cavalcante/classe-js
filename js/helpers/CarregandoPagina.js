export default class CarregandoPagina{
    _carregando;
    _carregado;

    constructor(carregando, carregado){
        this._carregando = carregando;
        this._carregado = carregado;
    }

    mostrarCarregando(){
        document.querySelector(this._carregando).style.display = "";
        document.querySelector(this._carregado).style.display = "none";
    }

    mostrarCarregado(){
        document.querySelector(this._carregando).style.display = "none";
        document.querySelector(this._carregado).style.display = "";
    }
}