import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {InformacoesIniciaisPage} from "../informacoes-iniciais/informacoes-iniciais";

@Component({
  selector: 'page-termos-condicoes',
  templateUrl: 'termos-condicoes.html'
})
export class TermosCondicoesPage {
  informacoesIniciaisPage = InformacoesIniciaisPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToHome(){
    this.navCtrl.popToRoot();
}

}
