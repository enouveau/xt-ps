import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PsTerminalComponent } from './ps-terminal/ps-terminal.component';

@NgModule({
  declarations: [
    AppComponent,
    PsTerminalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
