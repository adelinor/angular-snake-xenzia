import { Component, ViewChild, ElementRef, Renderer  } from '@angular/core';
import { HostListener } from '@angular/core';

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

  private x: number;
  private y: number;
  private running: boolean;

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.x = 0;
    this.y = 0;
  }

  private getNextX(): number {
    this.x++;
    return this.x;
  }

  private getNextY(): number {
    return this.y;
  }

  ngAfterViewInit() {
    console.log('Initialize grid');
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 200;
    this.canvas.height = 200;
    //this.draw();
    this.running = true;
    this.paintLoop();
  }

  ngOnDestroy() {
    this.running = false;
  }

  paintLoop() {
    if (! this.running) {
      return;
    }

    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');

      // Paint current frame
      ctx.fillRect(this.getNextX(), this.getNextY(), 10, 10);
    }

    // Schedule next frame
   requestAnimationFrame(() => this.paintLoop());
  }

  draw() {
    console.log('Draw grid');
    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      let w = this.canvas.width;
      let h = this.canvas.height;

      ctx.beginPath();
      // Outer circle
      ctx.arc(w * .5, h * .5, w * .4, 0, Math.PI * 2, true);
      ctx.moveTo(w * 0.80, h * .45);
      // Mouth (clockwise)
      ctx.arc(w * .5, h * .45, w * .30, 0, Math.PI, false);
      ctx.moveTo(w * .35 + w * 0.05, h * .40);
      // Left eye
      ctx.arc(w * .35, h * .40, w * 0.05, 0, Math.PI * 2, true);
      ctx.moveTo(w * .65 + w * 0.05, h * .40);
      // Right eye
      ctx.arc(w * .65, h * .40, w * 0.05, 0, Math.PI * 2, true);
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  }

  @HostListener('click', ['$event.target'])
  clicked(target: any) {
    console.log(`Click on ${target}`);
  }

  @HostListener('keydown', ['$event'])
  keypressed(event: any) {
    console.log(`Key pressed on ${event}`);
  }

}
