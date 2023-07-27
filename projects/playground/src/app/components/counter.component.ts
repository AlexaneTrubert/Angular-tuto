import {Component, Input} from "@angular/core";

@Component({
  selector: 'counter',
  template:`Valeur : <strong>{{ value }}</strong><br/>
  <button (click)="onClickAjout()">Ajouter</button>
  <button (click)="onClickRetrait()">Retirer</button>`,
  styles: [``],
})
export class CounterComponent {
  @Input('initial-value')
  value = 0;
  @Input('step')
  step = 1;

  onClickAjout() {
    this.value += this.step;
  }

  onClickRetrait() {
    this.value -= this.step;
  }

}
