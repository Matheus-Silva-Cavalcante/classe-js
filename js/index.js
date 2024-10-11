import CarroceriaService from "./core/services/CarroceriaService.js";
import MarcaService from "./core/services/MarcaService.js";
import ModeloService from "./core/services/ModeloService.js";
import MotorizacaoService from "./core/services/MotorizacaoService.js";

window.marca = new MarcaService();
window.motorizacao = new MotorizacaoService();
window.carroceria = new CarroceriaService();

const marcaService = new MarcaService();

// const retornaIdMarca = marcaService.salvar('Volvo');
// console.log({retornaIdMarca});

const marcaAlterada = marcaService.alterar(2, 'Volvo');
console.log(marcaAlterada);

console.log(marcaService.listar());
console.log(marcaService.get(2));

// marcaService.deletar(2);

console.log('<-------------------------->');

const motorizacaoService = new  MotorizacaoService();

// const retornaIdMotorizacao = motorizacaoService.salvar('Elétrico');
// console.log( {retornaIdMotorizacao} );

const motorizacaoAlterada = motorizacaoService.alterar(1, 'Gasolina');
console.log(motorizacaoAlterada);

console.log(motorizacaoService.listar());
console.log(motorizacaoService.get(3));
motorizacaoService.deletar(2);

console.log('<-------------------------->');

const carroceriaService = new CarroceriaService();

// const retornaIdCarroceria = carroceriaService.salvar('Suv');
// console.log({retornaIdCarroceria})

const carroceriaAlterada = carroceriaService.alterar(1, 'Sedan');
console.log(carroceriaAlterada);

console.log(carroceriaService.listar());
console.log(carroceriaService.get(1));
carroceriaService.deletar(2);

console.log('<-------------------------->');

const modeloService = new ModeloService();

// const retornaIdModelo = modeloService.salvar('Polo', marcaService, motorizacaoService, carroceriaService, '4');
// console.log({retornaIdModelo})

console.log(modeloService.get(2));
