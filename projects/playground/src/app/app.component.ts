import {Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  age = 35;
  pages = 5;

  personnes = [
    { prenom: 'Alexane', nom: 'Bruchacsek'},
    { prenom: 'Elodie', nom: 'Gareil'},
    { prenom: 'Tokyo', nom: 'Trubert'},
  ]

  addPersonne() {
    this.personnes.push({ prenom: 'John', nom: 'Doe'});
  }
}
