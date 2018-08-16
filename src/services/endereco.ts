import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";


@Injectable()
export class EnderecoService {

  private baseUrl: string = 'http://viacep.com.br/ws';

  constructor(private http: Http) {
  }

  get(cep: string) {
    return this.http
      .get(`${this.baseUrl}/${cep}/json`)
      .map(response => response.json());
  }
}
