import { Component, ViewChild, ElementRef } from '@angular/core';
import { HostListener, NgZone } from '@angular/core';

import { Grid }  from './grid/grid';
import { Point } from './grid/point';
import { Direction, DirectionUtil } from './grid/direction';
import { Snake } from './snake/snake';
import { SimpleDrawer } from './drawer/simple-drawer';

@Component({
  selector: 'my-snake-grid',
  template: `
      <canvas #canvas></canvas>
  `
})
export class MySnakeGridComponent {
  @ViewChild('canvas')
  canvasRef: ElementRef;

  private drawer: SimpleDrawer;

  private frameNumber: number = 0;
  // Draw at every {frequency} refresh cycle
  // 1 will draw at every refresh cycle
  // 2 every second cycle, etc
  private frequency: number = 10;

  private increment: number;
  private running: boolean;
  private grid: Grid;
  private snake: Snake;

  constructor(private ngZone: NgZone) {
    this.increment = 0;
    this.grid = new Grid(200,200,10);
    this.snake = new Snake(3);
  }

  private setDirection(d: Direction) {
    if (d && ! DirectionUtil.opposites(d, this.snake.direction)) {
      this.snake.direction = d;
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
    this.drawer = new SimpleDrawer(this.canvasRef.nativeElement, this.grid);

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

    if (n === 0) {
      this.drawer.deletePrevious();
      this.drawer.drawGrid();

      // Assign direction
      if (this.increment % this.grid.cellWidth === 0) {
        this.increment = 0;

        this.snake.move();

        if (this.snake.isColliding()) {
          this.togglePause();
          alert('Game over');
        }
      }

      this.drawer.drawSnake(this.snake, this.increment);

      // Highlight head and tail
      this.drawer.highlight(this.snake.head(), this.increment);
      this.drawer.highlight(this.snake.tail(), this.increment);

      // Increment position
      this.increment++;

    }

    // Schedule next frame
    this.frameNumber++;
    requestAnimationFrame(() => this.paintLoop());
  }

  drawSmiley() {
    console.log('Draw grid');
    let canvas = this.canvasRef.nativeElement;
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
      let w = canvas.width;
      let h = canvas.height;

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
