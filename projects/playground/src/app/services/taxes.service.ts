import {Inject, Injectable, InjectionToken} from "@angular/core";

export const TAUX_TVA = new InjectionToken("Le taux de TVA");

@Injectable()
export class TaxesService {
  total: number = 0;

  constructor(@Inject(TAUX_TVA) private tauxDeTVA: number) {
    console.log("Je suis le service n°" + Math.random());
  }

  calculate(revenu: number): number {
    console.log("Appel HTTP réalisé");

    this.total += revenu;
    return revenu + 1000;
  }
}
