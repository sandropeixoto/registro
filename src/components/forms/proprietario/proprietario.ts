import {Component,  OnInit,  Input} from '@angular/core';
import {FormBuilder,  FormGroup,  Validators} from "@angular/forms";
import {RegistroService} from "../../../services/registro";
import { masks } from "../input-masks";
import {TestaCPF, validarCNPJ} from "../../../services/valida-cpf"

@Component({
  selector: 'proprietario-form',
  templateUrl: 'proprietario.html'
})
export class ProprietarioForm implements OnInit {
  @Input() parentController: FormGroup;
  @Input() isSubmited: boolean;
  @Input() noValidate: boolean;
  isPassageiro:boolean;
  proprietarioForm: FormGroup;
  validationMessages;
  cpfMask = masks.cpf;
  generalMask = this.cpfMask;

  constructor(
    public fb: FormBuilder,
    public registroService: RegistroService,
  ) {}


ngOnInit() {
  try{
     this.isPassageiro = this.registroService.registro.declarante.tipo == 'passageiro'; 
  } 
  catch(e) {console.log(e);} 
    
    
  if (this.noValidate || this.isPassageiro) {
    this.inicializaNoValidateForm();
  } else {
    this.inicializaForm();
  }

  this.proprietarioForm.get('cpfOuCnpj').valueChanges.subscribe(value=>{
    let isCPF = this.proprietarioForm.get('isCPF');
    if(value.length>14){
      isCPF.setValue(false);
      this.generalMask = masks.cnpj;
    }
    else{
      isCPF.setValue(true);
      this.generalMask = masks.cpf;
    }
  })
}

validateField(group:FormGroup){
  let cpf = group.get('cpfOuCnpj');
  let isCPF = group.get('isCPF').value;

  if(cpf.value){
    if(isCPF && !TestaCPF(cpf.value)){
      cpf.setErrors({
        invalido:true
      })
    }
  if(!isCPF && !validarCNPJ(cpf.value)){
    cpf.setErrors({
        invalido:true
      })
  } 
  }
  
}

  inicializaNoValidateForm() {
    this.proprietarioForm = this.fb.group({
      isCPF: {value:true, disabled:true},
      cpfOuCnpj: [null,[Validators.minLength(14), Validators.maxLength(18)]],
      nome: [null, Validators.minLength(5)],
      //endereco:FormGroup
    },{validator:this.validateField});
    
    this.validationMessages = {
      'cpfOuCnpj': {
        'required': 'O campo CPF/CNPJ é obrigatório',
        'minlenght': 'O campo CPF/CNPJ deve ter no mínimo 14 caracteres',
        'maxlenght': 'O campo CPF/CNPJ deve ter no mínimo 18 caracteres',        
        'invalido':'O CPF informado é inválido'

      },
      'nome': {
        'required': 'O campo NOME é obrigatório',
        'minlength': 'O campo NOME deve ter no mínimo 5 caracteres'
      },

    };
    this.parentController.addControl('proprietario', this.proprietarioForm);
  }

  inicializaForm(){
    this.proprietarioForm = this.fb.group({
      isCPF: {value:true, disabled:true},
      cpfOuCnpj: [null,[Validators.minLength(14), Validators.maxLength(18), Validators.required]],
      nome: [null, [Validators.minLength(5), Validators.required]],
      //endereco:FormGroup
    },{validator:this.validateField});
    this.validationMessages = {
      'cpfOuCnpj': {
        'required': 'O campo CPF/CNPJ é obrigatório',
        'minlenght': 'O campo CPF/CNPJ deve ter no mínimo 14 caracteres',
        'maxlenght': 'O campo CPF/CNPJ deve ter no mínimo 18 caracteres',        
        'invalido':'O CPF/CNPJ informado é inválido'

      },
      'nome': {
        'required': 'O campo NOME é obrigatório',
        'minlength': 'O campo NOME deve ter no mínimo 5 caracteres'
      },

    };
    this.parentController.addControl('proprietario', this.proprietarioForm);
  }

}
