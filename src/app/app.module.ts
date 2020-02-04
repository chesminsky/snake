import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { fieldReducer } from './store/field.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ field: fieldReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
