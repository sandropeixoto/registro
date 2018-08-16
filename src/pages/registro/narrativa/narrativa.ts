import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {FinalizaRegistroPage} from "../finaliza-registro/finaliza-registro";
import {RegistroModel} from "../../../models/registro";
import {FormGroup, FormBuilder} from "@angular/forms";
import {RegistroService} from "../../../services/registro";
import {VeiculoModel} from "../../../models/veiculo";
import {FormEnumService} from "../../../services/form-enum";

@Component({
  selector: 'page-narrativa',
  templateUrl: 'narrativa.html'
})
export class NarrativaPage implements OnInit {
  title: string = "Narrativa";
  registro:RegistroModel;
  narrativaForm: FormGroup;
  veiculo:VeiculoModel;
  isSubmited:boolean;
  validationMessages;
  tipoDeclarante;
  tipoAcidente;
  dataAcidente;
  manobraDuranteAcidente;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public toastCtrl:ToastController,
              public formService: FormEnumService,
              public registroService: RegistroService) {

  }

  ngOnInit(): void {
    this.registro = this.registroService.registro;
    this.veiculo = this.registroService.getVeiculoPrincipal();
    this.dataAcidente = new Date(this.registro.dadosAcidente.dataAcidente);
    this.dataAcidente.setHours(this.dataAcidente.getHours()+3);

    this.inicializaForm();
    this.inicializaEnum();
    this.isSubmited = false;


    this.narrativaForm.get('descAmbienteToggle')
    .valueChanges
    .subscribe(value=>{
      if(!value) this.narrativaForm.get('descricaoMeioAmbiente').setValue(null);
    })

    this.narrativaForm.get('descPatrimonioToggle')
    .valueChanges
    .subscribe(value=>{
      if(!value) this.narrativaForm.get('descricaoPatrimonio').setValue(null);
    })

    this.narrativaForm.get('descComplementarToggle')
    .valueChanges
    .subscribe(value=>{
      if(!value) this.narrativaForm.get('descricaoComplementar').setValue(null);
    })

  }

  inicializaForm(){
    let descPatrimonioToggle=this.registro.narrativa.descricaoPatrimonio!=null;
    let descAmbienteToggle=this.registro.narrativa.descricaoMeioAmbiente!=null;
    let descComplementarToggle=this.registro.narrativa.descricaoComplementar!=null;
    this.narrativaForm = this.fb.group({
      descricaoPatrimonio: null,
      descricaoMeioAmbiente: null,
      descricaoComplementar: null,
      descPatrimonioToggle: descPatrimonioToggle,
      descAmbienteToggle: descAmbienteToggle,
      descComplementarToggle: descComplementarToggle,
    },{validator:this.validateField});

    this.narrativaForm.patchValue(this.registro.narrativa);

    this.validationMessages = {
      'descricaoMeioAmbiente': {
        'required': 'O campo DESCRIÇÃO MEIO AMBIENTE é obrigatório',
      },
      'descricaoComplementar':{
        'required':'O campo DESCRIÇÃO COMPLEMENTAR é obrigatório'
      },
      'descricaoPatrimonio':{
        'required':'O campo DESCRIÇÃO PATRIMÔNIO é obrigatório'
      },
    };
  }

  inicializaEnum() {
    this.tipoDeclarante = this.formService.tipoDeclarante.find((item) => {
      return item.key == this.registro.declarante.tipo;
    }).value;
    this.tipoAcidente = this.formService.tipoAcidente.find((item) => {
      return item.key == this.registro.dadosAcidente.tipoAcidente;
    }).value;
    this.manobraDuranteAcidente = this.formService.manobrasTipo.find((item) => {
      return item.key == this.registro.veiculos[0].manobraDuranteAcidente;
    }).value;
  }

  ionViewDidEnter() {
    this.narrativaForm.patchValue(this.registro);
  }

  ionViewWillLeave() {
    this.registro.narrativa = this.narrativaForm.value;
  }

  validateField(group:FormGroup){
  let toggleAmbiente = group.get('descAmbienteToggle').value
  if(toggleAmbiente){
    let descricaoMeioAmbiente = group.get('descricaoMeioAmbiente');
    let valid:boolean = descricaoMeioAmbiente.value && descricaoMeioAmbiente.value!='';
    if(!valid){
      descricaoMeioAmbiente.setErrors({
        required:true
      });
    }
  }
  let toggleComplementar = group.get('descComplementarToggle').value
  if(toggleComplementar){
    let descricaoComplementar = group.get('descricaoComplementar');
    let valid:boolean = descricaoComplementar.value && descricaoComplementar.value!='';
    if(!valid){
      descricaoComplementar.setErrors({
        required:true
      });
    }
  }
  let togglePatrimonio = group.get('descPatrimonioToggle').value
  if(togglePatrimonio){
    let descricaoPatrimonio = group.get('descricaoPatrimonio');
    let valid:boolean = descricaoPatrimonio.value && descricaoPatrimonio.value!='';
    if(!valid){
      descricaoPatrimonio.setErrors({
        required:true
      });
    }
  }
}


  validaForm() {
    this.isSubmited = true;
    this.registro.narrativa = this.narrativaForm.value;
    if(this.narrativaForm.valid){
      this.navCtrl.push(FinalizaRegistroPage);
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
