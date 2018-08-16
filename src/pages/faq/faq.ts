import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {FaqItemPage} from "./faq.item";
import {FaqService} from "../../services/faq";

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FaqPage implements OnInit {
  faqList: {pergunta: string, resposta: string}[];
  faqItemPage = FaqItemPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public faqService: FaqService) {

  }

  ngOnInit() {
    this.faqService.getApiData().subscribe(
      data => {
        this.faqList = data;
      },
      err => {
        this.faqList = this.faqService.getLocalData();
        console.log(err)
      }
    );
  }
}
