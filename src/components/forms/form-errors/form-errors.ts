import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'form-errors',
  templateUrl: 'form-errors.html'
})
export class FormErrorComponent implements OnInit {

  validatorErrors: any;
  @Input() formGroup: FormGroup;
  @Input() validationMessages;

  constructor() {
  }

  ngOnInit() {
    this.validatorErrors = this.formErrors(this.formGroup, this.validationMessages);
    this.formGroup.valueChanges
      .distinctUntilChanged()
      .subscribe(() => {
        this.validatorErrors = this.formErrors(this.formGroup, this.validationMessages);
      });
  }


  formErrors(formGroup, validationMessages) {
    const controls = formGroup.controls;
    let validatorErrors = [];
    for (let field in validationMessages) {
      if (!controls[field].valid) {
        for (let error in controls[field].errors) {
          validatorErrors.push({field: field, message: validationMessages[field][error]});
        }
      }
    }
    return validatorErrors;
  }


}
