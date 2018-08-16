import {Injectable} from '@angular/core';
import {FormEnum} from '../models/form-enum'
import * as data from '../data/form-enum'


@Injectable()
export class FormEnumService {


  private _tipoDeclarante: FormEnum[] = data.TipoDeclarante;
  private _documentosDeclarante: FormEnum[] = data.DocumentosDeclarante;
  private _tipoAcidente: FormEnum[] = data.TipoAcidente;
  private _condicoesPista: FormEnum[] = data.CondicoesPista;
  private _tracadoRodovia: FormEnum[] = data.TracadoRodovia;
  private _veiculosCategoria: FormEnum[] = data.VeiculosCategoria;
  private _veiculosTipo: FormEnum[] = data.VeiculosTipo;
  private _opcoesSeguradora: FormEnum[] = data.OpcoesSeguradora;
  private _manobrasTipo: FormEnum[] = data.Manobras;
  private _opcoesReboque: FormEnum[] = data.OpcoesReboque;
  private _cnhCategoria: FormEnum[] = data.CnhCategoria;
  private _danoCargaEstimativa: FormEnum[] = data.DanoCargaEstimativa;
  private _condicaoSinalizacao: FormEnum[] = data.CondicaoSinalizacao;
  private _condicoesMeteorologicas: FormEnum[] = data.CondicoesMeteorologicas;
  private _situacaoVeiculo: FormEnum[] = data.SituacaoVeiculo;

  constructor() {
  }

  get situacaoVeiculo(): FormEnum[] {
    return this._situacaoVeiculo;
  }

  get tipoDeclarante(): FormEnum[] {
    return this._tipoDeclarante;
  }

  get documentosDeclarante(): FormEnum[] {
    return this._documentosDeclarante;
  }

  get tipoAcidente(): FormEnum[] {
    return this._tipoAcidente;
  }

  get condicoesPista(): FormEnum[] {
    return this._condicoesPista;
  }

  get tracadoRodovia(): FormEnum[] {
    return this._tracadoRodovia;
  }

  get veiculosCategoria(): FormEnum[] {
    return this._veiculosCategoria;
  }

  get veiculosTipo(): FormEnum[] {
    return this._veiculosTipo;
  }

  get opcoesSeguradora(): FormEnum[] {
    return this._opcoesSeguradora;
  }

  get manobrasTipo(): FormEnum[] {
    return this._manobrasTipo;
  }

  get opcoesReboque(): FormEnum[] {
    return this._opcoesReboque;
  }

  get cnhCategoria(): FormEnum[] {
    return this._cnhCategoria;
  }

  get danoCargaEstimativa(): FormEnum[] {
    return this._danoCargaEstimativa;
  }

  get condicaoSinalizacao(): FormEnum[] {
    return this._condicaoSinalizacao;
  }

  get condicoesMeteorologicas(): FormEnum[] {
    return this._condicoesMeteorologicas;
  }
}
