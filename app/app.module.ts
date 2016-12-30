import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MySnakeGridComponent } from './my-snake-grid.component';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
      AppComponent,
      MySnakeGridComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
