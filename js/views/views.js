import { marcaService, motorizacaoService, carroceriaService, modeloService, pessoaService, carroService } from "../core/services/services.js";
import CadastroCarroView from "./carro/CadastroCarroView.js";
import CarroView from "./carro/CarroView.js";
import CadastroCarroceriaView from "./carroceria/CadastroCarroceriaView.js";
import CarroceriaView from "./carroceria/CarroceriaView.js";
import CadastroMarcaView from "./marca/CadastroMarcaView.js";
import MarcaView from "./marca/MarcaView.js";
import CadastroModeloView from "./modelo/CadastroModeloView.js";
import ModeloView from "./modelo/ModeloView.js";
import CadastroMotorizacaoView from "./motorizacao/CadastroMotorizacaoView.js";
import MotorizacaoView from "./motorizacao/MotorizacaoView.js";
import CadastroPessoaView from "./pessoa/CadastroPessoaView.js";
import PessoaView from "./pessoa/PessoaView.js";

export const marcas = new MarcaView(marcaService);
export const cadastroMarca = new CadastroMarcaView(marcaService);

export const motorizacao = new MotorizacaoView(motorizacaoService);
export const cadastroMotorizacao = new CadastroMotorizacaoView(motorizacaoService);

export const carroceria = new CarroceriaView(carroceriaService);
export const cadastroCarroceria = new CadastroCarroceriaView(carroceriaService);

export const modelo = new ModeloView(modeloService, marcaService, motorizacaoService, carroceriaService);
export const cadastroModelo = new CadastroModeloView(modeloService);

export const pessoa = new PessoaView(pessoaService);
export const cadastroPessoa = new CadastroPessoaView(pessoaService);

export const carro = new CarroView(carroService);
export const cadastroCarro = new CadastroCarroView(carroService);
