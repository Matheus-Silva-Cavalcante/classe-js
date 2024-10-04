import Marca from './core/entities/Marca.js';
import Pessoa from './core/entities/Pessoa.js';
import Modelo from './core/entities/Modelo.js';
import Motorizacao from './core/entities/Motorizacao.js';
import Carroceria from './core/entities/Carroceria.js';
import Carro from './core/entities/Carro.js';


import Repository from './core/repositories/Repository.js';
import MarcaMapper from './core/mappers/MarcaMapper.js';
import MotorizacaoMapper from './core/mappers/MotorizacaoMapper.js';
import CarroceriaMapper from './core/mappers/CarroceriaMapper.js';
import ModeloMapper from './core/mappers/ModeloMapper.js';
import PessoaMapper from './core/mappers/PessoaMapper.js';


//------------------
// const umaPessoa = new Pessoa();

// umaPessoa.id = 5;
// umaPessoa.nome = 'Maria José';
// umaPessoa.endereco = 'R 25 Q 51 L 03 casa 03';
// umaPessoa.telefone = '62 99294-0679';
// umaPessoa.email = 'maria@gmail.com';
// umaPessoa.cpf = "990.226.450-61";
// umaPessoa.cnpj = null;
// umaPessoa.cnpj = '39.790.456/0001-38'; //valido
// umaPessoa.cnpj = '93.720.692/0001-67'; //inválido

const marcaMapper = new MarcaMapper();
const marcaRepository = new Repository(marcaMapper, 'marcas');

const umaMarca = new Marca();
umaMarca.id = 10;
umaMarca.nome = 'Volks Wagen';

// marcaRepository.add(umaMarca);
// marcaRepository.delete(15);
// console.log(marcaRepository.get(6));
console.log(marcaRepository.list());

window.marcaRepository = marcaRepository;

const motorizacaoMapper = new MotorizacaoMapper();
const motorizacaoRepository = new Repository(motorizacaoMapper, 'motorizacao');

const motorizacao = new Motorizacao()
motorizacao.id = 5;
motorizacao.nome = 'Gasolina';

// motorizacaoRepository.add(motorizacao);
motorizacaoRepository.delete(5);
// console.log(motorizacaoRepository.get(4));
console.log(motorizacaoRepository.list());


const carroceriaMapper = new CarroceriaMapper();
const carroceriaRepository = new Repository(carroceriaMapper, 'carroceria');

const carroceria = new Carroceria();
carroceria.id = 1;
carroceria.nome = 'Sedan';

// carroceriaRepository.add(carroceria);
carroceriaRepository.delete(2)
console.log(carroceriaRepository.list());
// console.log(carroceriaRepository.get(5));


const modeloMapper = new ModeloMapper();
const modeloRepository = new Repository(modeloMapper, 'modelo');

const modelo = new Modelo();
modelo.id = 1;
modelo.nomeModelo = "rs7";
modelo.motorizacao = motorizacao;
modelo.marca = umaMarca;
modelo.carroceria = carroceria;
modelo.portas = 4;

// modeloRepository.add(modelo);
// modeloRepository.delete(4)
console.log(modeloRepository.list());
// console.log(modeloRepository.get(13));


const pessoaMapper = new PessoaMapper();
const pessoaRepository = new Repository(pessoaMapper, 'pessoa');

const pessoa = new Pessoa()
pessoa.id = 1;
pessoa.nome = 'Matheus Silva';
pessoa.endereco = 'Av. 30 Q51 L03';
pessoa.telefone = '63992940679';
pessoa.email = 'matheus@gmail.com';
pessoa.cnpj = '17.280.952/0001-09';
pessoa.cpf = '464.499.410-30';

// pessoaRepository.add(pessoa);
// console.log(pessoaRepository.list());



// window.pessoa = umaPessoa;

// console.debug(umaPessoa);

// const segundaPessoa = new Pessoa();

// segundaPessoa.id = 10;
// segundaPessoa.nome = 'Matheus Silva';
// segundaPessoa.endereco = 'R 30 Q 51 L 03 casa 05';
// segundaPessoa.telefone = '63992940679';
// segundaPessoa.email = 'matheus@gmail.com';
// segundaPessoa.cpf = '464.499.410-30';
// segundaPessoa.cnpj = '17.280.952/0001-09';
 
// console.debug(segundaPessoa);

// //---------------------
// const novaMotorizacao = new Motorizacao();

// novaMotorizacao.id = 3;
// novaMotorizacao.nome = "Gasolina";

// console.debug(novaMotorizacao);

// //--------------------------
// const novaCarrocaria = new Carroceria();

// novaCarrocaria.id = 4;
// novaCarrocaria.nome = 'Sedan';

// console.log(novaCarrocaria);

// //-----------------------
// const minhaMarca = new Marca();

// minhaMarca.id = 2;
// minhaMarca.nome = 'Audi';

// console.debug(minhaMarca);

// //-------------------------
// const novoModelo = new Modelo();

// novoModelo.id = 1;
// novoModelo.nomeModelo = 'rs7';
// novoModelo.marca = minhaMarca;
// novoModelo.motorizacao = novaMotorizacao;
// novoModelo.carroceria = novaCarrocaria;
// novoModelo.portas = 2;

// window.modelo = novoModelo;

// console.log(novoModelo);
 
// //----------------
// const novoCarro = new Carro();

// novoCarro.id = 6;
// novoCarro.modelo = novoModelo;
// novoCarro.anoFabricacao = '2022';
// novoCarro.anoModelo = '2023';
// novoCarro.cor = 'Branco';
// novoCarro.placa = 'aaa0a00';
// novoCarro.renavam = '34826110686';
// novoCarro.compra = '10.000';
// novoCarro.venda = '20.000';
// novoCarro.proprietarioAnterior = umaPessoa;
// novoCarro.cliente = segundaPessoa;

// window.carro = novoCarro;

// console.log(novoCarro);


// const segundoCarro = new Carro();

// segundoCarro.id = 7;
// segundoCarro.modelo = novoModelo;
// segundoCarro.anoFabricacao = '2020';
// segundoCarro.anoModelo = '2021';
// segundoCarro.cor = 'Preto';
// segundoCarro.placa = 'aaa0a00';
// segundoCarro.renavam = '89826110609';
// segundoCarro.compra = '20.000';
// segundoCarro.venda = '40.000';
// segundoCarro.proprietarioAnterior = umaPessoa;
// segundoCarro.cliente = segundaPessoa;

// console.log(segundoCarro);