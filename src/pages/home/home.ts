import { Component } from "@angular/core";
import { FaqPage } from "../faq/faq";
import { ContinuarRegistroPage } from "../continuar-registro/continuar-registro";
import { RetificarRegistroPage } from "../retificar-registro/retificar-registro";
import { AutenticarRegistroPage } from "../autenticar-registro/autenticar-registro";
import { TermosCondicoesPage } from "../registro/termos-condicoes/termos-condicoes";
import { AlertController, NavController } from "ionic-angular";
import { RegistroModel } from "../../models/registro";
import { RegistroService } from "../../services/registro";
import { InformacoesGeraisPage } from "../registro/informacoes-gerais/informacoes-gerais";

import { AppVersion } from '@ionic-native/app-version';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  temosCondicoesPage = TermosCondicoesPage;
  continuarRegistroPage = ContinuarRegistroPage;
  autenticarRegistroPage = AutenticarRegistroPage;
  retificarRegistroPage = RetificarRegistroPage;
  faqPage = FaqPage;
  registro: RegistroModel;
  versionNumber;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public registroService: RegistroService, 
    private appVersion: AppVersion) {

    this.appVersion.getVersionNumber().then(version => {
      this.versionNumber = version;
    });

  }

  iniciarRegistro() {
    this.registroService.existeRegistro().then(protocolo => {
      if (protocolo) {
        this.showAlert();
      }
      else {
        this.registroService.novoRegistro();
        this.navCtrl.push(this.temosCondicoesPage);
      }
    });
  }

  showAlert() {
    let confirm = this.alertCtrl.create({
      title: "Já existe um registro em andamento deseja continuar?",
      message: 'Clique em "Sim" para continuar ou "Não" para iniciar um novo registro.',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.registroService.continuarRegistro();
            this.navCtrl.push(InformacoesGeraisPage);
          }
        },
        {
          text: 'Iniciar novo registro',
          handler: () => {
            this.registroService.novoRegistro();
            this.navCtrl.push(this.temosCondicoesPage);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            confirm.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }

}
