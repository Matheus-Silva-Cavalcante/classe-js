import Marca from './core/entities/Marca.js';
import Pessoa from './core/entities/Pessoa.js';
import Modelo from './core/entities/Modelo.js';
import Motorizacao from './core/entities/Motorizacao.js';
import Carroceria from './core/entities/Carroceria.js';
import Carro from './core/entities/Carro.js';

//------------------
const umaPessoa = new Pessoa();

umaPessoa.id = 5;
umaPessoa.nome = 'Maria José';
umaPessoa.endereco = 'R 25 Q 51 L 03 casa 03';
umaPessoa.telefone = '62 99294-0679';
umaPessoa.email = 'maria@gmail.com';
umaPessoa.cpf = "990.226.450-61";
// umaPessoa.cnpj = null;
umaPessoa.cnpj = '39.790.456/0001-38'; //valido
// umaPessoa.cnpj = '93.720.092/0001-67'; //inválido

window.pessoa = umaPessoa;

console.debug(umaPessoa);

const segundaPessoa = new Pessoa();

segundaPessoa.id = 10;
segundaPessoa.nome = 'Matheus Silva';
segundaPessoa.endereco = 'R 30 Q 51 L 03 casa 05';
segundaPessoa.telefone = '63992940679';
segundaPessoa.email = 'matheus@gmail.com';
segundaPessoa.cpf = '464.499.410-30';
segundaPessoa.cnpj = '17.280.952/0001-09';
 
console.debug(segundaPessoa);

//---------------------
const novaMotorizacao = new Motorizacao();

novaMotorizacao.id = 3;
novaMotorizacao.nome = "Gasolina";

console.debug(novaMotorizacao);

//--------------------------
const novaCarrocaria = new Carroceria();

novaCarrocaria.id = 4;
novaCarrocaria.nome = 'Sedan';

console.log(novaCarrocaria);

//-----------------------
const minhaMarca = new Marca();

minhaMarca.id = 2;
minhaMarca.nome = 'Audi';

console.debug(minhaMarca);

//-------------------------
const novoModelo = new Modelo();

novoModelo.id = 1;
novoModelo.nomeModelo = 'rs7';
novoModelo.marca = minhaMarca;
novoModelo.motorizacao = novaMotorizacao;
novoModelo.carroceria = novaCarrocaria;
novoModelo.portas = 2;

window.modelo = novoModelo;

console.log(novoModelo);
 
//----------------
const novoCarro = new Carro();

novoCarro.id = 6;
novoCarro.modelo = novoModelo;
novoCarro.anoFabricacao = '2022';
novoCarro.anoModelo = '2023';
novoCarro.cor = 'Branco';
novoCarro.placa = 'aaa0a00';
novoCarro.renavam = '34826110686';
novoCarro.compra = '10.000';
novoCarro.venda = '20.000';
novoCarro.proprietarioAnterior = umaPessoa;
novoCarro.cliente = segundaPessoa;

window.carro = novoCarro;

console.log(novoCarro);


const segundoCarro = new Carro()

segundoCarro.id = 7;
segundoCarro.modelo = novoModelo;
segundoCarro.anoFabricacao = '2020';
segundoCarro.anoModelo = '2021';
segundoCarro.cor = 'Preto';
segundoCarro.placa = 'aaa0a00';
segundoCarro.renavam = '89826110609';
segundoCarro.compra = '20.000';
segundoCarro.venda = '40.000';
segundoCarro.proprietarioAnterior = umaPessoa;
segundoCarro.cliente = segundaPessoa;

console.log(segundoCarro);