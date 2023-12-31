import {Component} from "@angular/core";
import {Settings} from "../types";
import {TestBed} from "@angular/core/testing";
import {PasswordSettingsComponent} from "./password-settings.component";
import {FormsModule} from "@angular/forms";
import {createComponentFactory, Spectator} from "@ngneat/spectator";

@Component({
  selector: 'test',
  template: `
    <password-settings (settings-change)="onChange($event)"></password-settings>`
})
class TestDefaultComponent {
  onChange(settings: Settings) {
  }
}

@Component({
  selector: 'test',
  template: `
    <password-settings [default-settings]="{
    length: 35,
    uppercase: true,
    symbols: true,
    numbers: true
    }"></password-settings>`
})
class TestInputComponent {
}

describe('PasswordSettingsComponent (avec testBed)', () => {
  it("should represents settings in the HTML tags", async () => {
    TestBed.configureTestingModule({
      declarations: [TestDefaultComponent, PasswordSettingsComponent],
      imports: [FormsModule]
    });

    const fixture = TestBed.createComponent(TestDefaultComponent);
    fixture.detectChanges();

    await fixture.whenStable();
    const lengthInput = fixture.nativeElement.querySelector('#length');
    const symbolsInput = fixture.nativeElement.querySelector('#symbols');
    const numbersInput = fixture.nativeElement.querySelector('#numbers');
    const uppercaseInput = fixture.nativeElement.querySelector('#uppercase');

    expect(lengthInput.value).toBe('20');
    expect(symbolsInput.checked).toBeFalse();
    expect(numbersInput.checked).toBeFalse();
    expect(uppercaseInput.checked).toBeFalse();

  });

  it("should accept initial settings from the outside", async () => {
    TestBed.configureTestingModule({
      declarations: [TestInputComponent, PasswordSettingsComponent],
      imports: [FormsModule]
    });

    const fixture = TestBed.createComponent(TestInputComponent);
    fixture.detectChanges();

    await fixture.whenStable();
    const lengthInput = fixture.nativeElement.querySelector('#length');
    const symbolsInput = fixture.nativeElement.querySelector('#symbols');
    const numbersInput = fixture.nativeElement.querySelector('#numbers');
    const uppercaseInput = fixture.nativeElement.querySelector('#uppercase');

    expect(lengthInput.value).toBe('35');
    expect(symbolsInput.checked).toBeTrue();
    expect(numbersInput.checked).toBeTrue();
    expect(uppercaseInput.checked).toBeTrue();
  });

  it("should emit an event with settings each time user changes HTML inputs", () => {
    TestBed.configureTestingModule({
      declarations: [TestDefaultComponent, PasswordSettingsComponent],
      imports: [FormsModule]
    });

    const fixture = TestBed.createComponent(TestDefaultComponent);
    fixture.autoDetectChanges(true);
    const component = fixture.componentInstance;

    const spy = spyOn(component, 'onChange');

    const verifyCheckbox = (id: 'symbols' | 'numbers' | 'uppercase', expectedValue: Settings) => {
      fixture.nativeElement.querySelector('#' + id).click();

      expect(spy).toHaveBeenCalledWith(expectedValue);
    }
    verifyCheckbox('numbers', {
      length: 20,
      uppercase: false,
      numbers: true,
      symbols: false
    });

    verifyCheckbox('uppercase', {
      length: 20,
      uppercase: true,
      numbers: true,
      symbols: false
    });

    verifyCheckbox('symbols', {
      length: 20,
      uppercase: true,
      numbers: true,
      symbols: true
    });

    const lengthInput = fixture.nativeElement.querySelector('#length');
    lengthInput.value = '33';
    lengthInput.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: true,
      numbers: true,
      symbols: true
    });
  });
});

describe('PasswordSettingsComponent (avec spectator)', () => {
  let defaultSpectator: Spectator<TestDefaultComponent>;
  let inputSpectator: Spectator<TestInputComponent>;

  const createDefaultSpectator = createComponentFactory({
    imports: [FormsModule],
    declarations: [PasswordSettingsComponent],
    component: TestDefaultComponent
  });

  const createInputSpectator = createComponentFactory({
    imports: [FormsModule],
    declarations: [PasswordSettingsComponent],
    component: TestInputComponent
  });

  it("should represents settings in the HTML tags", async () => {
    defaultSpectator = createDefaultSpectator();

    await defaultSpectator.fixture.whenStable();

    expect(defaultSpectator.query('#length')).toHaveValue('20');
    expect(defaultSpectator.query('#symbols')).not.toBeChecked();
    expect(defaultSpectator.query('#numbers')).not.toBeChecked();
    expect(defaultSpectator.query('#uppercase')).not.toBeChecked();
  });

  it("should accept initial settings from the outside", async () => {
    inputSpectator = createInputSpectator();

    await inputSpectator.fixture.whenStable();

    expect(inputSpectator.query('#length')).toHaveValue('35');
    expect(inputSpectator.query('#symbols')).toBeChecked();
    expect(inputSpectator.query('#numbers')).toBeChecked();
    expect(inputSpectator.query('#uppercase')).toBeChecked();
  });

  it("should emit an event with settings each time user changes HTML inputs", () => {
    defaultSpectator = createDefaultSpectator();

    const spy = spyOn(defaultSpectator.component, 'onChange');
    defaultSpectator.typeInElement('33', '#length');

    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: false,
      numbers: false,
      symbols: false
    });

    defaultSpectator.click('#symbols');
    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: false,
      numbers: false,
      symbols: true
    });

    defaultSpectator.click('#numbers');
    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: false,
      numbers: true,
      symbols: true
    });

    defaultSpectator.click('#uppercase');
    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: true,
      numbers: true,
      symbols: true
    });
  });
});
