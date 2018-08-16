import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormEnum} from "../../../models/form-enum";
import {FormEnumService} from "../../../services/form-enum";
import {masks, regex} from "../input-masks";
import {TestaCPF} from "../../../services/valida-cpf"
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'declarante-form',
  templateUrl: 'declarante.html'
})
export class DeclaranteForm implements OnInit {

  @Input() parentController: FormGroup;
  @Input() isSubmited: boolean;
  declarante: FormGroup;
  validationMessages;
  estrangeiro:boolean;

  tipoDeclarante: FormEnum[];
  tipoDocumento: FormEnum[];

  telefoneMask = masks.telefone;
  cpfMask = masks.cpf;
  paisMask = masks.pais;

  constructor(public fb: FormBuilder,
              public formService: FormEnumService,) {
  }

  ngOnInit() {    
    this.inicializaForm();    
    this.declarante.get('estrangeiro').valueChanges
    .distinctUntilChanged()
    .subscribe((value)=>{
      if(!value){
        this.declarante.get('numeroDocumentoEstrangeiro').setValue(null);
        this.declarante.get('tipoDocumentoEstrangeiro').setValue(null);
        this.declarante.get('paisEstrangeiro').setValue(null);        
      }
    })
  }

validateField(group:FormGroup){
  let estrangeiro = group.get('estrangeiro').value
  let cpf = group.get('cpf')
  
  if (!TestaCPF(cpf.value)) {
    cpf.setErrors({
      invalido: true
    })
  };

    
  if (estrangeiro) {
    let numeroDocumentoEstrangeiro = group.get('numeroDocumentoEstrangeiro');
    let tipoDocumentoEstrangeiro = group.get('tipoDocumentoEstrangeiro');
    let paisEstrangeiro = group.get('paisEstrangeiro');    
    
    let valid: boolean = numeroDocumentoEstrangeiro.value && numeroDocumentoEstrangeiro.value != '';
    if (!valid) {
      numeroDocumentoEstrangeiro.setErrors({
        required: true
      });
    }
    valid = tipoDocumentoEstrangeiro.value && tipoDocumentoEstrangeiro.value != '';
    if (!valid) {
      tipoDocumentoEstrangeiro.setErrors({
        required: true
      });
    }
    valid = paisEstrangeiro.value && paisEstrangeiro.value != '';
    if (!valid) {
      paisEstrangeiro.setErrors({
        required: true
      });
    }    
  }
  }

  
 
  inicializaForm() {
    this.declarante = this.fb.group({
      tipo: 'condutor_e_proprietario',
      estrangeiro: false,
      tipoDocumentoEstrangeiro: [null],
      numeroDocumentoEstrangeiro: [null,],
      paisEstrangeiro: [null,],
      nome: [null, [Validators.required,Validators.minLength(5)]],
      cpf: [null, [Validators.required, Validators.pattern(regex.cpf)]],
      sexo: [null,Validators.required],
      dataNascimento: [null,Validators.required],
      email: [null, [Validators.required, Validators.pattern(regex.email)]],
      profissao: [null, [Validators.required,Validators.minLength(5)]],
      celular: [null, Validators.required],
      //endereco
    },{validator:this.validateField});     

    this.validationMessages = {
      'nome': {
        'required': 'O campo NOME é obrigatório',
        'minlength': 'O campo NOME deve ter no mínimo 5 caracteres'
      },
      'cpf': {
        'required': 'O campo CPF é obrigatório',
        'pattern': 'O campo CPF está em formato inválido',
        'invalido':'O CPF informado é inválido'
      },
      'email': {
        'required': 'O campo EMAIL é obrigatório',
        'pattern': 'email inválido'
      },
      'sexo':{
        'required':'O campo SEXO é obrigatório'
      },
      'profissao': {
        'required': 'O campo PROFISSÃO é obrigatório',
        'minlength':'O campo PROFISSÃO deve ter no mínimo 5 caracteres'
      },
      'dataNascimento': {
        'required': 'O campo DATA DE NASCIMENTO é obrigatório',
      },
      'celular': {
        'required': 'O campo CELULAR é obrigatório'
      },
      'numeroDocumentoEstrangeiro':  {
        'required':'O campo número DOCUMENTO ESTRANGEIRO é obrigatório',        
      },
      'paisEstrangeiro': {
        'required': 'O campo PAÍS estrangeiro é obrigatório'
      },
      'tipoDocumentoEstrangeiro': {
        'required': 'O campo tipo DOCUMENTO estrangeiro é obrigatório'
      },
    };

    this.parentController.addControl('declarante', this.declarante);
    this.tipoDeclarante = this.formService.tipoDeclarante;
    this.tipoDocumento = this.formService.documentosDeclarante;
  }
}
