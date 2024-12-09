import { motorizacaoService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";
import Selecionavel from "../../helpers/Selecionavel.js";

export default class MotorizacaoView{
    motorizacaoPath = '/motorizacao/motorizacao.html'
    _motorizacaoService;
    _carregando;
    _listarSelecionado;

    constructor(motorizacaoService){
        this._motorizacaoService = motorizacaoService;
        this._carregando = new CarregandoPagina("#carregando", "main");
    }

    inicializar(){
        this._bindEvents();
        this._carregando.mostrarCarregado();
        this._listarMotorizacao();
    }

    _bindEvents(){
        this._listarSelecionado = new Selecionavel(".botao-selecionavel", 
            () => {document.querySelectorAll('.botoes-editar-excluir').forEach(btn => btn.removeAttribute('disabled'))}, 
            () => {document.querySelectorAll('.botoes-editar-excluir').forEach(btn => btn.setAttribute('disabled', ''))}
        );

        addEventListenerGlobal('click', "#btnExcluirMotorizacao", () => this._excluirMotorizacao());

        addEventListenerGlobal('keyup', "*", (event) => {
            if(event.key === 'Delete') this._excluirMotorizacao();
        });

        addEventListenerGlobal('click', "#btnEditarMotorizacao", () => this._editarMotorizacao());

        addEventListenerGlobal('click', ".btn-adicionar", () => this._btnAdicionarMotorizacao()); 

        addEventListenerGlobal('click', ".btn-voltar", () => this._btnVoltar());
    }

    _obterMotorizacaoSelecionada(){
        return document.querySelector(".motorizacao.selecionado");
    }

    _excluirMotorizacao(){
        const btnMotorizacaoSelecionada = this._obterMotorizacaoSelecionada() ;

        if(!btnMotorizacaoSelecionada) return;

        const idMotorizacao = btnMotorizacaoSelecionada.getAttribute("data-id");

        const desejaExcluir = confirm("Deseja Excluir essa Motorizção?");

        if(desejaExcluir){
            this._motorizacaoService.deletar(idMotorizacao);

            btnMotorizacaoSelecionada.remove()

            this._listarSelecionado.atualizar()
        }
    }

    _editarMotorizacao(){
        const motorizacaoSelecionada = this._obterMotorizacaoSelecionada();

        if (motorizacaoSelecionada) {
            const idMotorizacao = motorizacaoSelecionada.getAttribute("data-id");

            location.href = "../motorizacao/novamotorizacao/novamotorizasao.html?idMotorizacao=" + idMotorizacao;
        }
    }

    _listarMotorizacao(){
        const motorizacoes = motorizacaoService.listar();
        console.log(motorizacoes)

        const areaConteudo = document.querySelector(".area-conteudo");
        console.log(areaConteudo)

        areaConteudo.innerHTML = "";

        motorizacoes.forEach(motorizacao => {
            areaConteudo.innerHTML += `
                <div class="botao-selecionavel motorizacao" data-id="${motorizacao.id}">${motorizacao.nome}</div>
            `
        });
    }

    _btnAdicionarMotorizacao(){
        window.location.href = "./novamotorizacao/novamotorizasao.html";
    }

    _btnVoltar(){
        window.location.href = "../index.html";
    }
}