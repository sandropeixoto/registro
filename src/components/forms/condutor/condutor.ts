import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormEnum} from "../../../models/form-enum";
import {FormEnumService} from "../../../services/form-enum";
import {listaUf} from "../../../data/lista-uf";
import {RegistroService} from "../../../services/registro";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'condutor-form',
  templateUrl: 'condutor.html'
})
export class CondutorForm implements OnInit {
  @Input() parentController: FormGroup;
  @Input() isSubmited: boolean;

  isPrincipal: boolean;
  condutorForm: FormGroup;
  validationMessages;
  @Input() noValidate:boolean;
  categoriaCnh: FormEnum[];
  listaUf;

  constructor(public fb: FormBuilder,
              public registroService: RegistroService,
              public formService: FormEnumService) {
  }  

  ngOnInit() {
    this.categoriaCnh = this.formService.cnhCategoria;
    this.listaUf = listaUf;

    this.isPrincipal = this.parentController.get('veiculoPrincipal').value;   
   

    if (this.isPrincipal) {
      this.inicializaFormVeiculoPrincipal();      
    }
    else if(!this.noValidate){
       this.inicializaFormVeiculoPrincipal(); 
    }
    else {
      this.inicializaFormVeiculo();
    }

    this.condutorForm.controls['naoHabilitado']
        .valueChanges
        .distinctUntilChanged()
        .subscribe(value => {
          if (value) {
            this.condutorForm.controls['numeroRegistro'].setValue(null);
            this.condutorForm.controls['dataNascimento'].setValue(null);
            this.condutorForm.controls['ufCNH'].setValue(null);
            this.condutorForm.controls['categoriaCNH'].setValue(null);
            this.condutorForm.controls['dataPrimeiraCNH'].setValue(null);            
            this.condutorForm.controls['validadeCNH'].setValue(null);
          }
        })
    
  }


validateField(group:FormGroup){
  let naoHabilitado = group.get('naoHabilitado').value  
  if(!naoHabilitado ){
    let numeroRegistro = group.get('numeroRegistro');    
    let validadeCNH = group.get('validadeCNH');
    let dataNascimento = group.get('dataNascimento');
    let dataPrimeiraCNH = group.get('dataPrimeiraCNH');

    if(new Date(dataPrimeiraCNH.value)>= new Date(validadeCNH.value)){
      validadeCNH.setErrors({
        dataMinima:true
      })
    }

    let valid:boolean = numeroRegistro.value && numeroRegistro.value!='';
    if(!valid){
      numeroRegistro.setErrors({
        required:true
      });
    }

    valid = dataNascimento.value && dataNascimento.value!='';
    if(!valid){
      dataNascimento.setErrors({
        required:true
      });
    }

    valid = dataPrimeiraCNH.value && dataPrimeiraCNH.value!='';
    if(!valid){
      dataPrimeiraCNH.setErrors({
        required:true
      });
    }

    valid = validadeCNH.value && validadeCNH.value!='';
    if(!valid){
      validadeCNH.setErrors({
        required:true
      });
    }    
  }  
}

  inicializaFormVeiculoPrincipal() {
    this.condutorForm = this.fb.group({
      naoHabilitado: false,
      dataNascimento:[null,],
      numeroRegistro: [null, [Validators.minLength(11),Validators.maxLength(11)]],
      dataPrimeiraCNH: [null, ],
      validadeCNH: [null, ],
      ufCNH: 'PA',
      categoriaCNH: null,
    },{validator:this.validateField});

    this.validationMessages = {
      'numeroRegistro': {
        'required': 'O campo NÚMERO do registro é obrigatório',
        'minlength': 'O campo NÚMERO deve ter 11 caracteres',
        'maxlength': 'O campo NÚMERO deve ter 11 caracteres'
      },
      'ufCNH': {
        'required': 'O campo UF é obrigatório'
      },
      'dataPrimeiraCNH': {
        'required': 'O campo DATA 1º CNH é obrigatório'
      },
      'validadeCNH': {
        'required': 'O campo VALIDADE da CNH é obrigatório',
        'dataMinima': "A VALIDADE da CNH deve ser maior que a data da 1ª habilitação"
      },
      'dataNascimento':{
        'required': 'O campo DATA DE NASCIMENTO é obrigatório'
      }
    };    

    this.parentController.addControl('condutor', this.condutorForm);

  }

  inicializaFormVeiculo() {

    this.condutorForm = this.fb.group({
      naoHabilitado: false,
      numeroRegistro: [null,],
      dataPrimeiraCNH: [null,],
      validadeCNH: [null,],
      ufCNH: 'TO',
      categoriaCNH: null,
    });

    this.validationMessages = {};

    this.parentController.addControl('condutor', this.condutorForm);

  }

}
