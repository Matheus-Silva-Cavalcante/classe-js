import { marcaService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";
import Selecionavel from "../../helpers/Selecionavel.js";

export default class MarcaView{
    _marcaPath = '/marcas/marcas.html';
    _marcaService;
    _listaSelecionavel;
    _carregando;

    constructor(marcaService){
        this._marcaService = marcaService;
        this._carregando = new CarregandoPagina("#carregando", "main");
    }

    inicializar(){
        this._bindEvents();
        this._carregando.mostrarCarregado();

        this._listarMarcas();
    }

    _bindEvents(){
        this._listaSelecionavel = new Selecionavel(
            ".botao-selecionavel", 

            () => {
                document.querySelectorAll('.botoes-editar-excluir').forEach(btn => btn.removeAttribute('disabled'));
            },

            ()=>{
                document.querySelectorAll('.botoes-editar-excluir').forEach(btn => btn.setAttribute('disabled', ''));
            }
        );

        addEventListenerGlobal('click', '#btnExcluirMarca', () => this._excluirMarca());

        addEventListenerGlobal('keyup', "*", (event) => {
            if(event.key === 'Delete') this._excluirMarca();
        });

        addEventListenerGlobal('click', '#btnEditarMarca', () => this._editarMarca());

        addEventListenerGlobal('click', '.btn-adicionar', () => this._adicionarMarca());
        
        addEventListenerGlobal('click', '.btn-voltar', () => this._btnVoltar())
    }

    _obterMarcaSelecionada(){
        return document.querySelector('.marca.selecionado');
    }

    _excluirMarca(){
        const btnMarcaSelecionada = this._obterMarcaSelecionada();
        
        if(!btnMarcaSelecionada) return;

        const idMarca = btnMarcaSelecionada.getAttribute('data-id');
    
        const desejaExcluir = confirm('Deseja Excluir essa Marca?');

        if (desejaExcluir) {   
            //remover a marca do repositorio
            this._marcaService.deletar(idMarca);
            
            //remover o elemento
            btnMarcaSelecionada.remove();

            //desabilitar botões
            this._listaSelecionavel.atualizar();
        };
    }

    _editarMarca(){
        const marcaSelecionada = this._obterMarcaSelecionada();
        
        if (marcaSelecionada) {
            const idMarca = marcaSelecionada.getAttribute('data-id');
    
            location.href = '../marcas/novamarca/novamarca.html?idMarca=' + idMarca;
        };
    }

    _listarMarcas(){
        const marcas = marcaService.listar();
        
        const areaConteudo = document.querySelector(".area-conteudo");

        areaConteudo.innerHTML = "";

        marcas.forEach(marca => {
            console.debug(marca)
            
            areaConteudo.innerHTML += `
            <div class="botao-selecionavel marca" data-id="${marca.id}">${marca.nome}</div>
        `;
        });
    }

    _adicionarMarca(){
        window.location.href = "./novamarca/novamarca.html";
    }

    _btnVoltar(){
        window.location.href = "../index.html";
    }
}