import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import localData from "./faq.data";
import 'rxjs/add/operator/catch';


@Injectable()
export class FaqService {

  private _apiLocal: string = 'http://detranpa.infosolo.com.br/api/v1';

  constructor(private http: Http) {

  }


  public getApiData() {
    return this.http.get(this._apiLocal + '/registroAcidente/faq')
      .map(response => response.json() as {pergunta: string, resposta: string}[]);
  }

  public getLocalData() {
    return localData;
  }
}
