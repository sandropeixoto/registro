import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { VeiculosPage } from "../veiculos/veiculos";
import { RegistroModel } from "../../../models/registro";
import { RegistroService } from "../../../services/registro";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'page-informacoes-gerais',
  templateUrl: 'informacoes-gerais.html'
})
export class InformacoesGeraisPage implements OnInit {

  title: string = "Informações Gerais";

  registro: RegistroModel;
  registroForm: FormGroup;
  isSubmited: boolean;
  validationMessages;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public registroService: RegistroService,
    public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.inicializaForm();

  }

  inicializaForm() {
    this.registroForm = this.fb.group({
      protocolo: null,
      veiculos: null,
      narrativa: {
        descricaoPatrimonio: null,
        descricaoMeioAmbiente: null,
        descricaoComplementar: null,
        parecerNarrativa: null,
      },
      status: null,
      boletoPago: null,
      dataCriacao: null,
      enviadoParaAutenticar: null, //obrigatorio
      dataDeEnvioParaAutenticar: null, //Date ISO 8601
      numDispositivo: '12345678900987654321',
      //declarante
      //dados-acidente
    });
  }

  ionViewDidEnter() {
    this.registroForm.patchValue(this.registroService.registro);
  }

  ionViewWillLeave() {
    this.registroService.registro = this.registroForm.value;
    console.log(this.registroService.registro);
  }

  validaForm() {
    this.isSubmited = true;
    if (this.registroForm.valid) {
      this.navCtrl.push(VeiculosPage, this.registro);
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
