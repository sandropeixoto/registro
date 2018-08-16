import { Component } from "@angular/core";
import { AlertController, LoadingController, NavController, NavParams } from "ionic-angular";
import { RegistroService } from "../../../services/registro";
import "rxjs/add/operator/map";

declare var FCMPlugin

@Component({
  selector: 'page-finaliza-registro',
  templateUrl: 'finaliza-registro.html'
})
export class FinalizaRegistroPage {
  title: string = "Finalização";


  confirmaCheckbox: boolean = false;


  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    public registroService: RegistroService, public loadingCtrl: LoadingController) {

  }

  validaForm() {
    if (!this.confirmaCheckbox) this.showErrorAlert();

    else {
      let loading = this.loadingCtrl.create();
      loading.present();
      /**
       * INÍCIO
       * Incluído por Lourenço - 09/08/2018
       * pega o token do dispositivo para gravar a identificação do aparelho no banco de dados
       */
      // this.setupToken().then((token) => {

      //   if (token.toString() === null || token.toString() === '') {
      this.registroService.registro.numDispositivo = '123';
      // } else {
      //   this.registroService.registro.numDispositivo = token.toString();
      // }
      //this.registroService.registro.numDispositivo = this.registroService.registro.numDispositivo === '' ? '123' : (this.registroService.registro.numDispositivo === null ? '321' : this.registroService.registro.numDispositivo);

      const registro = this.registroService.registro;

      this.registroService.finalizaRegistro()
        .subscribe(
          (data) => {
            console.log(data);
            loading.dismiss();
            this.showSuccesAlert(registro.protocolo);
          },
          (err) => {
            loading.dismiss();
            this.showPostErrorAlert(err.json());
          }
        );

      //});
      // FIM
    }
  }

  /**
   * Incluído por Lourenço - 09/08/2018
   * pega o token do dispositivo para gravar a identificação do aparelho no banco de dados
   */
  // setupToken() {

  //   var promisse = new Promise((resolve, reject) => {

  //     FCMPlugin.getToken((token) => {
  //       resolve(token);
  //     }, (err) => {
  //       reject(err);
  //     });

  //   });

  //   return promisse;
  // }

  showSuccesAlert(data) {
    const mensagem = this.registroService.registro.status ? 'Declaração de acidente de trânsito retificada com sucesso.' : 'Declaração de acidente de trânsito enviada com sucesso.';
    let alert = this.alertCtrl.create({
      title: mensagem,
      subTitle: data,
      message: 'Um e-mail foi enviado para o endereço "' + this.registroService.registro.declarante.email + '" com o esse número do protocolo. Entretanto, para sua segurança, anote-o.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.registroService.registro.protocolo = null;
            this.navCtrl.popToRoot();
          }
        },
      ]
    });
    alert.present();
  }

  showErrorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Não foi possível realizar o cadastro',
      message: 'Você precisa confirmar os termos desta declaração',
      buttons: ['Ok']
    });
    alert.present();
  }

  private showPostErrorAlert(err) {
    let alert = this.alertCtrl.create({
      title: 'Não foi possível realizar o cadastro',
      message: "Erro: " + err.mensagem,
      buttons: [{
        text: 'Ok',
        handler: () => {
          if (err.status == 409) {
            this.registroService.registro.protocolo = null;
            this.navCtrl.popToRoot();
          }
        }
      }]
    });
    alert.present();
  }

}
