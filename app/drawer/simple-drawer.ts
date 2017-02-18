import { MovingPoint } from '../grid/point';
import { Direction }   from '../grid/direction';
import { Grid }   from '../grid/grid';
import { Snake }       from '../snake/snake';

export class SimpleDrawer {

  private ctx: any;

  constructor(private canvas: any, private grid: Grid) {
      this.canvas.width = this.grid.width + 2;
      this.canvas.height = this.grid.height + 2;
      this.ctx = this.canvas.getContext('2d');
  }

  deletePrevious(): void {
    this.ctx.fillStyle = 'rgb(255,255,255)';
    this.ctx.fillRect(1, 1, this.grid.width, this.grid.height);

    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.grid.width + 2, this.grid.height + 2);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

  }

  drawGrid(): void {
    this.ctx.fillStyle = '#cfcfcf';

    for (let i = this.grid.cellWidth; i < this.grid.width; i += this.grid.cellWidth) {
      this.ctx.fillRect(i + 1, 1, 1, this.grid.width);
    }

    for (let i = this.grid.cellWidth; i < this.grid.height; i += this.grid.cellWidth) {
      this.ctx.fillRect(1, i + 1, this.grid.height, 1);
    }
  }

  drawSnake(snake: Snake, increment: number) {
    // Paint head
    this.ctx.fillStyle = 'rgb(0,0,0)';
    let h = snake.head();

    let x: number, y: number, width: number, height: number;
    let offsetX: number, offsetY: number;
    switch (snake.direction) {
      case Direction.Right:
        x = h.x;
        y = h.y;
        offsetX = 0;
        offsetY = 0;
        width = increment;
        height = this.grid.cellWidth;
        break;

      case Direction.Down:
        x = h.x;
        y = h.y;
        offsetX = 0;
        offsetY = 0;
        width = this.grid.cellWidth;
        height = increment;
        break;

      case Direction.Left:
        x = h.x + 1;
        y = h.y;
        offsetX = - increment;
        offsetY = 0;
        width = increment;
        height = this.grid.cellWidth;
        break;

      case Direction.Up:
        x = h.x;
        y = h.y + 1;
        offsetX = 0;
        offsetY = - increment;
        width = this.grid.cellWidth;
        height = increment;
        break;
    }
    let p = this.grid.coordinates(x, y, offsetX, offsetY);
    this.ctx.fillRect(p.x + 1, p.y + 1, width, height);

    // Paint snake
    this.ctx.fillStyle = 'rgb(0,0,0)';
    for (let i = 1; i < snake.length; i++) {
      let c = snake.cellAt(i);
      p = this.grid.coordinates(c.x, c.y, 0, 0);
      this.ctx.fillRect(p.x + 1, p.y + 1,
          this.grid.cellWidth, this.grid.cellWidth);
    }

    // Paint snake's tails
    this.ctx.fillStyle = 'rgb(0,0,0)';
    let t = snake.cellAt(snake.length - 1);

    switch (t.direction) {
      case Direction.Right:
        x = t.x - 1;
        y = t.y;
        offsetX = increment;
        offsetY = 0;
        width = this.grid.cellWidth - increment;
        height = this.grid.cellWidth;
        break;

      case Direction.Down:
        x = t.x;
        y = t.y - 1;
        offsetX = 0;
        offsetY = increment;
        width = this.grid.cellWidth;
        height = this.grid.cellWidth - increment;
        break;

      case Direction.Left:
        x = t.x + 1;
        y = t.y;
        offsetX = 0;
        offsetY = 0;
        width = this.grid.cellWidth - increment;
        height = this.grid.cellWidth;
        break;

      case Direction.Up:
        x = t.x;
        y = t.y + 1;
        offsetX = 0;
        offsetY = 0;
        width = this.grid.cellWidth;
        height = this.grid.cellWidth - increment;
        break;
    }
    p = this.grid.coordinates(x, y, offsetX, offsetY);
    this.ctx.fillRect(p.x + 1, p.y + 1, width, height);
  }

  highlight(point: MovingPoint, increment: number) {
    this.ctx.beginPath();
    let p = this.grid.coordinates(point.x, point.y, 0, 0);
    this.ctx.rect(p.x + 1, p.y + 1,
       this.grid.cellWidth, this.grid.cellWidth);

    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
  }
}
