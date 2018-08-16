import {Component, OnInit} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {masks, regex} from "../../components/forms/input-masks";
import {RegistroService} from "../../services/registro";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'page-autenticar-registro',
  templateUrl: 'autenticar-registro.html'
})
export class AutenticarRegistroPage implements OnInit {
  title: string = "Autenticar";
  isSubmited: boolean = false;
  autenticarForm: FormGroup;
  validationMessages = {};
  placaMask = masks.placa;
  protocoloMask = masks.protocolo;

  constructor(public navCtrl: NavController,
              public fb: FormBuilder,
              public registroService: RegistroService,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.inicializaForm();
    //this.placaMaskMethod();
    //this.protocoloMaskMethod();
  }

  onChangeMaskInput(ev){
    setTimeout(() => {
      ev.target.selectionStart = ev.target.value.length;
      ev.target.selectionEnd = ev.target.value.length;
    },10);
  }

  // private placaMaskMethod() {
  //   let placa = this.autenticarForm.get('placa');
  //   let placaAnterior = '';
  //   placa.valueChanges
  //     .debounceTime(50)
  //     .distinctUntilChanged()
  //     .subscribe(value => {
  //       if (value.length == 3 && placaAnterior.length < 4) {
  //         placa.setValue(value.substring(0, 3) + '-' + value.substring(3, 7));
  //       }
  //       placaAnterior = value;
  //     });
  // }

  // private protocoloMaskMethod() {
  //   let protocolo = this.autenticarForm.get('numeroDocumento');
  //   let protocoloAnterior = '';
  //   protocolo.valueChanges
  //     .debounceTime(50)
  //     .distinctUntilChanged()
  //     .subscribe(value => {
  //       if (value.length == 4 && protocoloAnterior.length < 4) {
  //         protocolo.setValue(value+'-');
  //       }
  //       if (value.length == 9 && protocoloAnterior.length < 9) {
  //         protocolo.setValue(value+'-');
  //       }
  //       if (value.length == 14 && protocoloAnterior.length < 14) {
  //         protocolo.setValue(value+'-');
  //       }
  //       protocoloAnterior = value;
  //     });
  // }

  inicializaForm() {
    this.autenticarForm = this.fb.group({
      numeroDocumento: ['', [Validators.required, Validators.minLength(19)]],
      placa: [null, Validators.pattern(regex.placa)],
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

  showInvalidClass(controlName: string) {
    return !this.autenticarForm.controls[controlName].valid && this.isSubmited;
  }

  validaForm() {
    this.isSubmited = true;

    if (!this.autenticarForm.valid) this.showValidatorToast();
    else {
      let protocolo = this.autenticarForm.get('numeroDocumento').value;
      protocolo = protocolo.slice(0, 19).toUpperCase();
      let loading = this.loadingCtrl.create();

      loading.present();
      this.registroService.autenticarRegistro(protocolo)
        .subscribe(
          (data) => {
            this.showAutenticadoToast();
            loading.dismiss();
            this.autenticarForm.reset();
          },
          (err) => {
            loading.dismiss();
            this.showErrorToast(err.json())
          }
        )
    }
  }

  showAutenticadoToast() {
    let toast = this.toastCtrl.create({
      message: 'SISDAT Autenticado com sucesso!',
      duration: 3000,
      position: 'middle',
    });
    this.isSubmited = false;
    this.autenticarForm.get('numeroDocumento').setValue('');
    toast.present();
  }

  showErrorToast(err) {
    let toast = this.toastCtrl.create({
      message: 'Erro: ' + err.mensagem,
      duration: 3000,
      position: 'middle',
    });
    toast.present();
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
