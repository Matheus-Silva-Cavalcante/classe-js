import Carro from "./core/entities/Carro.js";
import Carroceria from "./core/entities/Carroceria.js";
import Marca from "./core/entities/Marca.js";
import Modelo from "./core/entities/Modelo.js";
import Motorizacao from "./core/entities/Motorizacao.js";
import Pessoa from "./core/entities/Pessoa.js";
import { marcaRepository, motorizacaoRepository, carroceriaRepository, modeloRepository, pessoaRepository, carroRepository } from "./core/repositories/repositories.js";

window.Pessoa = Pessoa;

window.marcaRepository = marcaRepository;
window.motorizacaoRepository = motorizacaoRepository;
window.carroceriaRepository = carroceriaRepository;
window.modeloRepository = modeloRepository;
window.pessoaRepository = pessoaRepository;
window.carroRepository = carroRepository;

const umaMarca = new Marca();
umaMarca.nome = 'VolksWagen';

marcaRepository.add(umaMarca);
console.log(marcaRepository.list());
// marcaRepository.delete(2);
// console.log(marcaRepository.get(6));


const motorizacao = new Motorizacao()
motorizacao.nome = 'Gasolina';

motorizacaoRepository.add(motorizacao);
console.log(motorizacaoRepository.list());
// motorizacaoRepository.delete(5);
// console.log(motorizacaoRepository.get(4));


const carroceria = new Carroceria();
carroceria.nome = 'Sedan';

carroceriaRepository.add(carroceria);
console.log(carroceriaRepository.list());
// carroceriaRepository.delete(2)
// console.log(carroceriaRepository.get(5));


const modelo = new Modelo();
modelo.nomeModelo = "rs7";
modelo.motorizacao = motorizacao;
modelo.marca = umaMarca;
modelo.carroceria = carroceria;
modelo.portas = 4;

modeloRepository.add(modelo);
console.log(modeloRepository.list());
// modeloRepository.delete(6)
// console.log(modeloRepository.get(13));


const pessoa = new Pessoa();
pessoa.nome = 'Matheus Silva';
pessoa.endereco = 'Av. 30 Q51 L03';
pessoa.telefone = '63992940679';
pessoa.email = 'matheus@gmail.com';
pessoa.isPJ = true;
pessoa.razaoSocial = "MSC"
pessoa.cnpj = '17.280.952/0001-09';
// pessoa.cpf = '464.499.410-30';  


pessoaRepository.add(pessoa);
console.log(pessoaRepository.list());
// pessoaRepository.delete(3)

const carro = new Carro();
carro.modelo = modelo;
carro.anoFabricacao = '2020';
carro.anoModelo = '2021';
carro.cor = 'preto';
carro.placa = 'aaa0a00';
carro.renavam = '89826110609';
carro.compra = "20.000";
carro.venda = '30.000';
carro.proprietarioAnterior = pessoa;
carro.cliente = pessoa;

carroRepository.add(carro);
// console.log(carroRepository.list());
// console.log(carroRepository.get(2))
