import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {VeiculoModel} from "../../../models/veiculo";
import {FormEnum} from "../../../models/form-enum";
import {NavController, NavParams, ViewController, ToastController} from "ionic-angular";
import {RegistroService} from "../../../services/registro";
import {FormEnumService} from "../../../services/form-enum";
import {masks,regex} from "../../../components/forms/input-masks";
import {listaUf} from "../../../data/lista-uf";

@Component({
  templateUrl: 'outros-veiculos-modal.html'
})
export class OutrosVeiculosModal implements OnInit {
  title: string = "Outros Veículos";
  private veiculoForm: FormGroup;
  private mode: string;
  private veiculo: VeiculoModel;
  private isSubmited: boolean = false;
  private validationMessages;
  isProprietario:boolean = false;
  private manobraAcidente: FormEnum[];
  private situacaoVeiculo: FormEnum[];
  private tipoVeiculo:FormEnum[];
  private categoriaVeiculo:FormEnum[];

  placaMask = masks.placa;
  listaUf;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public registroService: RegistroService,
              public fb: FormBuilder,
              public formService: FormEnumService,
              public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.isProprietario = this.registroService.registro.declarante.tipo=='passageiro';
    this.mode = this.navParams.get('mode');
    this.listaUf = listaUf;
    this.inicializaFormEnum();
    this.inicializaForm();
  }
  onChangeMaskInput(ev){
    setTimeout(() => {
      ev.target.selectionStart = ev.target.value.length;
      ev.target.selectionEnd = ev.target.value.length;
    },10);
  }

  inicializaForm() {
    this.veiculoForm = this.fb.group({
      id: null,
      situacao: 'licenciado_para',
      placa: [null, [Validators.pattern(regex.placa)]],
      renavam: [null,Validators.minLength(9)],
      tipoVeiculo:null,
      chassi:[null, Validators.minLength(7)],
      uf:'PA',
      cor:null,
      marcaModelo:null,
      anoModelo:null,
      anoFabricacao:null,
      categoria:null,
      veiculoPrincipal: false,
      segurado: [null,],
      nomeSeguradora: [null, Validators.minLength(3)],
      manobraDuranteAcidente: [null, Validators.required],
      danosSistemaDeSeguranca: false,
      reboques: [null,Validators.required],
      //danos:
      //proprietario:,
      //condutor: ,
      //imagens: FormGroup,
    });

    this.validationMessages = {
      'placa': {
        'required': 'O campo PLACA é obrigatório',
        'pattern': 'O campo PLACA está em formato inválido',
      },
      'renavam':{
        'minlength':'O campo RENAVAM deve ter no mínimo 9 dígitos'
      },
      'chassi':{
        'minlength':'O campo CHASSI deve ter no mínimo 7 dígitos'
      },
      'manobraDuranteAcidente':{
        'required': 'O campo MANOBRA DURANTE ACIDENTE é obrigatório'
      },
      'reboques':{
        'required':'O campo VEÍCULO ARTICULADO ou carretinha é obrigatório',
      },
      'nomeSeguradora':{
        'minlength': 'O campo SEGURADORA deve ter no mínimo 3 dígitos'
      },
      'segurado':{
        'required': 'O campo SEGURADO é obrigatório'
      }
    };


  }

  ionViewDidEnter() {
    this.isProprietario = this.registroService.registro.declarante.tipo=='passageiro';
    if (this.mode == 'Edit') {
      this.veiculo = this.navParams.get('veiculo');
      console.log(this.veiculo);
      this.veiculoForm.patchValue(this.veiculo);
    }
  }

  private inicializaFormEnum() {
    this.manobraAcidente = this.formService.manobrasTipo;
    this.situacaoVeiculo = this.formService.situacaoVeiculo;
    this.tipoVeiculo = this.formService.veiculosTipo;
    this.categoriaVeiculo = this.formService.veiculosCategoria;
  }

  validaForm() {
    this.isSubmited = true;
    this.veiculo = this.veiculoForm.value;
    if (this.veiculoForm.valid) {
      if (this.mode == 'Edit') {
        this.registroService.editarVeiculo(this.veiculo);
      }
      if (this.mode == 'New') {
        this.registroService.inserirVeiculo(this.veiculo);
      }
      this.showSucessoToast();
      this.viewCtrl.dismiss();
    }
    else {
      this.showValidatorToast();
    }
  }

  showValidatorToast() {
    let toast = this.toastCtrl.create({
      message: 'Há erros no preenchimento, favor verificar os campos marcados em vermelho',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  showSucessoToast() {
    let message: string;
    if (this.mode == 'Edit') {
      message = 'Veículo alterado com sucesso!';
    }
    if (this.mode == 'New') {
      message = 'Veículo incluído com sucesso!';
    }
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
    });
    toast.present();
  }


}
