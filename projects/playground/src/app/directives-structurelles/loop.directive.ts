import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[loopOf]'
})
export class LoopDirective {
  @Input('loopOf')
  arr: any[] = [];

  oldArr: any[] = [];

  constructor(private templateRef: TemplateRef<any>, private containerRef: ViewContainerRef) {
  }

  ngDoCheck() {

    if (this.oldArr.length !== this.arr.length) {
      this.containerRef.clear();
      this.arr.forEach((item, index) => {
        this.containerRef.createEmbeddedView(this.templateRef, {
          index,
          $implicit: item
        });
      });
      this.oldArr = [...this.arr]
    }
  }
}
