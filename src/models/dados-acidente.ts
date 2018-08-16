export interface DadosAcidenteModel{
  dataAcidente?:string, //Date ISO 8601  //obrigatorio
  ufAcidente:string,  //obrigatorio
  cidade:string, //obrigatorio
  via?:string, //obrigatorio
  km?:number, //obrigatorio
  trecho?:number,  //obrigatorio
  condicaoPista?:string, //obrigatorio
  tracadoRodovia?:string, //obrigatorio
  condicaoSinalizacao?:string, //obrigatorio
  condicoesMeteorologicas?:string, //obrigatorio
  tipoAcidente?:string, //obrigatorio
}
