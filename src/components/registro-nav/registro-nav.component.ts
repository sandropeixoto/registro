/**
 * Created by Israel P. Siqueira on 02/02/2017.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector:'registro-nav-component',
  templateUrl: 'registro-nav.component.html'
})

export class RegistroNavComponent{
  
  @Input() index: number;  
  
}
