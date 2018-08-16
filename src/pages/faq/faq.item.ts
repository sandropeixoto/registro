import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'faq-item-page',
  template: `<ion-header no-border>
             <ion-navbar  color="primary">
                <ion-title>F.A.Q</ion-title>
              </ion-navbar>
            </ion-header>
            <ion-content padding>

            <h3>{{faq.pergunta}}</h3>
            <p text-justify  style="color: #4d4d4d">{{faq.resposta}}</p>            
            </ion-content>`
})

export class FaqItemPage{
  faq: {title:string,text:string};
  constructor(private navParams:NavParams){
    this.faq = navParams.data;
  }

}
