import { DeclaranteModel } from "./declarante";
import { DadosAcidenteModel } from "./dados-acidente";
import { VeiculoModel } from "./veiculo"

export interface RegistroModel {
  protocolo: string,
  declarante?: DeclaranteModel,
  dadosAcidente?: DadosAcidenteModel,
  veiculos?: VeiculoModel[],
  narrativa?: {
    descricaoPatrimonio?: string,
    descricaoMeioAmbiente?: string,
    descricaoComplementar?: string,
    parecerNarratia?: string,
  }
  status: string,
  boletoPago?: boolean,
  dataCriacao?: string,
  enviadoParaAutenticar?: boolean, //obrigatorio
  dataDeEnvioParaAutenticar?: string, //Date ISO 8601
  numDispositivo?: string,
}
