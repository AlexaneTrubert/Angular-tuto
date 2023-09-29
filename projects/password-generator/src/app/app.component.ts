import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = 'Cliquez sur le bouton "Générer"';
  length= 20;
  uppercase = false;
  numbers = false;
  symbols = false;

  onClickGenerate() {
    this.message = 'MON_MOT_DE_PASSE';
    console.log("Génération du mot de passe avec :");
    console.table({
      uppercase: this.uppercase,
      numbers: this.numbers,
      symbols: this.symbols,
      length: this.length
    })
  }

  onChangeLength(event: Event) {
    this.length = +(event.target as HTMLInputElement).value;
  }

  onChangeSettings(settingName: string, settingValue: boolean) {
    if (settingName !== 'uppercase' && settingName !== 'numbers' && settingName !== 'symbols') {
      return
    }
    this[settingName] = settingValue;
  }
}
