import { Grid }  from '../grid/grid';
import { Point, MovingPoint } from '../grid/point';
import { Direction, DirectionUtil } from '../grid/direction';
import { Snake } from '../snake/snake';

export class SimpleDrawer {

  private ctx: any;

  constructor(private canvas: any,
    private gridWidth: number,
    private gridHeight: number,
    private cellWidth: number) {
      this.canvas.width = gridWidth + 2;
      this.canvas.height = gridHeight + 2;
      this.ctx = this.canvas.getContext('2d');
  }

  deletePrevious(): void {
    this.ctx.fillStyle = 'rgb(255,255,255)';
    this.ctx.fillRect(1, 1, this.gridWidth, this.gridHeight);

    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.gridWidth + 2, this.gridHeight + 2);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

  }

  drawGrid(): void {
    this.ctx.fillStyle = '#cfcfcf';

    for(let i = this.cellWidth; i < this.gridWidth; i += this.cellWidth) {
      this.ctx.fillRect(i + 1, 1, 1, this.gridWidth);
    }

    for(let i = this.cellWidth; i < this.gridHeight; i += this.cellWidth) {
      this.ctx.fillRect(1, i + 1, this.gridHeight, 1);
    }
  }

  drawSnake(snake: Snake, increment: number) {
    // Paint head
    this.ctx.fillStyle = 'rgb(0,0,0)';
    let h = snake.cellAt(0);

    let hx: number, hy: number, width: number, height: number;
    switch (snake.direction) {
      case Direction.Right:
        hx = h.x * this.cellWidth;
        hy = h.y * this.cellWidth;
        width = increment;
        height = this.cellWidth;
        break;

      case Direction.Down:
        hx = h.x * this.cellWidth;
        hy = h.y * this.cellWidth;
        width = this.cellWidth;
        height = increment;
        break;

      case Direction.Left:
        hx = (h.x + 1) * this.cellWidth - increment;
        hy = h.y * this.cellWidth;
        width = increment;
        height = this.cellWidth;
        break;

      case Direction.Up:
        hx = h.x * this.cellWidth;
        hy = (h.y + 1) * this.cellWidth - increment;
        width = this.cellWidth;
        height = increment;
        break;

    }
    this.ctx.fillRect(hx + 1, hy + 1, width, height);

    // Paint snake
    this.ctx.fillStyle = 'rgb(0,0,0)';
    for (let i = 1; i < snake.length; i++) {
      let c = snake.cellAt(i);
      this.ctx.fillRect(
          c.x * this.cellWidth + 1,
          c.y * this.cellWidth + 1,
          this.cellWidth, this.cellWidth);
    }

    // Paint snake's tails
    this.ctx.fillStyle = 'rgb(0,0,0)';
    let t = snake.cellAt(snake.length - 1);

    switch (t.direction) {
      case Direction.Right:
        hx = (t.x - 1) * this.cellWidth + increment
        hy = t.y * this.cellWidth;
        width = this.cellWidth - increment;
        height = this.cellWidth;
        break;

      case Direction.Down:
        hx = t.x * this.cellWidth;
        hy = (t.y - 1) * this.cellWidth + increment
        width = this.cellWidth;
        height = this.cellWidth - increment;
        break;

      case Direction.Left:
        hx = (t.x + 1) * this.cellWidth;
        hy = t.y * this.cellWidth;
        width = this.cellWidth - increment;
        height = this.cellWidth;
        break;

      case Direction.Up:
        hx = t.x * this.cellWidth;
        hy = (t.y + 1) * this.cellWidth;
        width = this.cellWidth;
        height = this.cellWidth - increment;
        break;

    }
    this.ctx.fillRect(hx + 1, hy + 1, width, height);
  }

  highlight(p: MovingPoint, increment: number) {
    this.ctx.beginPath();
    this.ctx.rect(p.x*this.cellWidth + 1, p.y*this.cellWidth + 1,
       this.cellWidth, this.cellWidth);

    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
  }
}
