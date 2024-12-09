import { motorizacaoService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";

export default class CadastroMotorizacaoView{
    _motorizacaoService;
    _carregando;

    constructor(motorizacaoService){
        this._motorizacaoService = motorizacaoService;
        this._carregando = new CarregandoPagina("#carregando", "main");
    }

    inicializar(){
        this._bindEnvent();

        this._carregarMotorizacaoEdicao();

        this._carregando.mostrarCarregado();
    }

    _bindEnvent(){
        addEventListenerGlobal('click', '#btnSalvarMotorizacao', () => this._btnSalvarMotorizacao());

        addEventListenerGlobal('keypress', '*', (evento) => {
            if(evento.key === "Enter") this._btnSalvarMotorizacao();
        })

        addEventListenerGlobal('click', '#btnCancelarMotorizacao', () => this._btnCancelar());
    }

    _obterCamposMotorizacao(){
        const campoNome = document.querySelector('#nomeMotorizacao');
        const campoId = document.querySelector('#idMotorizacao');
        const camposMotorizacao = {
            campoNome,
            campoId
        }
        return camposMotorizacao;
    }

    _carregarMotorizacaoEdicao(){
        const params = new URLSearchParams(window.location.search);
        const idMotorizacao = params.get('idMotorizacao');
        console.log(idMotorizacao)

        if(!idMotorizacao) return;

        document.querySelector('#adicionarMotorizacao').style.display = "none";
        document.querySelector('#editarMotorizacao').style.display = "";

        const motorizacao = motorizacaoService.get(idMotorizacao);
        console.log(motorizacao)

        const {campoNome, campoId} = this._obterCamposMotorizacao();
        campoNome.value = motorizacao.nome;
        campoId.value = motorizacao.id;
    }

    _validarMotorizacao(){
        const {campoNome} = this._obterCamposMotorizacao();
        const nomeMotorizacao = campoNome.value;
        console.log(nomeMotorizacao)

        if (!nomeMotorizacao) {
            campoNome.classList.add('erro');
            inputMotorizacaoVasia.style.display= '';
            return false;
        } else {
            campoNome.classList.remove('erro');
            inputMotorizacaoVasia.style.display = 'none';
            return true;
        };
    }

    _exibirMotorizacaoView(){
        window.location.href = "../../motorizacao/motorizacao.html";
    }

    _btnSalvarMotorizacao(){
        const {campoNome, campoId} = this._obterCamposMotorizacao();
        console.log(campoNome.value)

        const nomeMotorizacao = campoNome.value;
        const idMotorizacao = campoId.value;

        if (!this._validarMotorizacao(campoNome)) return;

        console.log(idMotorizacao)
        if (idMotorizacao) {
            motorizacaoService.alterar(idMotorizacao, nomeMotorizacao);
        } else {
            motorizacaoService.salvar(nomeMotorizacao);
        }

        this._exibirMotorizacaoView();
    }

    _btnCancelar(){
        this._exibirMotorizacaoView();
    }
}