import {NgModule} from "@angular/core";
import {PasswordSettingsComponent} from "./password-settings.component";
import {PasswordControlsComponent} from "./password-controls.component";
import {PasswordDisplayComponent} from "./password-display.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PasswordGeneratorService} from "./password-generator.service";

@NgModule({
  declarations: [
    PasswordSettingsComponent,
    PasswordControlsComponent,
    PasswordDisplayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    PasswordSettingsComponent,
    PasswordControlsComponent,
    PasswordDisplayComponent,
    ],
  providers: [
    PasswordGeneratorService,
  ],
})
export class PasswordGeneratorModule {}
