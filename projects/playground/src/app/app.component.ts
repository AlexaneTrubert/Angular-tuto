import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onConfirm(email: string) {
    console.log("Depuis l'extérieur du component : click sur le bouton", email);
  }
}
