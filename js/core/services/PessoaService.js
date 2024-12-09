import Pessoa from "../entities/Pessoa.js";
import { pessoaRepository } from "../repositories/repositories.js";
import { carroService } from "./services.js";

export default class PessoaService{
    _verificarDuplicidadeDeDados(emailPessoa, cnpj , cpf, id){
        const pessoas = pessoaRepository.list()

        pessoas.forEach(pessoa => {
            if(pessoa.id == id) return;

            if(pessoa.email?.valueOf() == emailPessoa?.valueOf()) throw `Erro: já existe uma pessoa cadastrada com o Email: ${emailPessoa?.valueOf()}`;

            if(cnpj && pessoa.cnpj?.valueOf() == cnpj?.valueOf()) throw `Erro: já existe uma pessoa cadastrada com o CNPJ: ${cnpj?.valueOf()}`;

            if(cpf && pessoa.cpf?.valueOf() == cpf?.valueOf()) throw `Erro: já existe uma pessao cadastrada com o CPF: ${cpf?.valueOf()}`;
        });
    }

    _verificarDados(nome, endereco, telefone, email, isPJ, cpfOuCnpj, razaoSocial){
        if(!nome) throw "Erro ao salvar: O Nome(Razão Social) é obrigatório";        
        if(!endereco) throw "Erro ao salvar: O Endereço é obrigatório";
        if(!telefone) throw "Erro ao salvar: O Telefone(celular) é obrigatório";
        if(!email) throw "Erro ao salvar: O Email é obrigatório";

        if(isPJ){
            if(!razaoSocial) throw "Erro ao salvar: A Razão Social é obrigatória para pessoa jurídica";

            if(!cpfOuCnpj) throw "Erro ao salvar: O CNPJ é obrigatório para pessoa jurídica";
        } else {
            if(!cpfOuCnpj) throw "Erro ao salvar: O CPF é obrigatório para pessao física";
        }
    }

    salvar(nome, endereco, telefone, email, isPJ, cpfOuCnpj, razaoSocial){
        this._verificarDados(nome, endereco, telefone, email, isPJ, cpfOuCnpj, razaoSocial);

        const pessoa = new Pessoa();

        pessoa.nome = nome;
        pessoa.endereco = endereco;
        pessoa.telefone = telefone;
        pessoa.email = email;
        pessoa.isPJ = isPJ;

        if(isPJ){
            pessoa.razaoSocial = razaoSocial;
            pessoa.cnpj = cpfOuCnpj;

            this._verificarDuplicidadeDeDados(pessoa.email, pessoa.cnpj);            
        } else{
            pessoa.cpf = cpfOuCnpj;

            this._verificarDuplicidadeDeDados(pessoa.email, null, pessoa.cpf);
        }

        const id = pessoaRepository.save(pessoa);
        return id;
    }

    alterar(id, nome, endereco, telefone, email, isPJ, cpfOuCnpj, razaoSocial){
        this._verificarDados(nome, endereco, telefone, email, isPJ, cpfOuCnpj, razaoSocial);

        const pessoa =  pessoaRepository.get(id);

        if(!pessoa) throw `Erro ao alterar: Não existe Pessoa com id: "${id}"`;

        pessoa.nome = nome;
        pessoa.endereco = endereco;
        pessoa.telefone = telefone;
        pessoa.email = email;

        pessoa.cpf = null;
        pessoa.cnpj = null;
        pessoa.razaoSocial = null;

        pessoa.isPJ = isPJ;

        if(isPJ){
            pessoa.cnpj = cpfOuCnpj;
            pessoa.razaoSocial = razaoSocial;

            this._verificarDuplicidadeDeDados(pessoa.email, pessoa.cnpj, null, id);
        } else {
            pessoa.cpf = cpfOuCnpj;

            this._verificarDuplicidadeDeDados(pessoa.email, null, pessoa.cpf, id);
        }

        pessoaRepository.save(pessoa);

        return pessoa;
    }   

    get(id){
        const pessoa = pessoaRepository.get(id);

        return pessoa;
    }

    deletar(id){
        const carros = carroService.listarPorPessoa(id);

        if(carros.length > 0) throw `Erro ao Deltar a Pessoa: Não é possível apagar a Pessoa de id "${id}" pois há ${carros.length} Carro(s) relaciondo(s) a ela.`;
        
        pessoaRepository.delete(id);
    }

    listar(){
        const pessoa = pessoaRepository.list();

        return pessoa;
    }
}