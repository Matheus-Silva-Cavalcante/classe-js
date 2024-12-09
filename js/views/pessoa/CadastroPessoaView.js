import { pessoaService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";

export default class CadastroPessoaView{
    _pessoaService
    _carregendo;

    constructor(pessoaService){
        this._pessoaService = pessoaService;
        this._carregendo = new CarregandoPagina('#carregando', '.container')
    }

    inicializar(){
        this._bindEvent();

        this._carregarPessoaEdicao();

        this._qualTipoPessoa();

        this._carregendo.mostrarCarregado();
    }

    _bindEvent(){
        addEventListenerGlobal('click', '#btnCancelarPessoa', () => this._btnCancelar());

        addEventListenerGlobal('click', '#btnSalvarPessoa', () => this._btnSalvarPessoa());

        addEventListenerGlobal('keypress', '*', (evento) => {
            if(evento.key === 'Enter') this._btnSalvarPessoa();
        });

        addEventListenerGlobal('click', '#tipoPessoa', () => this._qualTipoPessoa());
    }

    _qualTipoPessoa(){
        const tipoPessoa = document.querySelector('#tipoPessoa').value;
        const pessoaJuridica = document.querySelector('#tipoPessoaJuridica').value;
        console.log(tipoPessoa)

        if(tipoPessoa === pessoaJuridica){
            document.querySelector('#divCPF').style.display = 'none';
            document.querySelector('#divCNPJ').style.display = '';
            document.querySelector('#divAreaSocial').style.display = '';

            console.log('pessoa Juridica')
        } else {
            document.querySelector('#divCPF').style.display = '';
            document.querySelector('#divCNPJ').style.display = 'none';
            document.querySelector('#divAreaSocial').style.display = 'none';

            console.log('pessoa Fisica')
        }
    }

    _obterCamposPessoa(){
        const campoid = document.querySelector('#idPessoa')
        const campoTipoPessoa = document.querySelector('#tipoPessoa')
        const campoNome = document.querySelector('#nomePessoa');
        const campoEndereco = document.querySelector('#endereco');
        const campoTelefone = document.querySelector('#telefone');
        const campoEmail = document.querySelector('#email');
        const campoCPF = document.querySelector('#cpf');
        const campoCNPJ = document.querySelector('#cnpj');
        const campoRazaoSocial = document.querySelector('#razaoSocial');

        const camposPessoa = {
            campoid,
            campoTipoPessoa,
            campoNome,
            campoEndereco,
            campoTelefone,
            campoEmail,
            campoCPF,
            campoCNPJ,
            campoRazaoSocial
        }

        return camposPessoa;
    }

    _carregarPessoaEdicao(){
        const params = new URLSearchParams(window.location.search);
        const idPessoa = params.get('idPessoa');

        if(!idPessoa) return;

        document.querySelector('#adicionarPessoa').style.display = 'none';
        document.querySelector('#editarPessoa').style.display = '';

        const pessoa = pessoaService.get(idPessoa);

        const {campoid ,campoTipoPessoa, campoNome, campoEndereco, campoTelefone, campoEmail, campoCPF, campoCNPJ, campoRazaoSocial} = this._obterCamposPessoa();

        campoid.value = pessoa.id;
        campoTipoPessoa.value = pessoa.isPJ;
        campoNome.value = pessoa.nome;
        campoEndereco.value = pessoa.endereco;
        campoTelefone.value = pessoa.telefone?.valueOf();
        campoEmail.value = pessoa.email?.valueOf();
        campoCPF.value = pessoa.cpf?.valueOf();
        campoCNPJ.value = pessoa.cnpj?.valueOf();
        campoRazaoSocial.value = pessoa.razaoSocial?.valueOf();
    }

    _exibirPessoaView(){
        window.location.href = '../../pessoa/pessoa.html';
    }

    _validarPessoa(){
        const {campoTipoPessoa, campoNome, campoEndereco, campoTelefone, campoEmail, campoCPF, campoCNPJ, campoRazaoSocial} = this._obterCamposPessoa();
        const tipoPessoa = campoTipoPessoa.value;
        const nomePessoa = campoNome.value;
        const endereco = campoEndereco.value;
        const telefone = campoTelefone.value;
        const email = campoEmail.value;
        const CPF = campoCPF?.value;
        const CNPJ = campoCNPJ?.value;
        const razaoSocial = campoRazaoSocial?.value;

        if(!nomePessoa){
            campoNome.classList.add('erro');
            inputPessoaVasia.style.display = '';
            return false
        }else {
            campoNome.classList.remove('erro');
            inputPessoaVasia.style.display = 'none';
        }

        if (!endereco) {
            campoEndereco.classList.add('erro');
            inputEnderecoVasia.style.display = '';
            return false
        } else {
            campoEndereco.classList.remove('erro');
            inputEnderecoVasia.style.display = 'none';
        }

        if (!telefone) {
            campoTelefone.classList.add('erro');
            inputTelefoneVasia.style.display = '';
            return false
        } else {
            campoTelefone.classList.remove('erro');
            inputTelefoneVasia.style.display = 'none';
        }

        if (!email) {
            campoEmail.classList.add('erro');
            inputEmailVasia.style.display = '';
            return false
        } else {
            campoEmail.classList.remove('erro');
            inputEmailVasia.style.display = 'none';
        }

        if (tipoPessoa === 'true') {
            if (!CNPJ) {
                campoCNPJ.classList.add('erro');
                inputCnpjVasia.style.display = '';
                return false
            } else {
                campoCNPJ.classList.remove('erro');
                inputCnpjVasia.style.display = 'none';
            }
    
            if (!razaoSocial) {
                campoRazaoSocial.classList.add('erro');
                inputRazaoSocialVasia.style.display = '';
                return false
            } else {
                campoRazaoSocial.classList.remove('erro');
                inputRazaoSocialVasia.style.display = 'none';
            }
        } else {
            if (!CPF) {
                campoCPF.classList.add('erro');
                inputCpfVasia.style.display = '';
                return false
            } else {
                campoCPF.classList.remove('erro');
                inputCpfVasia.style.display = 'none';
            }
        }

        return true;
    }

    _btnSalvarPessoa(){
        const {campoid ,campoTipoPessoa, campoNome, campoEndereco, campoTelefone, campoEmail, campoCPF, campoCNPJ, campoRazaoSocial} = this._obterCamposPessoa();
        

        const idPessoa = campoid.value;
        const tipoPessoa = campoTipoPessoa.value;
        const nomePessoa = campoNome.value;
        const endereco = campoEndereco.value;
        const telefone = campoTelefone.value;
        const email = campoEmail.value;
        const CPF = campoCPF?.value;
        const CNPJ = campoCNPJ?.value;
        const razaoSocial = campoRazaoSocial?.value;

        if(!this._validarPessoa(nomePessoa, endereco, telefone, email, CPF, CNPJ, razaoSocial)) return;

        console.log(nomePessoa) 


        if (idPessoa) {
            if(tipoPessoa === 'true'){
                pessoaService.alterar(idPessoa, nomePessoa, endereco, telefone, email, true, CNPJ, razaoSocial);
            } else{
                pessoaService.alterar(idPessoa, nomePessoa, endereco, telefone, email, false, CPF);
            }
        } else {
            if (tipoPessoa === 'true') {
                pessoaService.salvar(nomePessoa, endereco, telefone, email, true, CNPJ, razaoSocial);
            } else {
                pessoaService.salvar(nomePessoa, endereco, telefone, email, false, CPF);
            }
        }

        this._exibirPessoaView();
    }

    _btnCancelar(){
        this._exibirPessoaView();
    }
}