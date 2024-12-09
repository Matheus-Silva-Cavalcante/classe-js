import { carroceriaService, marcaService, modeloService, motorizacaoService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";
import Selecionavel from "../../helpers/Selecionavel.js";

export default class ModeloView{
    _modeloPath = '/carroceria/carroceria.html';
    _modeloService;
    _marcaService;
    _motorizacaoService; 
    _carroceriaService;
    _carregando;
    _listarSelecionavel;

    constructor(modeloService, marcaService, motorizacaoService, carroceriaService){
        this._modeloService = modeloService;
        this._marcaService = marcaService;
        this._motorizacaoService = motorizacaoService;
        this._carroceriaService = carroceriaService;
        this._carregando = new CarregandoPagina('#carregando', 'main');
    }

    inicializar(){
        this._bindEvents();

        this._carregando.mostrarCarregado();

        this._listarModelo();
    }

    _bindEvents(){
        this._listarSelecionavel = new Selecionavel(
            '.botao-selecionavel',
            () => {document.querySelectorAll('.botoes-editar-excluir').forEach(btn => btn.removeAttribute('disabled'));}, 
            () => {document.querySelectorAll('.botoes-editar-excluir').forEach(btn => btn.setAttribute('disabled', ''));}
        );

        addEventListenerGlobal('click', '#btnExcluirModelo', () => this._excluirModelo());

        addEventListenerGlobal('keyup', '*', (evento) =>{
            if(evento.key === 'Delete') this._excluirModelo();
        })

        addEventListenerGlobal('click', '#btnEditarModelo', () => this._editarModelo());

        addEventListenerGlobal('click', '.btn-adicionar', () => this._btnAdicionarModelo());

        addEventListenerGlobal('click', '.btn-voltar', () => this._btnVoltar());
    }

    _obterModeloSelecionado(){
        return document.querySelector('.modelo.selecionado');
    }

    _excluirModelo(){
        const modeloSelecionado = this._obterModeloSelecionado();

        const idModelo = modeloSelecionado.getAttribute('data-id');

        const desejaExcluir = confirm("Deseja excluir esse Modelo?");

        if(desejaExcluir){
            this._modeloService.deletar(idModelo);

            modeloSelecionado.remove();

            this._listarSelecionavel.atualizar();
        }
    }

    _editarModelo(){
        const modeloSelecionado = this._obterModeloSelecionado();
        console.log(modeloSelecionado);

        if(modeloSelecionado){
            const idModelo = modeloSelecionado.getAttribute('data-id');

            location.href = '../modelos/novomodelo/novomodelo.html?idModelo=' + idModelo;
        }
    }

    _listarModelo(){
        const modelos = modeloService.listar();

        const areaConteudo = document.querySelector('.area-conteudo');

        areaConteudo.innerHTML = "";

        modelos.forEach(modelo => {
            areaConteudo.innerHTML += `
                <div class="botao-selecionavel modelo" data-id = "${modelo.id}">
                    <div class="conteudo-nome">${modelo.nome}</div>

                    <div class="conteudo-texto">${modelo.marca.nome}</div>

                    <div class="conteudo-texto">${modelo.motorizacao.nome}</div>

                    <div class="conteudo-texto">${modelo.carroceria.nome}</div>

                    <div class="conteudo-texto">${modelo.portas} Portas</div>
                </div>
            `;
        });
    }

    _btnAdicionarModelo(){
        const listarCarroceria = carroceriaService.listar();
        const listarMarca = marcaService.listar();
        const listarMotorizacao = motorizacaoService.listar();

        if (listarCarroceria.length && listarMarca.length && listarMotorizacao.length > 0) {
            window.location.href = './novomodelo/novomodelo.html';            
        } else {
            alert('Para você cadastrar um modelo, é preciso ter cadastro de Carroceria, Motorização e Marca.');
        }
    }

    _btnVoltar(){
        window.location.href = '../index.html';
    }
}