import { carroceriaService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";

export default class CadastroCarroceriaView{
    _carroceriaService;
    _carregando;

    constructor(carroceriaService){
        this._carroceriaService = carroceriaService;
        this._carregando = new CarregandoPagina('#carregando', 'main');
    }

    inicializar(){
        this._bindEvents()

        this._carregarCarroceriaEdicao()

        this._carregando.mostrarCarregado();
    }

    _bindEvents(){
        addEventListenerGlobal('click', '#btnSalvarCarroceria', () => this._btnSalvarCarroceria());

        addEventListenerGlobal('keypress', '*', (evento) => {
            if(evento.key === "Enter") this._btnSalvarCarroceria();
        });

        addEventListenerGlobal('click', '#btnCancelarCarroceria', () => this._tbnCancelar());
    }

    _obterCampoCarroceria(){
        const campoNome = document.querySelector('#nomeCarroceria');
        const campoId = document.querySelector('#idCarroceria');
        const camposCarroceria = {
            campoNome,
            campoId
        }
        return camposCarroceria
    }

    _carregarCarroceriaEdicao(){
        const params = new URLSearchParams(window.location.search);
        const idCarroceria = params.get('idCarroceria');

        if(!idCarroceria) return;

        document.querySelector('#adicionarCarroceria').style.display = "none";
        document.querySelector('#editarCarroceria').style.display = "";

        const carroceria = carroceriaService.get(idCarroceria);

        const {campoNome, campoId} = this._obterCampoCarroceria();
        campoNome.value = carroceria.nome;
        campoId.value = carroceria.id;
    }

    _validarCarroceria(){
        const {campoNome} = this._obterCampoCarroceria();
        const nomeCarroceria = campoNome.value

        if (!nomeCarroceria) {
            campoNome.classList.add('erro');
            inputCarroceriaVasia.style.display= '';
            return false;
        } else {
            campoNome.classList.remove('erro');
            inputCarroceriaVasia.style.display = 'none';
            return true;
        };
    }

    _exibirCarroceriaView(){
        window.location.href = '../../carroceria/carroceria.html';
    }

    _btnSalvarCarroceria(){
        const {campoNome, campoId} = this._obterCampoCarroceria();

        const nomeMarca = campoNome.value;
        const idMarca = campoId.value;

        if(!this._validarCarroceria(campoNome)) return;

        if (idMarca) {
            carroceriaService.alterar(idMarca, nomeMarca);
        } else {
            carroceriaService.salvar(nomeMarca);
        }

        this._exibirCarroceriaView()
    }

    _tbnCancelar(){
        this._exibirCarroceriaView()
    }
}