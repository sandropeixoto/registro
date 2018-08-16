import {Component, ViewChild} from "@angular/core";
import {NavController, Slides} from "ionic-angular";
import {HomePage} from "../../pages/home/home";

@Component({
    selector: 'intro-slides',
    templateUrl: 'intro-slides.html'
})
export class IntroSlidesComponent {

  @ViewChild(Slides) slides:Slides;

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad(){

  }

  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
