import {Directive, ElementRef, Input, SimpleChanges} from "@angular/core";

@Directive({
  selector: '[set-classes]',
})
export class SetClassesDirective{
  @Input('set-classes')
  cssClasses: {[key: string]: boolean} = {};
  @Input('exemple')
  exemple = '';

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['cssClasses']) {
      return;
    }

    const cle = Object.keys(this.cssClasses);
    cle.forEach(className => {
      if(this.cssClasses[className]) {
        this.elementRef.nativeElement.classList.add(className);
        return
      }

      this.elementRef.nativeElement.classList.remove(className);
    });
  }
}
