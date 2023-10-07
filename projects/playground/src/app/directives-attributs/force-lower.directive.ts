import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output} from "@angular/core";

@Directive({
  selector: 'input[force-lower]',
})
export class ForceLowerDirective {

  @Input('value')
  @HostBinding('value')
  value = "";

  @HostListener('input', ['$event.target.value'])
  onInput(value: string){
    this.value = value.toLowerCase();
  }

  ngOnInit() {
    this.value = this.value.toLowerCase();
  }
}
