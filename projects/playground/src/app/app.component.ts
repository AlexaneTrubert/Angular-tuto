import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  age = 30;
  nationalite = "Suisse";
  prenom = "Alexane";

  getBgColor() {
    return this.age < 18 ? 'green' : 'transparent';
  }

}
