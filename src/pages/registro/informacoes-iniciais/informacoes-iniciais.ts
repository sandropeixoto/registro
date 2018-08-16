import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, ToastController} from "ionic-angular";
import {InformacoesGeraisPage} from "../informacoes-gerais/informacoes-gerais";
import data from "./informacoes-iniciais.data";
import {RegistroModel} from "../../../models/registro";

@Component({
  selector: 'page-informacoes-iniciais',
  templateUrl: 'informacoes-iniciais.html'
})
export class InformacoesIniciaisPage implements OnInit{
  title:string = "Informações Iniciais";
  registro:RegistroModel;
  informacoesGeraisForm: {question: string, selectedValue: boolean, validValue:boolean, errorMessage:string}[];

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, public navParams:NavParams) {

  }
  ngOnInit(){
    this.informacoesGeraisForm = data;
  }

  validaForm(){
    for(let i of this.informacoesGeraisForm){
      if(i.selectedValue!=i.validValue){
        this.showValidatorToast(i);
        return;
      }
    }
    this.navCtrl.push(InformacoesGeraisPage);
  }

  showValidatorToast(item) {
    let toast = this.toastCtrl.create({
      message: item.errorMessage,
      duration: 3000,
      position:'bottom',
    });
    toast.present();
  }

}
