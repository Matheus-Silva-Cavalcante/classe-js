import { carroceriaService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";
import Selecionavel from "../../helpers/Selecionavel.js";

export default class CarroceriaView{
    _carroceriaPath = "/carroceria/carroceria.html";
    _carroceriaService;
    _carregando;
    _listaSelecionavel;

    constructor(carroceriaService){
        this._carroceriaService = carroceriaService;
        this._carregando = new CarregandoPagina("#carregando", "main");
    }

    inicializar(){
        this._bindEvents()

        this._carregando.mostrarCarregado();

        this._listarCarroceria();
    }

    _bindEvents(){
        this._listaSelecionavel = new Selecionavel(
            ".botao-selecionavel", 

            () => {document.querySelectorAll(".botoes-editar-excluir").forEach(btn => btn.removeAttribute("disabled"));},

            () => {document.querySelectorAll(".botoes-editar-excluir").forEach(btn => btn.setAttribute("disabled", ""));}
        );

        addEventListenerGlobal('click', "#btnExcluirCarroceria", () => this._exlcuirCarroceria());

        addEventListenerGlobal('keyup', '*', (evento) => {
            if(evento.key === "Delete") this._exlcuirCarroceria()
        })

        addEventListenerGlobal('click', '#btnEditarCarroceria', () => this._editarCarroceria());

        addEventListenerGlobal('click', '.btn-adicionar', () => this._btnAdicionarCarroceria());

        addEventListenerGlobal('click', '.btn-voltar', () => this._btnVoltar());
    }

    _obterMotorizacaoSelecionada(){
        return document.querySelector('.carroceria.selecionado');
    }

    _exlcuirCarroceria(){
        const btnCarroceriaSelecionada = this._obterMotorizacaoSelecionada();

        if(!btnCarroceriaSelecionada) return;

        const idCarroceria = btnCarroceriaSelecionada.getAttribute('data-id')

        const desejaExcluir = confirm("Deseja excluir essa Motorização?");

        if (desejaExcluir) {
            this._carroceriaService.deletar(idCarroceria);

            btnCarroceriaSelecionada.remove();

            this._listaSelecionavel.atualizar();
        }
    }

    _editarCarroceria(){
        const carroceriaSelecionada = this._obterMotorizacaoSelecionada();
        
        if (carroceriaSelecionada) {
            const idCarroceria = carroceriaSelecionada.getAttribute('data-id');

            location.href = '../carroceria/novacarroceria/novacarroceria.html?idCarroceria=' + idCarroceria;
        }
    }

    _listarCarroceria(){
        const carrocerias = carroceriaService.listar()

        const areaConteudo = document.querySelector(".area-conteudo");

        areaConteudo.innerHTML = "";

        carrocerias.forEach(carroceria => {
            areaConteudo.innerHTML += `
                <div class="botao-selecionavel carroceria" data-id="${carroceria.id}">${carroceria.nome}</div>
            `;
        });
    }

    _btnAdicionarCarroceria(){
        window.location.href = './novacarroceria/novacarroceria.html';
    }

    _btnVoltar(){
        window.location.href = '../index.html';
    }
}