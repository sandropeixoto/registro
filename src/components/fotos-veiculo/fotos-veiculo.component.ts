import { Component, OnInit, Input } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActionSheetController } from 'ionic-angular';
//import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  templateUrl: 'fotos-veiculo.component.html',
  selector: 'fotos-veiculo-component'
})

export class FotosVeiculoComponent implements OnInit {
  imagemForm: FormGroup;
  @Input() parentController: FormGroup;
  @Input() isSubmited;
  validationMessages;

  constructor(public fb: FormBuilder, public actionSheetCtrl: ActionSheetController,
    //private backgroundMode: BackgroundMode, 
    public camera: Camera) {

  }

  items = [
    { key: 'dianteira', value: 'Dianteira' },
    { key: 'lateralDireita', value: 'Lateral Direita' },
    { key: 'lateralEsquerda', value: 'Lateral Esquerda' },
    { key: 'traseira', value: 'Traseira' },
    { key: 'panoramica', value: 'Visão Geral do local' }
  ];

  validateField(group: FormGroup) {
    const items = ['dianteira', 'lateralDireita', 'lateralEsquerda', 'traseira', 'panoramica',];
    for (let item of items) {
      let control = group.get(item);
      if (control.value == 'assets/camera-icon-50.png') {
        // control.setErrors({
        //   required:true
        // })
      }
    }
  }

  ngOnInit() {
    this.imagemForm = this.fb.group({
      dianteira: ['assets/camera-icon-50.png'],
      lateralDireita: ['assets/camera-icon-50.png'],
      lateralEsquerda: ['assets/camera-icon-50.png'],
      panoramica: ['assets/camera-icon-50.png'],
      traseira: ['assets/camera-icon-50.png'],
    }, { validator: this.validateField });

    this.validationMessages = {
      'dianteira': {
        'required': 'A foto DIANTEIRA é obrigatória',
      },
      'lateralDireita': {
        'required': 'A foto LATERAL DIREITA é obrigatória',
      },
      'lateralEsquerda': {
        'required': 'A foto LATERAL ESQUERDA é obrigatória',
      },
      'panoramica': {
        'required': 'A foto VISÃO GERAL DO LOCAL é obrigatória',
      },
      'traseira': {
        'required': 'A foto TRASEIRA é obrigatória',
      },

    };

    this.parentController.addControl('imagens', this.imagemForm);
  }

  ionViewWillLeave() {

  }

  takeFoto(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Fazer upload de onde?',
      buttons: [
        {
          text: 'Câmera',
          handler: () => {
            console.log('Camera clicked');
            //this.backgroundMode.enable();
            this.takeFotoWithCamera(item);
            //this.backgroundMode.disable();
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            console.log('Archive clicked');
            //this.backgroundMode.enable();
            this.takeFotoWithAlbum(item);
            //this.backgroundMode.disable();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takeFotoWithCamera(item) {

    let cameraOptions: CameraOptions = {
      targetWidth: 400,
      targetHeight: 400,
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.imagemForm.get(item).setValue("data:image/jpeg;base64," + imageData);
    })
      .catch(err => console.log(err));
  }

  takeFotoWithAlbum(item) {

    let cameraOptions: CameraOptions = {
      targetWidth: 400,
      targetHeight: 400,
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.imagemForm.get(item).setValue("data:image/jpeg;base64," + imageData);
    })
      .catch(err => console.log(err));
  }

}
