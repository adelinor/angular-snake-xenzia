import { Component, Directive, ViewChild, ElementRef, HostListener, Input, Renderer  } from '@angular/core';

@Component({
  selector: 'my-snake-grid',
  template: `
      <canvas #canvas></canvas>
  `
})
export class MySnakeGridComponent {
  @ViewChild('canvas')
  canvasRef: ElementRef;
  private canvas: any;

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngAfterViewInit() {
    console.log("Initialize grid");
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 200;
    this.canvas.height = 200;
    this.draw();

  }

  draw() {
    console.log("Draw grid");
    if (this.canvas.getContext) {
      var ctx = this.canvas.getContext('2d');
      //ctx.fillStyle = "#fefefe";
      //ctx.fillRect(0,0,200,200);
      ctx.beginPath();
      ctx.arc(this.canvas.width*.5,this.canvas.height*.5,this.canvas.width*.4,0,Math.PI*2,true); // Outer circle
      ctx.moveTo(this.canvas.width*0.80,this.canvas.height*.45);
      ctx.arc(this.canvas.width*.5, this.canvas.height*.45, this.canvas.width*.30, 0, Math.PI, false);  // Mouth (clockwise)
      ctx.moveTo(this.canvas.width*.35+this.canvas.width*0.05, this.canvas.height*.40);
      ctx.arc(this.canvas.width*.35,this.canvas.height*.40, this.canvas.width*0.05,0,Math.PI*2,true);  // Left eye
      ctx.moveTo(this.canvas.width*.65+this.canvas.width*0.05,this.canvas.height*.40);
      ctx.arc(this.canvas.width*.65,this.canvas.height*.40, this.canvas.width*0.05,0,Math.PI*2,true);  // Right eye
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }

  }
}
