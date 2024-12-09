import { carroceriaService, marcaService, modeloService, motorizacaoService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";

export default class CadastroModeloView{
    _modeloService;
    _marcaService;
    _motorizacaoService; 
    _carroceriaService;
    _carregando;

    constructor(modeloService, marcaService, motorizacaoService, carroceriaService){
        this._modeloService = modeloService;
        this._marcaService = marcaService;
        this._motorizacaoService = motorizacaoService;
        this._carroceriaService = carroceriaService;
        this._carregando = new CarregandoPagina('#carregando', '.container');
    }

    inicializar(){
        this._listarMarcas();
        this._listarMotorizacao();
        this._listarCarroceria();

        this._bindEvents();

        this._carregarModeloEdicao();

        this._carregando.mostrarCarregado();
    }

    _bindEvents(){
        addEventListenerGlobal('click', '#btnSalvarModelo', () => this._btnSalvarModelo());

        addEventListenerGlobal('keypress', '*', (evento) => {
            if(evento.key === "Enter") this._btnSalvarModelo();
        })

        addEventListenerGlobal('click', '#btnCancelarModelo', () => this._btnCancelar());
    }

    _obterCamposModelo(){
        const campoNome = document.querySelector('#nomeModelo');
        const campoId = document.querySelector('#idModelo');
        const campoIdMarca = document.querySelector('#idMarca');
        const campoIdMotorizacao = document.querySelector('#idMotorizacao');
        const campoIdCarroceria = document.querySelector('#idCarroceria');
        const campoPortas = document.querySelector('#numeroPortas');
         
        const camposModelo = {
            campoNome,
            campoId,
            campoIdMarca,
            campoIdMotorizacao,
            campoIdCarroceria,
            campoPortas,
        }

        return camposModelo;
    }

    _listarMarcas(){
        const marcas = marcaService.listar();

        const {campoIdMarca} = this._obterCamposModelo();

        campoIdMarca.innerHTML = "";

        marcas.forEach(marca => {
            campoIdMarca.innerHTML += `
                <option value="${marca.id}">${marca.nome}</option>
            `;
        });
    }

    _listarMotorizacao(){
        const motorizacoes = motorizacaoService.listar();
        console.log(motorizacoes)

        const {campoIdMotorizacao} = this._obterCamposModelo();

        campoIdMotorizacao.innerHTML = "";

        motorizacoes.forEach(motorizacao => {
            campoIdMotorizacao.innerHTML += `
                <option value="${motorizacao.id}">${motorizacao.nome}</option>
            `
        });
    }

    _listarCarroceria(){
        const carrocerias = carroceriaService.listar();
        console.log(carrocerias)

        const {campoIdCarroceria} = this._obterCamposModelo();        

        campoIdCarroceria.innerHTML = "";

        carrocerias.forEach(carroceria => {
            campoIdCarroceria.innerHTML += `
                <option value="${carroceria.id}">${carroceria.nome}</option>
            `;
        });
    }

    _carregarModeloEdicao(){
        const params = new URLSearchParams(window.location.search);
        const idModelo = params.get('idModelo');

        if(!idModelo) return;

        document.querySelector('#adicionarModelo').style.display = "none";
        document.querySelector('#editarModelo').style.display = "";

        const modelo = modeloService.get(idModelo);

        const {campoNome, campoId, campoIdMarca, campoIdMotorizacao, campoIdCarroceria, campoPortas} = this._obterCamposModelo();
        campoNome.value = modelo.nome;
        campoId.value = modelo.id;
        campoIdMarca.value = modelo.marca.id;
        campoIdMotorizacao.value = modelo.motorizacao.id;
        campoIdCarroceria.value = modelo.carroceria.id;
        campoPortas.value = modelo.portas;
    }

    _validarModelo(){
        const {campoNome, campoPortas} = this._obterCamposModelo();
        const nomeModelo = campoNome.value;
        const portas = campoPortas.value;

        if(!nomeModelo){
            campoNome.classList.add('erro');
            inputModeloVasia.style.display = '';            

            return false;
        } else {
            campoNome.classList.remove('erro');
            inputModeloVasia.style.display = 'none';
        }

        if(!portas){
            campoPortas.classList.add('erro');
            inputPortaVasia.style.display = '';
            
            return false;
        } else {
            campoPortas.classList.remove('erro');
            inputPortaVasia.style.display = 'none';
        }
        return true;
    }

    _exibirModeloView(){
        window.location.href = '../../modelos/modelos.html';
    }

    _btnSalvarModelo(){
        const {campoNome, campoId, campoIdMarca, campoIdMotorizacao, campoIdCarroceria, campoPortas} = this._obterCamposModelo();

        const nomeModelo = campoNome.value;
        const idModelo = campoId.value;
        const nomeMarca = campoIdMarca.value;
        const nomeMotorizacao = campoIdMotorizacao.value;
        const nomeCarroceria = campoIdCarroceria.value;
        const portas = campoPortas.value;
        console.log(campoIdMarca.value)

        if(!this._validarModelo(nomeModelo, portas)) return;

        if(idModelo){
            modeloService.alterar(idModelo, nomeModelo, nomeMarca, nomeMotorizacao, nomeCarroceria, portas);
        } else {
            modeloService.salvar(nomeModelo, nomeMarca, nomeMotorizacao, nomeCarroceria, portas);
        }

        this._exibirModeloView();
    }

    _btnCancelar(){
        this._exibirModeloView();
    }
}