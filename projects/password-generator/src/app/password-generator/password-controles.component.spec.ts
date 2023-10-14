import {ComponentFixture, TestBed} from "@angular/core/testing";
import {PasswordControlsComponent} from "./password-controls.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {Component} from "@angular/core";

@Component({
  selector: 'test',
  template: `
    <password-controls [password]="password" (generate)="onGenerate()"></password-controls>`
})
class TestComponent {
  password?: string;

  onGenerate() {
  }
}

describe('PasswordControlsComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordControlsComponent, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should emmit an event when user clicks the button", () => {
    const spy = spyOn(component, 'onGenerate');
    fixture.nativeElement.querySelector('button').click();

    expect(spy).toHaveBeenCalled();
  });

  it("Should not show a copy button", () => {
    expect(fixture.nativeElement.querySelector('#copy')).toBeNull();
  });

  it("Should show a copy button if password has been generated", () => {
    fixture.componentInstance.password = "MOCK_PASSWORD";
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#copy')).toBeTruthy();
  });

  it("Should copy the password when user clicks the copy button", () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    // En imaginant que je vois le bouton copy (j'ai déjà généré un mot de passe)
    fixture.componentInstance.password = "MOCK_PASSWORD";
    fixture.detectChanges();

    // Quand je clique sur le bouton copy
    fixture.nativeElement.querySelector('#copy').click();

    // Alors le mot de passe est copié dans le presse papier
    expect(spy).toHaveBeenCalledWith("MOCK_PASSWORD");
    expect(fixture.nativeElement.querySelector('#copy-message').textContent).toContain("Mot de passe copié avec succès !");
  });

  it("Should make the message disappear if a new password is generated", () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    // En imaginant que je vois le texte "Mot de passe copié avec succès !"
    fixture.componentInstance.password = "MOCK_PASSWORD";
    fixture.detectChanges();
    fixture.nativeElement.querySelector('#copy').click();

    expect(fixture.nativeElement.querySelector('#copy-message')).toBeTruthy();

    // Quand je change la valeur de l'input Password
    fixture.componentInstance.password = "NEW_MOCK_PASSWORD";
    fixture.detectChanges();

    // Alors le texte "Mot de passe copié avec succès !" disparait
    expect(fixture.nativeElement.querySelector('#copy-message')).toBeNull();

    // Et si je copie à nouveau, alors le message réapparait
    fixture.nativeElement.querySelector('#copy').click();
    expect(fixture.nativeElement.querySelector('#copy-message')).toBeTruthy();
  });
});

describe('PasswordControlsComponent (avec Spectator)', () => {
  let spectator: Spectator<TestComponent>;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordControlsComponent]
  });

  beforeEach(() => spectator = createComponent());

  it("should emmit an event when user clicks the button", () => {
    const spy = spyOn(spectator.component, 'onGenerate');

    spectator.click('button');

    expect(spy).toHaveBeenCalled();
  });

  it("Should not show a copy button", () => {
    expect(spectator.query('#copy')).toBeNull();
  });

  it("Should show a copy button if password has been generated", () => {
    spectator.setInput('password', "MOCK_PASSWORD");

    expect(spectator.query('#copy')).toBeTruthy();
  });

  it("Should copy the password when user clicks the copy button", () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    // En imaginant que je vois le bouton copy (j'ai déjà généré un mot de passe)
    spectator.setInput('password', "MOCK_PASSWORD");

    // Quand je clique sur le bouton copy
    spectator.click('#copy');

    // Alors le mot de passe est copié dans le presse papier
    expect(spy).toHaveBeenCalledWith("MOCK_PASSWORD");

    // Et un texte apparait pour indiquer que le mot de passe a été copié
    expect(spectator.query('#copy-message')).toHaveText("Mot de passe copié avec succès !");
  });

  it("Should make the message disappear if a new password is generated", () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    // En imaginant que je vois le texte "Mot de passe copié avec succès !"
    spectator.setInput('password', "MOCK_PASSWORD");
    spectator.click('#copy');
    expect(spectator.query('#copy-message')).toExist();

    // Quand je change la valeur de l'input Password
    spectator.setInput('password', "NEW_MOCK_PASSWORD");

    // Alors le texte "Mot de passe copié avec succès !" disparait
    expect(spectator.query('#copy-message')).toBeNull();

    // Et si je copie à nouveau, alors le message réapparait
    spectator.click('#copy');
    expect(spectator.query('#copy-message')).toExist();
  });
});
