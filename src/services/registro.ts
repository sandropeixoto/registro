import { Injectable } from "@angular/core";
import { RegistroModel } from "../models/registro";
import { Storage } from "@ionic/storage";
import { Http, Headers } from "@angular/http";
import { UUID } from "angular2-uuid";
import shortid from "shortid";
import { VeiculoModel } from "../models/veiculo";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class RegistroService {

  //token: 'X-authorization':'g4nA2q14Q52Y1CeMP6iB'
  private headers = new Headers({ 'Content-Type': 'application/json', 'X-authorization': 'g4nA2q14Q52Y1CeMP6iB' });
  private _registro: RegistroModel;
  //private _api: string = 'https://registroacidente.detran.infosolo.com.br/api/v1/registroAcidente';
  //private _api: string = 'http://10.13.4.155:8080/registro-acidente/api/v1/registroAcidente';

  /**
   * incluido por Lourenço 06/08/2018 IP 10.13.4.157
   * http://10.13.4.157:8080/registro-acidente/api/v1/registroAcidente
   * https://sisdat-homologa.detran.pa.gov.br/registro-acidente/api/v1/registroAcidente
   */
  private _api: string = 'https://sistemas.detran.pa.gov.br/sisdat/registro-acidente/api/v1/registroAcidente';


  constructor(public storage: Storage,
    public http: Http) {
  }

  get registro(): RegistroModel {
    return this._registro;
  }

  set registro(value: RegistroModel) {
    this._registro = value;
    this.updateLocalStorage();
  }

  existeRegistro() {
    return this.getLocalStorage().then(registro => {
      if (registro.protocolo) {
        return registro.protocolo;
      }
      else {
        return null;
      }
    })
      .catch(error => console.log(error));
  }

  generateProtocolo() {
    let uuid = UUID.UUID().toUpperCase().split('-');
    this.registro.protocolo = [uuid[1], uuid[2], uuid[3], uuid[4].slice(0, 4)].join('-');
  }

  novoRegistro() {
    this._registro = {
      protocolo: null,
      enviadoParaAutenticar: false,
      dadosAcidente: {
        ufAcidente: 'PA',
        cidade: 'Belém'
      },
      veiculos: [{
        id: shortid.generate(),
        veiculoPrincipal: true,
      }],
      status: null,
      numDispositivo: ''
    };
    this.updateLocalStorage();
  }

  continuarRegistro() {
    this.getLocalStorage()
      .then(data => {
        this._registro = data;
      })
      .catch(error => console.log(error));
  }

  finalizaRegistro() {

    if (this._registro.status) {
      return this.putApi(this.registro);
    }
    else {
      this._registro.dataCriacao = new Date().toISOString();
      return this.postApi(this.registro);
    }

    /*this._registro.protocolo = null;
     this.updateLocalStorage();*/
  }

  autenticarRegistro(protocolo) {
    return this.http.put(`${this._api}/${protocolo}/autenticar`, { headers: this.headers });
  }

  validaFormPeloTipo() {
    let declarante: string;
    try {
      declarante = this._registro.declarante.tipo;
    }
    catch (e) {
      return false;
    }

    if (this._registro.declarante.tipo) {
      const noValidate = !(declarante == 'condutor' || declarante == 'corretor' || declarante == 'proprietario' || declarante == 'condutor_e_proprietario');
      return noValidate;
    }
  }

  editarVeiculo(veiculo: VeiculoModel) {
    const index = this._registro.veiculos.findIndex((item: VeiculoModel) => {
      return veiculo.id == item.id;
    });
    if (veiculo.placa) {
      veiculo.placa = veiculo.placa.slice(0, 8); // corrige o problema da mascara adicionar um caractere a mais no final
    }

    this._registro.veiculos.splice(index, 1, veiculo); //remove veiculo antigo e adiciona o novo no lugar

    this.updateLocalStorage();
  }

  inserirVeiculo(veiculo) {
    veiculo.id = shortid.generate();
    if (veiculo.placa) {
      veiculo.placa = veiculo.placa.slice(0, 8); // corrige o problema da mascara adicionar um caractere a mais no final
    }
    this._registro.veiculos.push(veiculo);
    this.updateLocalStorage();
  }

  removerVeiculo(veiculo) {
    const index = this._registro.veiculos.findIndex((item) => {
      return item.id == veiculo.id;
    });
    this._registro.veiculos.splice(index, 1);
    this.updateLocalStorage();
  }

  getVeiculoPrincipal() {
    return this.registro.veiculos.find((item) => {
      return item.veiculoPrincipal === true;
    });
  }

  getOutrosVeiculos() {
    let veiculos = this.registro.veiculos.filter(item => {
      return item.veiculoPrincipal === false;
    });
    if (veiculos === undefined) {
      return []
    }
    else return veiculos;
  }

  getLocalStorage() {
    return this.storage.get('registro');
  }

  updateLocalStorage() {
    this.putLocalStorage(this._registro).then(() => { }).catch(error => console.log(error));
  }

  putLocalStorage(registro: RegistroModel) {
    return this.storage.set('registro', registro);
  }

  private removeMascaras(registro: RegistroModel) {
    let registroSemMascaras = Object.assign({}, registro);

    for (let veiculo of registroSemMascaras.veiculos) {
      veiculo.placa = veiculo.placa.replace(/[-]+/g, '').toUpperCase();
      veiculo.id = null;
      veiculo.proprietario.endereco.cep = veiculo.proprietario.endereco.cep.replace(/[^0-9]+/g, '');
      veiculo.proprietario.cpfOuCnpj = veiculo.proprietario.cpfOuCnpj.replace(/[^0-9]+/g, '');
      if (veiculo.condutor.dataPrimeiraCNH) {
        let dataPrimeiraCNH = new Date(veiculo.condutor.dataPrimeiraCNH);
        dataPrimeiraCNH.setHours(0);
        veiculo.condutor.dataPrimeiraCNH = dataPrimeiraCNH.toISOString();
      }
      if (veiculo.condutor.validadeCNH) {
        let validadeCNH = new Date(veiculo.condutor.validadeCNH);
        validadeCNH.setHours(0);
        veiculo.condutor.validadeCNH = validadeCNH.toISOString();
      }
      if (veiculo.condutor.dataNascimento) {
        let dataNascimento = new Date(veiculo.condutor.dataNascimento);
        dataNascimento.setHours(0);
        veiculo.condutor.dataNascimento = dataNascimento.toISOString();
      }
    }
    if (registro.declarante.dataNascimento) {
      let dataNascimento = new Date(registroSemMascaras.declarante.dataNascimento);
      dataNascimento.setHours(0);
      registroSemMascaras.declarante.dataNascimento = dataNascimento.toISOString();
    }

    registroSemMascaras.declarante.cpf = registroSemMascaras.declarante.cpf.replace(/[^0-9]+/g, '');
    registroSemMascaras.declarante.celular = registroSemMascaras.declarante.celular.replace(/[^0-9]+/g, '');
    registroSemMascaras.declarante.endereco.cep = registroSemMascaras.declarante.endereco.cep.replace(/[^0-9]+/g, '');


    return registroSemMascaras;
  }
  adicionaMascaras() {
    let cpf = this._registro.declarante.cpf;
    this.registro.declarante.cpf = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9, 12);
    let cep = this._registro.declarante.endereco.cep;
    this.registro.declarante.endereco.cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
    let celular = this._registro.declarante.celular;
    this.registro.declarante.celular = '(' + celular.substring(0, 2) + ')' + celular.substring(2, 7) + '-' + celular.substring(7, 11);

    for (let veiculo of this.registro.veiculos) {
      veiculo.placa = veiculo.placa.substring(0, 3) + '-' + veiculo.placa.substring(3, 7);

      let cep = veiculo.proprietario.endereco.cep;
      veiculo.proprietario.endereco.cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);

      let cpf = veiculo.proprietario.cpfOuCnpj;
      if (cpf.length > 11) { //verifica se o numero é um cnpj
        veiculo.proprietario.cpfOuCnpj = cpf.substring(0, 2) + '.' + cpf.substring(2, 5) + '.' + cpf.substring(5, 8) + '/' + cpf.substring(8, 12) + '-' + cpf.substring(12, 14)
      }
      else {
        veiculo.proprietario.cpfOuCnpj = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9, 12);
      }
    }
  }

  postApi(registro: RegistroModel) {

    let registroSemMascara = this.removeMascaras(registro);
    console.log('<=============================== PEGA O JSON ===========================================>');
    console.log(JSON.stringify(registroSemMascara));
    return this.http.post(`${this._api}`, registroSemMascara, { headers: this.headers });

  }

  getApi(protocolo: string) {
    return this.http.get(`${this._api}/${protocolo}`, { headers: this.headers })
      .map(res => res.json() as RegistroModel);
  }

  patchApi(protocolo, data) {
    return this.http.patch(`${this._api}/${protocolo}/`, data, { headers: this.headers });
  }

  putApi(registro: RegistroModel) {
    let registroSemMascara = this.removeMascaras(registro);
    return this.http.put(`${this._api}/${registro.protocolo}`, registroSemMascara, { headers: this.headers });
  }
}
