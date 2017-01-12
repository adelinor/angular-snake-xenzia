import { Component, ViewChild, ElementRef } from '@angular/core';
import { HostListener, NgZone } from '@angular/core';

import { Grid }  from './grid/grid';
import { Point } from './grid/point';
import { Direction, DirectionUtil } from './grid/direction';

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
  private frameNumber: number = 0;
  // Draw at every {frequency} refresh cycle
  // 1 will draw at every refresh cycle
  // 2 every second, etc
  private frequency: number = 3;

  private p: Point;
  private running: boolean;
  private direction: Direction;
  private grid: Grid;

  constructor(private ngZone: NgZone) {
    this.p = new Point(0, 0);
    this.direction = Direction.Right;
    this.grid = new Grid(200,200,10);
  }

  private setDirection(d: Direction) {
    if (d && ! DirectionUtil.opposites(d, this.direction)) {
      this.direction = d;
    }
  }

  private togglePause(keyCode: number) {
    if (keyCode === 80) {
      this.running = ! this.running;
    }
  }

  ngAfterViewInit() {
    console.log('Initialize grid');
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = this.grid.width;
    this.canvas.height = this.grid.height;
    this.running = true;
    this.ngZone.runOutsideAngular(() => this.paintLoop());
  }

  ngOnDestroy() {
    this.running = false;
  }

  paintLoop() {
    if (! this.running) {
      return;
    }

    // Speed control
    let n = this.frameNumber % this.frequency;

    if (this.canvas.getContext && n === 0) {
      let ctx = this.canvas.getContext('2d');

      // Delete any previous drawing
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(this.p.x, this.p.y, this.grid.cellWidth, this.grid.cellWidth);

      // Paint current frame
      ctx.fillStyle = 'rgb(0,0,0)';
      this.p = this.grid.getNext(this.p, this.direction);
      ctx.fillRect(this.p.x, this.p.y, this.grid.cellWidth, this.grid.cellWidth);
    }

    // Schedule next frame
    this.frameNumber++;
    requestAnimationFrame(() => this.paintLoop());
  }

  drawSmiley() {
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(`Key pressed on ${event.keyCode}`);
    this.setDirection(DirectionUtil.fromKey(event.keyCode));
    this.togglePause(event.keyCode);
  }

}
