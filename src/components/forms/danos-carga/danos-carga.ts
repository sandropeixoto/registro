import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {FormEnum} from "../../../models/form-enum";
import {FormEnumService} from "../../../services/form-enum";

@Component({
  selector: 'danos-carga-form',
  templateUrl: 'danos-carga.html'
})
export class DanosCargaForm implements OnInit {
  @Input() parentController: FormGroup;
  @Input() isSubmited:boolean;
  danosCargaForm: FormGroup;
  validationMessages;
  estimativaDanoCarga:FormEnum[];

  constructor(public fb: FormBuilder,formService:FormEnumService) {
    this.estimativaDanoCarga = formService.danoCargaEstimativa;
  }

  ngOnInit() {
    this.danosCargaForm = this.fb.group({
      danosNaCarga: true,      
      notasFiscaisCarga: null,
      tipoMercadoriaCarga: null,
      valorTotalCarga: null,
      estimativasDanosCarga: null,
      possuiSeguroCarga: false,
      seguradoraCarga: null
    });

    this.parentController.addControl('danos',this.danosCargaForm);
  }
}
