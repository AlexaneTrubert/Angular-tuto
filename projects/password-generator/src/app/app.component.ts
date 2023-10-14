import { Component } from '@angular/core';
import {Settings} from "./types";
import {PasswordGeneratorService} from "./password-generator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  password?: string;

  settings: Settings = {
    length: 30,
    uppercase: false,
    numbers: false,
    symbols: false
  }

  constructor(private service: PasswordGeneratorService) {}

  get settingsCopy() {
    return {...this.settings};
  }

  onClickGenerate() {
    this.password = this.service.generate({
      length: this.settings.length,
      uppercase: this.settings.uppercase,
      numbers: this.settings.numbers,
      symbols: this.settings.symbols
    });
    console.log("Génération du mot de passe avec :");
    console.table(this.settings);
  }

  onSettingsChange(obj: Settings) {
    this.settings = obj;
  }
}
