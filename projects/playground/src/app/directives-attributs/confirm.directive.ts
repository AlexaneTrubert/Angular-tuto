import {Directive, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
  selector: 'a[confirm]'
})
export class ConfirmDirective {
  @Input('confirm-message')
  baseConfirmMessage = "Est tu sur de vouloir aller sur la poubelle du web ?";

  @HostListener('click', ['$event'])
  onClick() {
    return window.confirm(this.baseConfirmMessage);
  }

}
