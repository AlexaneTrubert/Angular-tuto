import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HighlightDirective} from "./directives-attributs/highlight.directive";
import {NoOpenDirective} from "./directives-attributs/no-open.directive";
import {ConfirmDirective} from "./directives-attributs/confirm.directive";
import {UserProfileComponent} from "./components/user-profile.component";
import {CounterComponent} from "./components/counter.component";

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    NoOpenDirective,
    ConfirmDirective,
    UserProfileComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
