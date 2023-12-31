import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {Spectator, createComponentFactory} from "@ngneat/spectator";
import {FormsModule} from "@angular/forms";
import {PasswordDisplayComponent} from "./password-generator/password-display.component";
import {PasswordControlsComponent} from "./password-generator/password-controls.component";
import {PasswordSettingsComponent} from "./password-generator/password-settings.component";
import {PasswordGeneratorService} from "./password-generator/password-generator.service";
import {PasswordGeneratorModule} from "./password-generator/password-generator.module";

describe('AppComponent (avec Spectator)', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppComponent,
    ],
    imports: [PasswordGeneratorModule],
    mocks: [PasswordGeneratorService],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should work', () => {
    expect(spectator.query('article')?.textContent).toBe('Cliquez sur le bouton "Générer"');
  });

  it("should change message when user clicks generate button", () => {
    const service = spectator.inject(PasswordGeneratorService);
    service.generate.and.returnValue('MOCK_PASSWORD');

    spectator.click('button');

    expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
  });

  it("should update settings when user clicks on checkboxes", () => {
    spectator.click('#uppercase');
    expect(component.settings.uppercase).toBeTrue();

    spectator.click('#numbers');
    expect(component.settings.uppercase).toBeTrue();

    spectator.click('#symbols');
    expect(component.settings.uppercase).toBeTrue();
  });

  it("should update length when user changes length input", () => {
    spectator.typeInElement('33', '#length');

    expect(component.settings.length).toBe(33);
  });

  it("Should show a copy button when password was generated", () => {
    const service = spectator.inject(PasswordGeneratorService);
    service.generate.and.returnValue('MOCK_PASSWORD');

    spectator.click('#generate');

    expect(spectator.query('#copy')).toBeTruthy();
  });
});

describe('AppComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent,
      ],
      imports: [PasswordGeneratorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  });

  it('should work', async () => {
    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('Cliquez sur le bouton "Générer"');
  });

  it("should change message when user clicks generate button", async () => {
    const service = TestBed.inject(PasswordGeneratorService);
    const spy = spyOn(service, 'generate').and.returnValue('MOCK_PASSWORD');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('MOCK_PASSWORD');
  });

  it("should update settings when user clicks on checkboxes", async () => {
    fixture.nativeElement.querySelector('#uppercase').click();
    expect(component.settings.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.settings.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.settings.uppercase).toBeTrue();
  });

  it("should update length when user changes length input", async () => {
    const length = fixture.nativeElement.querySelector('#length');
    length.value = 33;
    length.dispatchEvent(new Event('input'));

    expect(component.settings.length).toBe(33);
  });

  it("Should show a copy button when password was generated", () => {
    const service = TestBed.inject(PasswordGeneratorService);
    const spy = spyOn(service, 'generate').and.returnValue('MOCK_PASSWORD');

    fixture.nativeElement.querySelector('#generate').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#copy')).toBeTruthy();
  });
});
