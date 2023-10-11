import {ComponentFixture, TestBed} from "@angular/core/testing";
import {PasswordControlsComponent} from "./password-controls.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {Component} from "@angular/core";

@Component({
  selector: 'test',
  template: `<password-controls (generate)="onGenerate()"></password-controls>`
})
class TestComponent{
  onGenerate() {}
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
});
