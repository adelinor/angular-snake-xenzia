import { Component, ViewChild, ElementRef } from '@angular/core';
import { HostListener, NgZone } from '@angular/core';

import { Grid } from './grid/grid';

class Direction {
  static UP    = 'UP';
  static RIGHT = 'RIGHT';
  static DOWN  = 'DOWN';
  static LEFT  = 'LEFT';

  static fromKey(keyCode: number): string {
    if (keyCode === 37) {
      return Direction.LEFT;
    } else if (keyCode === 38) {
      return Direction.UP;
    } else if (keyCode === 39) {
      return Direction.RIGHT;
    } else if (keyCode === 40) {
      return Direction.DOWN;
    } else {
      return null;
    }
  }

  static opposites(d1: string, d2: string): boolean {
    return (d1 === Direction.LEFT && d2 === Direction.RIGHT) ||
      (d1 === Direction.RIGHT && d2 === Direction.LEFT) ||
      (d1 === Direction.UP && d2 === Direction.DOWN) ||
      (d1 === Direction.DOWN && d2 === Direction.UP);
  }
}

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

  private x: number;
  private y: number;
  private running: boolean;
  private direction: string;

  constructor(private ngZone: NgZone) {
    this.x = 0;
    this.y = 0;
    this.direction = Direction.RIGHT;
  }

  private getNextX(): number {
    if (this.direction === Direction.LEFT) {
      this.x--;
      if (this.x < 0) {
        this.x = 200;
      }
    } else if (this.direction === Direction.RIGHT) {
      this.x++;
      if (this.x > 200) {
        this.x = 0;
      }
    }
    return this.x;
  }

  private getNextY(): number {
    if (this.direction === Direction.UP) {
      this.y--;
      if (this.y < 0) {
        this.y = 200;
      }
    } else if (this.direction === Direction.DOWN) {
      this.y++;
      if (this.y > 200) {
        this.y = 0;
      }
    }
    return this.y;
  }

  private setDirection(d: string) {
    if (d && ! Direction.opposites(d, this.direction)) {
      this.direction = d;
    }
  }

  ngAfterViewInit() {
    console.log('Initialize grid');
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 200;
    this.canvas.height = 200;
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

      // Paint current frame
      ctx.fillRect(this.getNextX(), this.getNextY(), 10, 10);
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
    this.setDirection(Direction.fromKey(event.keyCode));
  }

}
