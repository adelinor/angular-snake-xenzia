import { Component, ViewChild, ElementRef } from '@angular/core';
import { HostListener, NgZone } from '@angular/core';

import { Grid }  from './grid/grid';
import { Point } from './grid/point';
import { Direction, DirectionUtil } from './grid/direction';
import { Snake } from './snake/snake';

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
  // 2 every second cycle, etc
  private frequency: number = 6;

  private increment: number;
  private running: boolean;
  private requestDirection: Direction;
  private grid: Grid;
  private snake: Snake;

  constructor(private ngZone: NgZone) {
    this.increment = 0;
    this.requestDirection = Direction.Right;
    this.grid = new Grid(200,200,10);
    this.snake = new Snake(3);
  }

  private setDirection(d: Direction) {
    if (d && ! DirectionUtil.opposites(d, this.snake.direction)) {
      this.requestDirection = d;
    }
  }

  private togglePause() {
    this.running = ! this.running;

    if (this.running) {
      requestAnimationFrame(() => this.paintLoop());
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
      ctx.fillRect(0,0,200,200);

      // Draw the grid
      ctx.beginPath();

      ctx.fillStyle = '#cfcfcf';

      for(let i = this.grid.cellWidth; i < this.grid.width; i += this.grid.cellWidth) {
        ctx.fillRect(i,0,1,this.grid.width);
      }
      ctx.stroke();

      for(let i = this.grid.cellWidth; i < this.grid.height; i += this.grid.cellWidth) {
        ctx.fillRect(0,i,this.grid.height,1);
      }

      // Increment position
      this.increment++;

      // Assign direction
      if (this.increment % this.grid.cellWidth === 0) {
        this.snake.direction = this.requestDirection;
        this.increment = 0;

        this.snake.move(this.grid);
      }

      // Paint current frame

      // Paint increment first
      ctx.fillStyle = 'rgb(0,0,0)';
      let h = this.snake.cellAt(0);

      let hx, hy, width, height;
      switch (this.snake.direction) {
        case Direction.Right:
          hx = (h.x + 1) * this.grid.cellWidth;
          hy = h.y * this.grid.cellWidth;
          width = this.increment;
          height = this.grid.cellWidth;
          break;

        case Direction.Left:
          hx = h.x * this.grid.cellWidth - this.increment;
          hy = h.y * this.grid.cellWidth;
          width = this.increment;
          height = this.grid.cellWidth;
          break;
      }
      ctx.fillRect(hx, hy, width, height);

      // Paint snake
      ctx.fillStyle = 'rgb(0,0,0)';
      for (let i = 0; i < this.snake.length - 1; i++) {
        let c = this.snake.cellAt(i);
        ctx.fillRect(
            c.x * this.grid.cellWidth,
            c.y * this.grid.cellWidth,
            this.grid.cellWidth, this.grid.cellWidth);
      }

      // Paint snake's tails
      ctx.fillStyle = 'rgb(0,0,0)';
      let t = this.snake.cellAt(this.snake.length - 1);

      switch (t.direction) {
        case Direction.Right:
          hx = t.x * this.grid.cellWidth + this.increment
          hy = h.y * this.grid.cellWidth;
          width = this.grid.cellWidth - this.increment;
          height = this.grid.cellWidth;
          break;

        case Direction.Left:
          hx = t.x * this.grid.cellWidth;
          hy = t.y * this.grid.cellWidth;
          width = this.grid.cellWidth - this.increment;
          height = this.grid.cellWidth;
          break;
      }
      ctx.fillRect(hx, hy, width, height);
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

    // P key
    if (event.keyCode === 80) {
      this.togglePause();
    }
  }
}
