import {TestBed} from "@angular/core/testing";
import {DeclarationComponent} from "./declaration.component";
import {TAUX_TVA, TaxesService} from "../services/taxes.service";
import {createComponentFactory, Spectator} from "@ngneat/spectator";

describe("Declaration Component (avec TestBed)", () => {
  it("Should show taxes result", () => {
    TestBed.configureTestingModule({
      declarations: [DeclarationComponent],
      providers: [TaxesService, {
        provide: TAUX_TVA,
        useValue: 0.2
      }]
    });

    const fixture = TestBed.createComponent(DeclarationComponent);
    fixture.autoDetectChanges();

    const service = TestBed.inject(TaxesService);
    const spy = spyOn(service, "calculate");
    spy.and.callFake((revenu: number) => revenu + 1000);

    const revenuInput = fixture.nativeElement.querySelector("input");
    revenuInput.value = "1000";
    fixture.nativeElement.querySelector("button").click();
    expect(fixture.nativeElement.querySelector("article").textContent).toContain("2000");
  });
});

describe("Declaration Component (avec Spectator)", () => {
  let spectator: Spectator<DeclarationComponent>;

  const createSpectator = createComponentFactory({
    component: DeclarationComponent,
    providers: [TaxesService, {
      provide: TAUX_TVA,
      useValue: 0.2
    }],
    mocks: [TaxesService]
  })

  it("Should show taxes result", () => {
    spectator = createSpectator();

    const service = spectator.inject(TaxesService);
    service.calculate.and.returnValue(2000);

    spectator.typeInElement("1000", "input");
    spectator.click("button");
    expect(spectator.query("article")).toHaveText("2000");
  });
});

