import CarroceriaMapper from "../mappers/CarroceriaMapper.js";
import CarroMapper from "../mappers/CarroMapper.js";
import MarcaMapper from "../mappers/MarcaMapper.js";
import ModeloMapper from "../mappers/ModeloMapper.js";
import MotorizacaoMapper from "../mappers/MotorizacaoMapper.js";
import PessoaMapper from "../mappers/PessoaMapper.js";
import Repository from "./Repository.js";

const marcaMapper = new MarcaMapper();
export const marcaRepository = new Repository(marcaMapper, 'marca');

const motorizacaoMapper = new MotorizacaoMapper();
export const motorizacaoRepository = new Repository(motorizacaoMapper, 'motorizacao');

const carroceriaMapper = new CarroceriaMapper();
export const carroceriaRepository = new Repository(carroceriaMapper, 'carroceria');

const modeloMapper = new ModeloMapper(marcaRepository, motorizacaoRepository, carroceriaRepository);
export const modeloRepository = new Repository(modeloMapper, 'modelo');

const pessoaMapper = new PessoaMapper();
export const pessoaRepository = new Repository(pessoaMapper, 'pessoa');

const carroMapper = new CarroMapper(modeloRepository, pessoaRepository, pessoaRepository);
export const carroRepository = new Repository(carroMapper, 'carro');
