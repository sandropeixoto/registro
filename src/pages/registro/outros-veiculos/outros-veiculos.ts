import {Component, OnInit} from "@angular/core";
import {NavController, AlertController, NavParams, ModalController} from "ionic-angular";
import {RegistroService} from "../../../services/registro";
import {VeiculoModel} from "../../../models/veiculo";
import {OutrosVeiculosModal} from "./outros-veiculos-modal";
import {NarrativaPage} from "../narrativa/narrativa";


@Component({
  selector: 'page-outros-veiculos',
  templateUrl: 'outros-veiculos.html'
})

export class OutrosVeiculosPage implements OnInit {
  title: string = "Outros Veículos";

  hiddenList: boolean;

  outrosVeiculosList: VeiculoModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public registroService: RegistroService,
              public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.updateVeiculosList();
    console.log(this.outrosVeiculosList);
  }

  private updateVeiculosList() {
    this.outrosVeiculosList = this.registroService.getOutrosVeiculos();
    this.hiddenList = this.outrosVeiculosList.length <= 0;
  }

  validaForm() {
    this.navCtrl.push(NarrativaPage);
  }

  adicionarVeiculo() {
    if (this.outrosVeiculosList.length >= 4) {
      this.callAlert();
      return;
    }
    this.showVeiculoModal('New', null);
  }

  editarVeiculo(veiculo: VeiculoModel) {
    this.showVeiculoModal('Edit', veiculo);
  }

  removerVeiculo(veiculo: VeiculoModel) {
    this.registroService.removerVeiculo(veiculo);
    this.updateVeiculosList();
  }

  showVeiculoModal(mode, veiculo) {
    const modal = this.modalCtrl.create(OutrosVeiculosModal, {mode: mode, veiculo: veiculo});
    modal.onDidDismiss(() => {
      this.updateVeiculosList();
    });

    modal.present();
  }
  removerVeiculoSelecionado(veiculo:VeiculoModel) {
    let confirm = this.alertCtrl.create({
      title: 'Isto irá remover o veículo selecionado, deseja continuar?',
      message: 'Clique em "Remover" para continuar ou "Cancelar" para voltar a tela anterior.',
      buttons: [
        {
          text: 'Remover',
          role:'destructive',
          handler: () => {
            this.removerVeiculo(veiculo);
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
  callAlert() {
    let confirm = this.alertCtrl.create({
      title: 'Não é possivel adicionar outro veículo',
      message: 'O acidente não deve ter envolvido mais de 5 veículos, incluindo o veículo principal',
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
    confirm.present();
  }
}
