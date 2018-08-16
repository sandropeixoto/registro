import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector:'nav-component',
  templateUrl: 'nav-component.html'
})

export class NavComponent{  
  @Input() title;  
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  onClickAvancar(){
    this.clickEvent.emit();
  }
}
