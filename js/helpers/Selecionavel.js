import { addEventListenerGlobal } from "./eventsHelper.js";

export default class Selecionavel{
    _seletor;
    _classeSelecionado = "selecionado";
    _callbackSelecionado;
    _callbackNenhumSelecionado;

    constructor(seletor, callbackSelecionado, callbackNenhumSelecionado){
        this._seletor = seletor;
        this._callbackSelecionado = callbackSelecionado;
        this._callbackNenhumSelecionado = callbackNenhumSelecionado;

        this._bindEvents();
        this.atualizar();
    }

    _bindEvents(){
        addEventListenerGlobal('click', this._seletor, (event) => this._selecionar(event.target.closest(this._seletor)));
    }

    _selecionar(elemento){
        const estaSelecionado = elemento.classList.contains( this._classeSelecionado );
    
        if (estaSelecionado) {
            elemento.classList.remove(this._classeSelecionado); 

            this._callbackNenhumSelecionado?.();

        } else{
            const outroElementoSeleciondo = document.querySelectorAll(`.${this._classeSelecionado}`);

            if (outroElementoSeleciondo) {
                document.querySelectorAll(`.${this._classeSelecionado}`).forEach(classAtivo => {
                    classAtivo.classList.remove(this._classeSelecionado);
                });
                
                elemento.classList.add(this._classeSelecionado);

                this._callbackSelecionado?.(elemento);
            };
        };
    }

    atualizar(){
        if(document.querySelectorAll(`${this._seletor}.${this._classeSelecionado}`).length){
            this._callbackSelecionado?.()
        } else{
            this._callbackNenhumSelecionado?.()
        }
    }
}