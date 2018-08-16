import {Component, OnInit} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {masks, regex} from "../../components/forms/input-masks";
import {RegistroService} from "../../services/registro";
import {InformacoesGeraisPage} from "../registro/informacoes-gerais/informacoes-gerais";


@Component({
  selector: 'page-retificar-registro',
  templateUrl: 'retificar-registro.html'
})
export class RetificarRegistroPage implements OnInit {
  title: string = "Retificar Registro";
  retificarForm: FormGroup;
  isSubmited: boolean = false;
  validationMessages = {};
  protocoloMask = masks.protocolo;
  placaMask = masks.placa;


  constructor(public navCtrl: NavController,
              public fb: FormBuilder,
              public toastCtrl: ToastController,
              public registroService: RegistroService,
              public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.inicializaForm();
  }

  onChangeMaskInput(ev){
    setTimeout(() => {
      ev.target.selectionStart = ev.target.value.length;
      ev.target.selectionEnd = ev.target.value.length;
    },10);
  }


  inicializaForm() {
    this.retificarForm = this.fb.group({
      numeroDocumento: [null, [Validators.required, Validators.minLength(19)]],
      placa: [null,Validators.pattern(regex.placa)],
    });

    this.validationMessages =
      {
        'numeroDocumento': {
          'required': 'O campo PROTOCOLO é obrigatório',
          'minlength': 'O campo PROTOCOLO deve ter 19 dígitos'
        },
        'placa':{
          'pattern':'O campo PLACA está no formato inválido'
        }
      }

  }
  


  validaForm() {
    this.isSubmited = true;


    if (!this.retificarForm.valid) this.showValidatorToast();

    else {
      let protocolo = this.retificarForm.get('numeroDocumento').value;
      protocolo = protocolo.slice(0, 19).toUpperCase();
      let loading = this.loadingCtrl.create();
      loading.present();
      this.registroService.getApi(protocolo).subscribe((data) => {
          if (data == null) {
            loading.dismiss();
            this.showErrorToast('Registro não encontrado'); //temporario até API estar pronta
            return;
          }
          this.registroService.registro = data;
          if(data.status!='REGISTRADO'){
            loading.dismiss()

            this.showErrorToast({mensagem:'Não é possível atualizar este registro. Registro já enviado para autenticação.'});
            return;
          }
          this.registroService.adicionaMascaras();

          loading.dismiss()
            .then(() => this.navCtrl.push(InformacoesGeraisPage));

        }, (err) => {
          loading.dismiss();
          this.showErrorToast(err.json());
        }
      );
    }
  }


  showErrorToast(err) {
    let toast = this.toastCtrl.create({
      message: err.mensagem,
      duration: 3000,
      position: 'middle',
    });
    toast.present();
  }

  showInvalidClass(controlName: string) {
    return !this.retificarForm.controls[controlName].valid && this.isSubmited;
  }

  showValidatorToast() {
    let toast = this.toastCtrl.create({
      message: 'Há erros no preenchimento, favor verificar os campos marcados em vermelho',
      duration: 3000,
      position: 'middle',
    });
    toast.present();
  }

}
