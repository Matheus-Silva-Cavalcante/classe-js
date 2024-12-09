import { carroceriaService, carroService, marcaService, modeloService, motorizacaoService, pessoaService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal, filtrarCarro } from "../../helpers/eventsHelper.js";
import { formataValorMonetario } from "../../helpers/formataValorMonetario.js";
import Selecionavel from "../../helpers/Selecionavel.js";

export default class CarroView{
    _carroService;
    _carregando;
    _listarSelecionado;
    _maisInformacao;

    constructor(carroService){
        this._carroService = carroService;
        this._carregando = new CarregandoPagina('#carregando', 'main');
    }

    inicializar(){
        this._listarCarroceria();

        this._listarMotorizacao();

        this._listarMarcas();

        this._listarModelo();

        this._bindEvents();

        this._listarCarro();
        
        this._carregando.mostrarCarregado();
    }

    _bindEvents(){
        this._listarSelecionado = new Selecionavel('.botao-selecionavel',
            () =>{document.querySelectorAll('.botoes-icon').forEach(btn => btn.removeAttribute('disabled'));},
            () =>{document.querySelectorAll('.botoes-icon').forEach(btn => btn.setAttribute('disabled', ''));}
        );

        addEventListenerGlobal('input', '.input-busca, .select-busca', (evento) => {
            const elementoAlterado = evento.target
            if (elementoAlterado.value === '') {
                elementoAlterado.classList.remove('alterado');
            } else {
                elementoAlterado.classList.add('alterado');
            }

            const display = document.querySelectorAll('.input-busca.alterado, .select-busca.alterado').length ? '' : 'none';
            
            this._obterCamposCarro().btnLimparFiltro.style.display = display;

            this._filtrar()
        });

        addEventListenerGlobal('click', '#btnBuscarCarro', () => this._filtrar());

        addEventListenerGlobal('keypress', '*', (evento) => {
            if(evento.key === 'Enter')  this._filtrar();
        });

        addEventListenerGlobal('click', '#limparFiltro', () => this._limparFiltro());

        addEventListenerGlobal('click', '.botao-selecionavel', () => this._exibirInformacoesCarro());

        addEventListenerGlobal('click', '#btnExclirCarro', () => this._btnExcluiCarro());

        addEventListenerGlobal('keyup', '*', (evento) => {
            if (evento.key === "Delete")  this._btnExcluiCarro();
        });

        addEventListenerGlobal('click', '#btnEditarCarro', () => this._btnEditerCarro());

        addEventListenerGlobal('click', '#btnAdicionarCarro', () => this._btnAdicionarCarro());
    }

    _obterCarroSelecionado(){
        return document.querySelector('.carro.selecionado');
    }

    _exibirInformacoesCarro(){
        document.querySelectorAll('.botao-selecionavel').forEach(informacao => {
            const informacaoCarro = informacao.classList.contains('selecionado');

            if (informacaoCarro) {
                // informacao.querySelector('#informacoesCarro').style.display = 'none';
                informacao.querySelector('#detalhesCarro').style.display = '';
            } else {
                // informacao.querySelector('#informacoesCarro').style.display = '';
                informacao.querySelector('#detalhesCarro').style.display = 'none';
            }
        });
    }

    _obterCamposCarro(){
        const campoBusca = document.querySelector('.input-busca');
        const btnLimparFiltro = document.querySelector('#limparFiltro');
        const campoIdCarroceria =  document.querySelector('#selectCarroceria');
        const campoIdMotorizacao = document.querySelector('#selectMotorizacao');
        const campoIdMarca = document.querySelector('#selectMarca');
        const campoIdModelo = document.querySelector('#selectModelos');

        const camposCarro = {
            campoBusca,
            btnLimparFiltro,
            campoIdCarroceria,
            campoIdMotorizacao,
            campoIdMarca,
            campoIdModelo,
        }

        return camposCarro;
    }

    _listarCarroceria(){
        const carrocerias = carroceriaService.listar();

        const { campoIdCarroceria } = this._obterCamposCarro();

        campoIdCarroceria.innerHTML = `
            <option value=''>Carroceria</option>
        `;

        carrocerias.forEach(carroceria => {
            campoIdCarroceria.innerHTML += `
                <option value='${carroceria.id}'>${carroceria.nome}</option>
            `;
        });
    }

    _listarMotorizacao(){
        const motorizacoes = motorizacaoService.listar();

        const { campoIdMotorizacao } = this._obterCamposCarro();

        campoIdMotorizacao.innerHTML = `
            <option value=''>Motorização</option>
        `;

        motorizacoes.forEach(motorizacao =>{
            campoIdMotorizacao.innerHTML += `
                <option value='${motorizacao.id}'>${motorizacao.nome}</option>
            `;
        });
    }

    _listarMarcas(){
        const marcas = marcaService.listar();

        const {campoIdMarca} = this._obterCamposCarro();

        campoIdMarca.innerHTML = `
            <option value=''>Marca</option>
        `;

        marcas.forEach(marca => {
            campoIdMarca.innerHTML += `
                <option value='${marca.id}'>${marca.nome}</option>
            `;
        });
    }

    _listarModelo(){
        const modelos = modeloService.listar();

        const { campoIdModelo } = this._obterCamposCarro();

        campoIdModelo.innerHTML = `
            <option value=''>Modelo</option>
        `;

        modelos.forEach(modelo => {
            campoIdModelo.innerHTML += `
                <option value='${modelo.id}'>${modelo.nome}</option> 
            `;
        });
    }

    _filtrar(){
        const camposCarro = this._obterCamposCarro()

        const filtro = {}

        if (camposCarro.campoIdCarroceria.value) {
            filtro.carroceria = camposCarro.campoIdCarroceria.value;
        }

        if (camposCarro.campoIdMotorizacao.value) {
            filtro.motorizacao = camposCarro.campoIdMotorizacao.value;
        }

        if (camposCarro.campoIdMarca.value) {
            filtro.marca = camposCarro.campoIdMarca.value;
        }

        if (camposCarro.campoIdModelo.value) {
            filtro.modelo = camposCarro.campoIdModelo.value;
        }

        console.log(filtro)

        filtrarCarro(filtro, camposCarro.campoBusca.value)
    }

    _limparFiltro(){
        const limparFiltro = document.querySelectorAll('.select-busca.alterado, .input-busca.alterado');

        limparFiltro.forEach(elemento => {
            console.log(elemento.value)
            elemento.value = '';
            elemento.classList.remove('alterado')
        });

        const {btnLimparFiltro} = this._obterCamposCarro();

        btnLimparFiltro.style.display = 'none'

        this._filtrar()
    }

    _btnExcluiCarro(){
        const carroSelecionada = this._obterCarroSelecionado();

        const idCarro = carroSelecionada.getAttribute('data-id');

        const desejaExcluir = confirm('Deseja Excluir esse Carro?');

        if (desejaExcluir) {
            this._carroService.deletar(idCarro);

            carroSelecionada.remove();

            this._listarSelecionado.atualizar();    
        }
    }

    _btnEditerCarro(){
        const carroSelecionada = this._obterCarroSelecionado();

        if (carroSelecionada) {
            const idCarro = carroSelecionada.getAttribute('data-carro-id');
            console.log(idCarro)

            location.href = 'novocarro.html?idCarro=' + idCarro;
        }
    }

    _listarCarro(){
        const carros = carroService.listar();

        const areaDivugacao = document.querySelector('.area-divugacao');

        areaDivugacao.innerHTML = '';

        carros.forEach(carro => {
            const valorVeiculoAnunciado = formataValorMonetario(parseInt(carro.valorAnunciado.valueOf()));
            const valorVeiculoVenda = formataValorMonetario(parseInt(carro.valorVenda.valueOf()));
            const valorVeiculoCompra = formataValorMonetario(parseInt(carro.valorCompra.valueOf()))

            areaDivugacao.innerHTML += `
                <div class="botao-selecionavel divugacao carro" data-carro-id='${carro.id}' data-carroceria-id='${carro.modelo.carroceria?.id}' data-motorizacao-id='${carro.modelo.motorizacao?.id}' data-marca-id='${carro.modelo.marca?.id}' data-modelo-id='${carro.modelo?.id}'>
                    <div class="divugacao-img">
                        <img class="divugacao-img-carro" src="img/carro2.svg" alt="Foto do carro a venda">
                    </div>
    
                    <div class="divugacao-especificacao">
                        <div class="informaceos" id="informacoesCarro" >
                            <div class="especificacao-modelo">${carro.modelo?.nome}</div>
    
                            <div class="div-especificacao">
                                <div class="especificacao">${carro.modelo.marca?.nome}</div>
                                
                                <div class="especificacao">${carro.complementoCarro.valueOf()}</div>
        
                                <div class="especificacao">${carro.modelo.motorizacao?.nome}</div>
        
                                <div class="especificacao">${carro.modelo.carroceria?.nome}</div>

                                <div class="especificacao">${carro.modelo?.portas} Portas</div>
        
                                <div class="especificacao">${carro.cor}</div>

                                <div class="especificacao">Ano Fabricação: ${carro.anoFabricacao?.valueOf()}</div>
                                
                                <div class="especificacao">Ano modelo: ${carro.anoModelo?.valueOf()}</div>
                            </div>

                            <div class="informaceos" id="detalhesCarro" style="display: none;">    
                            <div class="div-especificacao">
                                <div class="especificacao">Placa: ${carro.placa}</div>

                                <div class="especificacao">Renavam: ${carro.renavam}</div>

                                <div class="especificacao">Proprietario anterior: ${carro.proprietarioAnterior?.nome}</div>
        
                                <div class="especificacao">Valor de compra: ${valorVeiculoCompra}</div>
                                                                
                                <div class="especificacao">${!carro.cliente ? "" : 'Cliente: ' + carro.cliente?.nome}</div>
                                
                                <div class="especificacao">${!carro.valorVenda.valueOf() ? "" : 'Valor de venda: ' + valorVeiculoVenda}</div>
                            </div>
                        </div>
        
                        <div class="especificacao-preco-km">
                            <div class="preco-km">
                                <div class="especificacao-km">${carro.quilometragem}km</div>
        
                                <div class="especificacao-preco">${valorVeiculoAnunciado}</div>
                            </div>
                            
                            <div class="vendido">${carro.cliente ? "Vendido" : ""}</div>
                        </div>

                        
                    </div>
                </div>
            `;
        });
    }

    _btnAdicionarCarro(){
        const listarModelos = modeloService.listar();
 
        if (listarModelos.length > 0) {
            location.href = 'novocarro.html';
        } else {
            alert('Você não tem um modelo cadastrado. Para adicionar um carro, você precisa ter um cadastro de Modelos e de Pessoas.');
        }
    }
}