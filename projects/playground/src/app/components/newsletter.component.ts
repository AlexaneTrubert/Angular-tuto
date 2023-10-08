import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "newsletter",
  templateUrl: "./newsletter.component.html",
})
export class NewsletterComponent {
  @Input()
  title = "Inscription newsletter";
  @Input('button-text')
  buttonTxt = "Je m'inscris";
  @Input()
  placeholder = "Adresse email";

  @Output('confirm')
  onConfirmEvent = new EventEmitter<string>();

  onConfirmNewsletter(email: string) {
    console.log("Depuis l'intérieur du composant : click sur le bouton");
    this.onConfirmEvent.emit(email);
  }
}
