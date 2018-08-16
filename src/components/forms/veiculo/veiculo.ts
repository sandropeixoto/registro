import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {RegistroModel} from "../../../models/registro";
import {FormEnum} from "../../../models/form-enum";
import {FormEnumService} from "../../../services/form-enum";
import {masks} from "../input-masks";

@Component({

  selector: 'veiculo-form',
  templateUrl: 'veiculo.html'
})

export class VeiculoForm implements OnInit {

  @Input() isPrincipal:boolean;
  @Input() parentController:FormGroup;
  veiculoForm: FormGroup;
  registro: RegistroModel;
  tipoVeiculo: FormEnum[];
  categoriaVeiculo: FormEnum[];
  manobraAcidente: FormEnum[];
  situacaoVeiculo:FormEnum[];
  placaMask = masks.placa;

  constructor(public fb: FormBuilder,
              public formService:FormEnumService,) {
  }

  ngOnInit() {
    this.inicializaFormEnum();
    this.inicializaForm();
  }

  private inicializaForm() {
    this.veiculoForm = this.fb.group({
      situacao: null,
      placa: null,
      renavam: null,
      veiculoPrincipal: this.isPrincipal,
      segurado: null,
      nomeSeguradora: null,
      manobraDuranteAcidente: null,
      danosSistemaDeSeguranca: false,
      reboques: null,
      //danos:
      //proprietario:,
      //condutor: ,
      //imagens: FormGroup,
    });
    this.parentController.addControl('veiculo',this.veiculoForm);
  }

  private inicializaFormEnum() {
    this.categoriaVeiculo = this.formService.veiculosCategoria;
    this.manobraAcidente = this.formService.manobrasTipo;
    this.tipoVeiculo = this.formService.veiculosTipo;
    this.situacaoVeiculo = this.formService.situacaoVeiculo;
  }
}
