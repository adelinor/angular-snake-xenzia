import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  styles: [`
        my-snake-grid {
            display: block;
            clear: both;
            margin: 30px;
            border: solid 1px black;
        }
    `],
  template: `
    <h1>Hello {{name}}</h1>
    <my-snake-grid></my-snake-grid>
    `,
})
export class AppComponent  { name = 'Angular'; }
