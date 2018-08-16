import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {RegistroService} from "../../services/registro";
import {InformacoesGeraisPage} from "../registro/informacoes-gerais/informacoes-gerais";

@Component({
  selector: 'page-continuar-registro',
  templateUrl: 'continuar-registro.html'
})
export class ContinuarRegistroPage implements OnInit {
  title: string = "Continuar Registro";
  hiddenList: boolean;
  protocolo: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public registroService: RegistroService) {
  }

  ngOnInit() {
    this.registroService.existeRegistro().then(protocolo => {
      if (protocolo) {
        this.hiddenList = false;
        this.protocolo = protocolo;
      }
      else {
        this.hiddenList = true;
      }
    });

  }

  validaForm() {
    if (this.hiddenList) {
      console.log('nao existe registro');
    }
    else {
      this.registroService.continuarRegistro();
      this.navCtrl.push(InformacoesGeraisPage);
    }
  }



}
