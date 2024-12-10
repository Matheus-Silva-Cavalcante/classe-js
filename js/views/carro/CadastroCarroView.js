import { carroService, modeloService, pessoaService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";

export default class CadastroCarroView{
    _modeloService;
    _pessoaService
    _carroService;
    _carregando;
    
    constructor(carroService, modeloService, pessoaService){
        this._carroService = carroService;
        this._modeloService = modeloService;
        this._pessoaService = pessoaService;

        this._carregando = new CarregandoPagina('#carregando', '.container');
    }

    inicializar(){
        this._listarModelo();
        this._listarProprietarioAnterior();
        this._listarCliente();

        this._pesquisarCliente()

        this._bindEvente();

        this._carregarCarroEdicao();

        this._carregando.mostrarCarregado();
    }

    _bindEvente(){
        addEventListenerGlobal('click', '#btnSalvarCarro', () => this._btnSalvarCarro());

        addEventListenerGlobal('keypress', '*', (evento) => {
            if (evento.key === 'Enter') this._btnSalvarCarro();
        })

        addEventListenerGlobal('click', '#btnCancelar', () => this._btnCancelar());
    }

    _pesquisarCliente(){
        $(document).ready(function () {
        //change selectboxes to selectize mode to be searchable
            $(".lista-cliente").select2();
        });
    }

    _obterCamposCarro(){
        const campoIdCarro = document.querySelector('#idCarro');
        const campoIdModelo = document.querySelector('#idModelo');
        const campoComplementoCarro  = document.querySelector('#complementoCarro');
        const campoAnoFabricacao = document.querySelector('#anoFabricacao');
        const campoAnoModelo = document.querySelector('#anoModelo');
        const campoQuilometragem = document.querySelector('#quilometragem');
        const campoCorCarro = document.querySelector('#corCarro');
        const campoPlacaCarro = document.querySelector('#placaCarro');
        const campoRenavam = document.querySelector('#nomeroRenavam');
        const campoIdProprietarioAnterior = document.querySelector('#proprietarioAnterior');
        const campoPrecoCompra = document.querySelector('#precoCompra');
        const campoPrecoAnunciado = document.querySelector('#precoAnunciado');
        const campoIdCliente = document.querySelector('#cliente');
        const campoPrecoVenda = document.querySelector('#precoVenda');

        const camposCarro = {
            campoIdCarro,
            campoIdModelo,
            campoComplementoCarro,
            campoAnoFabricacao,
            campoAnoModelo,
            campoQuilometragem,
            campoCorCarro,
            campoPlacaCarro,
            campoRenavam,
            campoPrecoCompra,
            campoPrecoAnunciado,
            campoIdProprietarioAnterior,
            campoIdCliente,
            campoPrecoVenda,
        }

        return camposCarro;
    }

    _listarModelo(){
        const modelos = modeloService.listar();

        const {campoIdModelo} = this._obterCamposCarro()

        campoIdModelo.innerHTML = '';

        modelos.sort((modeloA, modeloB) => {
            if (modeloA.nome > modeloB.nome) {
                return 1
            } else if (modeloB.nome > modeloA.nome) {
                return -1
            } else {
                return 0
            }
        })
        
        modelos.forEach(modelo => {
            campoIdModelo.innerHTML += `
                <option value='${modelo.id}'>${modelo.nome}</option>
            `;
        });
    }

    _listarProprietarioAnterior(){
        const pessoas = pessoaService.listar();

        const {campoIdProprietarioAnterior} = this._obterCamposCarro();

        campoIdProprietarioAnterior.innerHTML = ``;

        pessoas.sort((pessoaA, pessoaB) => {
            if (pessoaA.nome > pessoaB.nome) {
                return 1;
            } else if (pessoaB.nome > pessoaA.nome){
                return -1;
            } else {
                return 0;
            }
        });

        pessoas.forEach(pessoa => {
            campoIdProprietarioAnterior.innerHTML += `
                <option value='${pessoa.id}'>${pessoa.nome}</option>
            `;
        });
    }

    _listarCliente(){
        const pessoas = pessoaService.listar();

        const {campoIdCliente} = this._obterCamposCarro();

        campoIdCliente.innerHTML = `
            <option></option>
        `;

        pessoas.sort((pessoaA, pessoaB) => {
            if (pessoaA.nome > pessoaB.nome) {
                return 1;
            } else if (pessoaB.nome > pessoaA.nome){
                return -1;
            } else {
                return 0;
            }
        });

        pessoas.forEach(pessoa => {
            campoIdCliente.innerHTML += `
                <option value='${pessoa.id}'>${pessoa.nome}</option>
            `;
        });
    }

    _carregarCarroEdicao(){
        const params = new URLSearchParams(window.location.search);
        const idCarro = params.get('idCarro');

        if (!idCarro)  return;
       
        const carro = carroService.get(idCarro);
        console.log(carro)

        const {campoIdCarro, campoIdModelo, campoComplementoCarro, campoAnoFabricacao, campoAnoModelo, campoQuilometragem, campoCorCarro, campoPlacaCarro, campoRenavam, campoPrecoCompra, campoPrecoAnunciado, campoPrecoVenda, campoIdProprietarioAnterior, campoIdCliente} = this._obterCamposCarro();

        campoIdCarro.value = carro.id;
        campoIdModelo.value = carro.modelo.id;
        campoComplementoCarro.value = carro.complementoCarro;
        campoAnoFabricacao.value = carro.anoFabricacao?.valueOf();
        campoAnoModelo.value = carro.anoModelo?.valueOf();
        campoQuilometragem.value = carro.quilometragem?.valueOf();
        campoCorCarro.value = carro.cor;
        campoPlacaCarro.value = carro.placa;
        campoRenavam.value = carro.renavam;
        campoIdProprietarioAnterior.value = carro.proprietarioAnterior.id;
        campoPrecoCompra.value = carro.valorCompra?.valueOf();
        campoPrecoAnunciado.value = carro.valorAnunciado?.valueOf();
        campoIdCliente.value = carro.cliente?.id;
        campoPrecoVenda.value = carro.valorVenda?.valueOf();

    }   

    _exibirCarroView(){
        window.location.href = 'index.html';
    }

    _validarCarro(){
        const {campoIdModelo, campoComplementoCarro, campoAnoFabricacao, campoAnoModelo, campoQuilometragem, campoCorCarro, campoPlacaCarro, campoRenavam, campoPrecoCompra, campoPrecoAnunciado, campoIdCliente,campoLista , campoPrecoVenda} = this._obterCamposCarro();

        const modelos = campoIdModelo.value;
        const complementoCarro = campoComplementoCarro.value;
        const anoFabricacao = campoAnoFabricacao.value;
        const anoModelo = campoAnoModelo.value;
        const quilometragem = campoQuilometragem.value;
        const corCarro = campoCorCarro.value;
        const placaCarro = campoPlacaCarro.value;
        const renavam = campoRenavam.value;
        const precoCompra = campoPrecoCompra.value;
        const precoAnunciado = campoPrecoAnunciado.value;
        const precoVenda = campoPrecoVenda.value;
        const cliente = campoIdCliente.value;

        // if (!modelos) {
        //     campoIdModelo.classList.add('erro');
        //     inputModeloCarroVasia.style.display = '';

        //     return false
        // } else {
        //     campoIdModelo.classList.remove('erro');
        //     inputModeloCarroVasia.style.display = 'none';
        // }

        if (!complementoCarro) {
            campoComplementoCarro.classList.add('erro');
            inputComplementoCarroVasia.style.display = '';

            return false;
        } else {
            campoComplementoCarro.classList.remove('erro');
            inputComplementoCarroVasia.style.display = 'none';
        }

        if (!anoFabricacao) {
            campoAnoFabricacao.classList.add('erro');
            inputAnoFabricacaoVasia.style.display = '';

            return false;
        } else {
            campoAnoFabricacao.classList.remove('erro');
            inputAnoFabricacaoVasia.style.display = 'none';
        }

        if (!anoModelo) {
            campoAnoModelo.classList.add('erro');
            inputAnoModeloVasia.style.display = '';

            return false;
        } else {
            campoAnoModelo.classList.remove('erro');
            inputAnoModeloVasia.style.display = 'none';
        }

        if (!quilometragem) {
            campoQuilometragem.classList.add('erro');
            inputQuilometragemVasia.style.display = '';

            return false;
        } else {
            campoQuilometragem.classList.remove('erro');
            inputQuilometragemVasia.style.display = 'none';
        }

        if (!corCarro) {
            campoCorCarro.classList.add('erro');
            inputCorCarroVasia.style.display = '';

            return false;
        } else {
            campoCorCarro.classList.remove('erro');
            inputCorCarroVasia.style.display = 'none';
        }

        if (!placaCarro) {
            campoPlacaCarro.classList.add('erro');
            inputPlacaCarroVasia.style.display = '';

            return false;
        } else {
            campoPlacaCarro.classList.remove('erro');
            inputPlacaCarroVasia.style.display = 'none';
        }

        if (!renavam) {
            campoRenavam.classList.add('erro');
            inputRenavamVasia.style.display = '';

            return false;
        } else {
            campoRenavam.classList.remove('erro');
            inputRenavamVasia.style.display = 'none';
        }

        if (!precoCompra) {
            campoPrecoCompra.classList.add('erro');
            inputPrecoCompraVasia.style.display = '';

            return false;
        } else {
            campoPrecoCompra.classList.remove('erro');
            inputPrecoCompraVasia.style.display = 'none';
        }

        if (!precoAnunciado) {
            campoPrecoAnunciado.classList.add('erro');
            inputPrecoAnunciadoVasia.style.display = '';

            return false;
        } else {
            campoPrecoAnunciado.classList.remove('erro');
            inputPrecoAnunciadoVasia.style.display = 'none';
        }

        if (!cliente) {
            campoPrecoVenda.classList.remove('erro');
            inputPrecoVendaVasia.style.display = 'none';

            if (precoVenda) {
                campoPrecoVenda.classList.add('erro');
                inputSemCliente.style.display = '';
                return false
            } else {
                campoPrecoVenda.classList.remove('erro');
                inputSemCliente.style.display = 'none';
            }
        }

        if (cliente) {
            campoPrecoVenda.classList.remove('erro');
            inputSemCliente.style.display = 'none';

            if (!precoVenda) {
                campoPrecoVenda.classList.add('erro');
                inputPrecoVendaVasia.style.display = '';

                return false;
            } else {
                campoPrecoVenda.classList.remove('erro');
                inputPrecoVendaVasia.style.display = 'none';
            }
        }   

        return true;
    }

    _btnSalvarCarro(){
        const {campoIdCarro, campoIdModelo, campoComplementoCarro, campoAnoFabricacao, campoAnoModelo, campoQuilometragem, campoCorCarro, campoPlacaCarro, campoRenavam, campoPrecoCompra, campoPrecoAnunciado, campoPrecoVenda, campoIdProprietarioAnterior, campoIdCliente} = this._obterCamposCarro();

        const idCarro = campoIdCarro.value;
        const modelo = campoIdModelo.value;
        const complementoCarro = campoComplementoCarro.value;
        const anoFabricacao = campoAnoFabricacao.value;
        const anoModelo = campoAnoModelo.value;
        const quilometragem = campoQuilometragem.value;
        const corCarro = campoCorCarro.value;
        const placaCarro = campoPlacaCarro.value;
        const renavam = campoRenavam.value;
        const proprietarioAnterior = campoIdProprietarioAnterior.value;
        const precoCompra = campoPrecoCompra.value;
        const precoAnunciado = campoPrecoAnunciado.value;
        const cliente = campoIdCliente.value;
        const precoVenda = campoPrecoVenda.value;

        if(!this._validarCarro(complementoCarro, anoFabricacao, anoModelo, quilometragem, corCarro, placaCarro, renavam, proprietarioAnterior, precoCompra, precoAnunciado, cliente, precoVenda)) return;

        if (idCarro) {
            //id, idModelo, anoFabricacao, anoModelo, quilometragem, cor, placa, renavam, idProprietarioAnterior, valorCompra, valorAnunciado, idCliente, valorVenda
            carroService.alterar(idCarro, modelo, complementoCarro, anoFabricacao, anoModelo, quilometragem, corCarro, placaCarro, renavam, proprietarioAnterior, precoCompra, precoAnunciado, cliente, precoVenda);
        } else {
            if (!cliente) {
                carroService.salvar(modelo, complementoCarro, anoFabricacao, anoModelo, quilometragem, corCarro, placaCarro, renavam, proprietarioAnterior, precoCompra, precoAnunciado, null, null)
            }else{
                carroService.salvar(modelo, complementoCarro, anoFabricacao, anoModelo, quilometragem, corCarro, placaCarro, renavam, proprietarioAnterior, precoCompra, precoAnunciado, cliente, precoVenda);
            }
        }

        this._exibirCarroView();
    }

    _btnCancelar(){
        this._exibirCarroView();
    }
}