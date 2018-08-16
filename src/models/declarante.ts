import {EnderecoModel} from "./endereco";

export interface DeclaranteModel{
  tipo:string, //obrigatorio
  estrangeiro:boolean, //obrigatorio
  tipoDocumentoEstrangeiro:string,
  numeroDocumentoEstrangeiro:string,
  paisEstrangeiro:string,
  nome:string, //obrigatorio
  cpf:string, //obrigatorio
  sexo:string, //obrigatorio
  dataNascimento:string, //Date ISO 8601  //obrigatorio
  email:string,  //obrigatorio
  profissao:string,  //obrigatorio
  celular:string,  //obrigatorio
  endereco:EnderecoModel
}
