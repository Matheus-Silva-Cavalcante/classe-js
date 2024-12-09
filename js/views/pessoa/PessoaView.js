import { pessoaService } from "../../core/services/services.js";
import CarregandoPagina from "../../helpers/CarregandoPagina.js";
import { addEventListenerGlobal } from "../../helpers/eventsHelper.js";
import Selecionavel from "../../helpers/Selecionavel.js";

export default class PessoaView{
    _pessoaPath = 'pessoa/pessoa.html';
    _pessoaService;
    _listarSelecionavel;
    _carregando;

    constructor(pessoaService){
        this._pessoaService = pessoaService;
        this._carregando = new CarregandoPagina('#carregando', 'main');
    }

    inicializar(){
        this._bindEvent();

        this._carregando.mostrarCarregado();

        this._listarPessoa();
    }

    _bindEvent(){
        this._listarSelecionavel = new Selecionavel(
            ".botao-selecionavel",
            () => {document.querySelectorAll('.btn-editar-excluir').forEach(btn => btn.removeAttribute('disabled'));},
            () => {document.querySelectorAll('.btn-editar-excluir').forEach(btn => btn.setAttribute('disabled', ''));}
        );

        addEventListenerGlobal('click', '#btnAdicionarPessoa', () => this._btnAdicionarPessoa());

        addEventListenerGlobal('click', '#btnEditarPessoa', () => this._editarPessoa());

        addEventListenerGlobal('click', '#btnExcluirPessoa', () => this._excluirPessoa());

        addEventListenerGlobal('keyup', '*', (evento) => {
            if(evento.key === 'Delete') this._excluirPessoa();
        })

        addEventListenerGlobal('click', '.btn-voltar', () => this._btnVoltar());
    }

    _obterPessoaSelecionado(){
        return document.querySelector('.pessoa.selecionado');
    }

    _editarPessoa(){
        const pessoaSelecionada = this._obterPessoaSelecionado();
        console.log(pessoaSelecionada)

        if(pessoaSelecionada){
            const idPessoa = pessoaSelecionada.getAttribute('data-id');
            console.log(idPessoa)
            location.href = '../pessoa/novapessoa/novapessoa.html?idPessoa=' + idPessoa;
        }
    }

    _excluirPessoa(){
        const btnPessoaSelecionada = this._obterPessoaSelecionado();
        console.log(btnPessoaSelecionada)
        if(!btnPessoaSelecionada) return;

        const idPessoa = btnPessoaSelecionada.getAttribute('data-id');
        
        const desejaExcluir = confirm('Deseja excluir essa Pessoa ?');
        
        if(desejaExcluir){
            this._pessoaService.deletar(idPessoa);

            btnPessoaSelecionada.remove();

            this._listarSelecionavel.atualizar();
        }
    }

    _listarPessoa(){
        const pessoas = pessoaService.listar();
        console.log(pessoas)

        const divConteudo = document.querySelector('.div-conteudo');

        divConteudo.innerHTML = '';

        pessoas.forEach(pessoa => {
            if(pessoa.isPJ === true) {
                divConteudo.innerHTML += `
                    <div class="botao-selecionavel pessoa" data-id="${pessoa.id}">
                        <div class="img-cadastro">
                            <div class="icon-office img-user"></div>
                        </div>

                        <div class="descricao-pessoa">
                            <div class="conteudo-nome">${pessoa.nome}</div>
                                
                            <div class="conteudo-texto">Jurídica</div>
                                            
                            <div class="conteudo-texto">${pessoa.razaoSocial}</div>

                            <div class="conteudo-texto">${pessoa.cnpj.valueOf()}</div>

                            <div class="conteudo-texto">${pessoa.email.valueOf()}</div>
                
                            <div class="conteudo-texto">${pessoa.endereco}</div>
                    
                            <div class="conteudo-texto">${pessoa.telefone.valueOf()}</div>
                        </div>
                    </div>
                `;
            } else {
                divConteudo.innerHTML += `
                    <div class="botao-selecionavel pessoa" data-id="${pessoa.id}">
                        <div class="img-cadastro">
                            <div class="icon-user img-user"></div>
                        </div>

                        <div class="descricao-pessoa">
                            <div class="conteudo-nome">${pessoa.nome}</div>
                                
                            <div class="conteudo-texto">Física</div>

                            <div class="conteudo-texto">${pessoa.cpf.valueOf()}</div>

                            <div class="conteudo-texto">${pessoa.email.valueOf()}</div>
                
                            <div class="conteudo-texto">${pessoa.endereco}</div>
                    
                            <div class="conteudo-texto">${pessoa.telefone.valueOf()}</div>
                        </div>
                    </div>
                `;
            }
        });
    }

    _btnAdicionarPessoa(){
        window.location.href = './novapessoa/novapessoa.html';
    }

    _btnVoltar(){
        window.location.href = '../index.html';
    }
}