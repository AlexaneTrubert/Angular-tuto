import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'password-controls',
  template: `
    <button (click)="onClickGenerate()">Générer</button>`,
  styles: []
})
export class PasswordControlsComponent {
  @Output('generate')
  onGenerateEvent = new EventEmitter();

  onClickGenerate() {
    this.onGenerateEvent.emit();
  }
}
