import {EnderecoModel} from "./endereco";
import {ImagemVeiculoModel} from "./imagem-veiculo";

export interface VeiculoModel {
  id:string,
  situacao?: string, //obrigatorio
  placa?: string, //obrigatorio
  renavam?:string,
  tipoVeiculo?:string, //apenas API
  chassi?:string,//apenas API
  uf?:string,//apenas API
  cor?:string,//apenas API
  marcaModelo?:string,//apenas API
  anoModelo?:string,//apenas API
  anoFabricacao?:string,//apenas API
  categoria?:string,//apenas API
  veiculoPrincipal?: boolean, //obrigatorio
  segurado?: string,
  nomeSeguradora?: string,
  manobraDuranteAcidente?: string,
  reboques?: string,  //obrigatorio //opções: nao, sim_um, sim_dois
  danosSistemaDeSeguranca?: boolean,  //obrigatorio
  danos?: {
    danosNaCarga: boolean,
    notasFiscaisCarga: string,
    tipoMercadoriaCarga: string,
    valorTotalCarga: number,
    estimativasDanosCarga: string,
    possuiSeguroCarga: boolean,
    seguradoraCarga: string
  },
  proprietario?:{
    cpfOuCnpj:string,
    nome:string,
    endereco:EnderecoModel
  },
  condutor?:{
    naoHabilitado:boolean,
    numeroRegistro:number,
    dataNascimento:string, //Date ISO 8601
    dataPrimeiraCNH:string, //Date ISO 8601
    validadeCNH:string, //Date ISO 8601
    ufCNH:string,
    categoriaCNH:string,
  },
  imagens?: ImagemVeiculoModel  //obrigatorio
}
