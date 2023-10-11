import { Component } from '@angular/core';
import {Settings} from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = 'Cliquez sur le bouton "Générer"';

  settings: Settings = {
    length: 30,
    uppercase: false,
    numbers: false,
    symbols: false
  }

  get settingsCopy() {
    return {...this.settings};
  }

  onClickGenerate() {
    this.message = 'MON_MOT_DE_PASSE';
    console.log("Génération du mot de passe avec :");
    console.table(this.settings);
  }

  onSettingsChange(obj: Settings) {
    this.settings = obj;
  }
}
