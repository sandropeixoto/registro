import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnderecoService} from "../../../services/endereco";
import {RegistroService} from "../../../services/registro";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {masks, regex} from "../input-masks";
import {listaUf} from "../../../data/lista-uf";

@Component({
  selector: 'endereco-form',
  templateUrl: 'endereco.html'
})
export class EnderecoForm implements OnInit {

  @Input() parentController: FormGroup;
  @Input() isSubmited: boolean;
  @Input() noValidate?: boolean;
  isProprietario:boolean = false;
  
  endereco: FormGroup;
  validationMessages;
  cepMask = masks.cep;
  listaUf = listaUf;

  constructor(public fb: FormBuilder,
              public enderecoService: EnderecoService,
              public registroService:RegistroService) {
  }

  ngOnInit(): void {
    if (this.noValidate) {
      this.inicializaNoValidateForm();
    }
    else {
      this.inicializaForm();
    }

    this.endereco.controls['cep'].valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(cepData => {
        if (cepData) {        
          this.searchCepAndUpdate(cepData);
        }
      });
  }

  inicializaForm() {
    this.endereco = this.fb.group({
      uf: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      logradouro: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: null,
      cep: [null, [Validators.required,Validators.pattern("\\d{5}-\\d{3}")]],
    });

    this.validationMessages = {
      'uf': {
        'required': 'O campo UF é obrigatório'
      },
      'cidade': {
        'required': 'O campo CIDADE é obrigatório'
      },
      'bairro': {
        'required': 'O campo BAIRRO é obrigatório'
      },
      'logradouro': {
        'required': 'O campo LOGRADOURO é obrigatório'
      },
      'numero': {
        'required': 'O campo NÚMERO é obrigatório'
      },
      'cep': {
        'required': 'O campo CEP é obrigatório',
        'pattern':'O campo CEP está no formato inválido'
      },
    };

    this.parentController.addControl('endereco', this.endereco);
  }

  inicializaNoValidateForm() {
    this.endereco = this.fb.group({
      uf: [null,],
      cidade: [null,],
      bairro: [null,],
      logradouro: [null,],
      numero: [null,],
      complemento: null,
      cep: [null,],
    });
    this.parentController.addControl('endereco', this.endereco);

  }


  searchCepAndUpdate(cep) {
    let cepRegex = cep.replace(regex.cep, ''); //regex para somente numeros
    this.enderecoService.get(cepRegex)
      .subscribe(data => {
        if (data.cep) {
          this.endereco.patchValue({
            cidade: data.localidade,
            uf: data.uf,
            bairro: data.bairro,
            logradouro: data.logradouro,            
            cep: data.cep
          })
        }
      });
  }

}

