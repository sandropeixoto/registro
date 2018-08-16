import {Component, OnInit, Input} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormEnumService} from "../../../services/form-enum";
import {FormEnum} from "../../../models/form-enum";

@Component({
  selector: 'dados-acidente-form',
  templateUrl: 'dados-acidente.html'
})
export class DadosAcidenteForm implements OnInit {

  @Input() parentController:FormGroup;
  @Input() isSubmited:boolean;
  dadosAcidente: FormGroup;
  validationMessages;

  condicoesPista: FormEnum[];
  tracadoRodovia: FormEnum[];
  condicaoSinalizacao: FormEnum[];
  condicoesMeteorologicas: FormEnum[];
  acidentesTipo: FormEnum[];

  dataHoje: any;
  dataMin: any;

  constructor(public fb: FormBuilder,
              public formService: FormEnumService) {
  }

  ngOnInit() {
    this.setDataMinimaRegistro(); //inicializa relogio
    this.inicializaForm();
    this.inicializaEnuns();
  }

  inicializaEnuns(){
    this.condicoesPista = this.formService.condicoesPista;
    this.tracadoRodovia = this.formService.tracadoRodovia;
    this.condicaoSinalizacao = this.formService.condicaoSinalizacao;
    this.condicoesMeteorologicas = this.formService.condicoesMeteorologicas;
    this.acidentesTipo = this.formService.tipoAcidente;
  }

  inicializaForm(){
    this.dadosAcidente = this.fb.group({
      dataAcidente: this.dataHoje,
      ufAcidente: 'PA',
      cidade: 'Belém',
      rodovia: '',
      km: [null, ],
      trecho: ['', Validators.required],
      condicaoPista: [null,Validators.required],
      tracadoRodovia:[null,Validators.required],
      condicaoSinalizacao: [null,Validators.required],
      condicoesMeteorologicas: [null,Validators.required],
      tipoAcidente: [null,Validators.required],
    });

    this.validationMessages = {
      'km': {
        'required': 'O campo KM é obrigatório'
      },
      'trecho': {
        'required': 'O campo LOCAL DO ACIDENTE é obrigatório'
      },
      'condicaoPista': {
        'required': 'O campo CONDIÇÕES da pista é obrigatório'
      },
      'tracadoRodovia': {
        'required': 'O campo TRAÇADO do local é obrigatório'
      },
      'condicaoSinalizacao': {
        'required': 'O campo CONDIÇÃO DA SINALIZAÇÃO é obrigatório'
      },
      'condicoesMeteorologicas': {
        'required': 'O campo CONDIÇÕES METEOROLÓGICAS é obrigatório'
      },
      'tipoAcidente': {
        'required': 'O campo TIPO DE ACIDENTE é obrigatório'
      },
    };


    this.parentController.addControl('dadosAcidente',this.dadosAcidente);
  }

  setDataMinimaRegistro() {
    this.dataMin = new Date();
    this.dataHoje = new Date();
    const hora = this.dataHoje.getHours();
    this.dataHoje.setHours(hora-3);

    const mes: number = this.dataMin.getMonth();
    this.dataMin.setMonth(mes - 1);

    this.dataHoje = this.dataHoje.toISOString();
    this.dataMin = this.dataMin.toISOString();
  }

}
