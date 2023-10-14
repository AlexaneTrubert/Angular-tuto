import {Component} from "@angular/core";
import {TaxesService} from "../services/taxes.service";

@Component({
  selector: 'declaration-impots',
  template: `
    <h3>Déclaration : </h3>
    <input #revenu type="number" placeholder="Déclarer vos revenus">
    <button (click)="onClickDeclaration(revenu.valueAsNumber)">Déclarer</button>
    <article>Vos impôts : {{ resultat }} €</article>
  `,
})
export class DeclarationComponent {
  resultat: number = 0;

  constructor(private service: TaxesService) {
  }

  onClickDeclaration(revenu: number) {
    this.resultat = this.service.calculate(revenu);
  }
}
