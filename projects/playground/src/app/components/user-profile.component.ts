import {Component, ElementRef, Input, ViewChild} from "@angular/core";

@Component({
  selector: 'user-profile',
  template: `<h3 [class.hired]="isHired">{{ firstName }} {{ lastName | uppercase }}</h3>
  <img [src]="avatar" [alt]="'Avatar de ' + firstName"/>
  Métier: <strong>{{ job }} ({{ revenue | currency:'EUR':'symbol'}} / mois)</strong>
  <button (click)="onClickButton($event.clientX)">Embaucher</button>
  <input
    #prenom
    type="text"
    placeholder="Nouveau prénom"/>
  <button (click)="changePrenom()">Changer de prénom</button>`,
  styles: [
    `
      h3 {
        color: blue;
      }

      .hired {
        background-color: green;
      }
    `,],
})
export class UserProfileComponent {
  @ViewChild('prenom')
  prenom?: ElementRef<HTMLInputElement>;
  @Input('first-name')
  firstName = ''
  @Input('last-name')
  lastName = ''
  @Input()
  job = ''
  @Input('hired')
  isHired = false

  avatar = 'https://via.placeholder.com/30';

  revenue = 1200;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit() {
    if (this.prenom) {
      this.prenom.nativeElement.value = 'Thomas';
    }
  }

  onClickButton(coordx: number) {
    this.isHired = true;
    console.log(coordx);
  }

  onFrappeAuClavier(event: Event) {
    this.firstName = (event.target as HTMLInputElement).value;
  }

  changePrenom() {
    if (!this.prenom) {
      return;
    }
    this.firstName = this.prenom.nativeElement.value;
  }
}
