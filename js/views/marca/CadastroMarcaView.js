import { marcaService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";

export default class CadastroMarcaView{
    _marcaService;
    _carregando;

    constructor(marcaService){
        this._marcaService = marcaService;
        this._carregando = new CarregandoPagina("#carregando", "main");
    }

    inicializar(){
        this._bindEvents();
        
        this._carregarMarcaEdicao();

        this._carregando.mostrarCarregado();
    }

    _bindEvents(){
        addEventListenerGlobal('click', '#btnSalvarMarca', () => this._btnSalvarMarca());

        addEventListenerGlobal('keypress', '*', (evento) => {
            if(evento.key === "Enter") this._btnSalvarMarca();
        });

        addEventListenerGlobal('click', '#btnCancelarMarca', () => this._btnCancelar());
    }

    _obterCamposMarca(){
        const campoNome = document.querySelector('#nomeMarca');
        const campoId = document.querySelector('#idMarca');
        const camposMarca = {
            campoNome,
            campoId
        }
        return camposMarca;
    }

    _carregarMarcaEdicao(){
        const params = new URLSearchParams(window.location.search);
        const idMarca = params.get('idMarca');

        if(!idMarca) return;

        document.querySelector("#adicionarMarca").style.display = "none";
        document.querySelector("#editarMarca").style.display = "";
        
        const marca = marcaService.get(idMarca)

        const {campoNome, campoId} = this._obterCamposMarca();
        campoNome.value = marca.nome
        campoId.value = marca.id
    }

    _exibirMarcaView(){
        window.location.href = "../../marcas/marcas.html";
    }

    _validarMarca(){
        const {campoNome} = this._obterCamposMarca();
        const nomeMarca = campoNome.value;
        
        if (!nomeMarca) {
            campoNome.classList.add('erro');
            inputMarcaVasia.style.display = "";
            return false;
        } else{
            campoNome.classList.remove('erro');
            inputMarcaVasia.style.display = 'none';
            return true;
        };
    }

    _btnSalvarMarca(){
        const {campoNome, campoId} = this._obterCamposMarca();
        console.log(campoId.value)

        const nomeMarca = campoNome.value;
        const idMarca = campoId.value;

        console.log(nomeMarca)
        if(!this._validarMarca(campoNome)) return

        if(idMarca){
            marcaService.alterar(idMarca, nomeMarca);            
        } else {           
            marcaService.salvar(nomeMarca);    
        }

        this._exibirMarcaView()
    }

    _btnCancelar(){
        this._exibirMarcaView()
    }
}