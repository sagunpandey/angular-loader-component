import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AppSpinnerDirective} from './directives/app-spinner.directive';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    AppSpinnerDirective
  ],
  imports: [
    OverlayModule,
    BrowserModule
  ],
  providers: [],
  entryComponents: [
    SpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
