import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, ToastController} from "ionic-angular";
import {OutrosVeiculosPage} from "../outros-veiculos/outros-veiculos";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistroService} from "../../../services/registro";
import {VeiculoModel} from "../../../models/veiculo";
import {FormEnum} from "../../../models/form-enum";
import {FormEnumService} from "../../../services/form-enum";
import {masks,regex} from "../../../components/forms/input-masks";
import {listaUf} from "../../../data/lista-uf";


@Component({
  selector: 'page-veiculos',
  templateUrl: 'veiculos.html'
})
export class VeiculosPage implements OnInit {
  title: string = "Veículo Principal";
  private veiculoForm: FormGroup;
  private veiculo: VeiculoModel;
  private isSubmited: boolean = false;
  private validationMessages;
  private manobraAcidente: FormEnum[];
  private situacaoVeiculo: FormEnum[];
  private tipoVeiculo:FormEnum[];
  private categoriaVeiculo:FormEnum[];
  placaMask = masks.placa;
  listaUf;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public registroService: RegistroService,
              public fb: FormBuilder,
              public formService: FormEnumService,
              public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.listaUf = listaUf;    
    this.inicializaForm();
    this.inicializaFormEnum();
  }

  onChangeMaskInput(ev){
    setTimeout(() => {
      ev.target.selectionStart = ev.target.value.length;
      ev.target.selectionEnd = ev.target.value.length;
    },10);
  }

  ionViewWillLeave() {   
    this.veiculo = this.veiculoForm.value;
    this.registroService.editarVeiculo(this.veiculo);

  }

  ionViewDidEnter() {
    this.veiculo = this.registroService.getVeiculoPrincipal();
    this.veiculoForm.patchValue(this.veiculo);

    if(!this.registroService.registro.protocolo){
      this.registroService.generateProtocolo();
    }
  }

  inicializaForm() {
    this.veiculoForm = this.fb.group({
      id: null,
      situacao: 'licenciado_para',
      placa: [null, [Validators.pattern(regex.placa), Validators.required]],
      renavam: [null,Validators.minLength(9)],
      tipoVeiculo:[null,Validators.required],
      chassi:[null, Validators.minLength(7)],
      uf:'PA',
      cor:null,
      marcaModelo:null,
      anoModelo:null,
      anoFabricacao:null,
      categoria:null,
      veiculoPrincipal: true,
      segurado: [null,],
      nomeSeguradora: [null, Validators.minLength(3)],
      manobraDuranteAcidente: [null,Validators.required],
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
      'reboques':{
        'required':'O campo VEÍCULO ARTICULADO ou carretinha é obrigatório',
      },
      'manobraDuranteAcidente':{
        'required':'O campo MANOBRA durante acidente é obrigatório',
      },
      'nomeSeguradora':{
        'minlength': 'O campo SEGURADORA deve ter no mínimo 3 dígitos'
      },
      'segurado':{
        'required': 'O campo SEGURADO é obrigatório'
      }
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
    console.log(JSON.stringify(this.veiculo));
    console.log(this.veiculoForm.value);
    console.log(this.veiculoForm.valid);
    this.registroService.editarVeiculo(this.veiculo);

    console.log("BIRI BIRI:"+this.veiculoForm.valid)
    if (this.veiculoForm.valid) {
      this.navCtrl.push(OutrosVeiculosPage);
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

}
