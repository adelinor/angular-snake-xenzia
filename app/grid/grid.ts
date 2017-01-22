import { Point }     from './point';
import { Direction } from './direction';

export interface MoveByOneStep {

  getNext(point: Point, direction: Direction): Point;

}

export class Grid implements MoveByOneStep {
  private _columns: number;
  private _rows: number;

  constructor(private _width: number, private _height: number, private _cellWidth: number) {
    this._columns = Math.floor(_width / _cellWidth);
    this._rows = Math.floor(_height / _cellWidth);
  }

  get columns(): number {
    return this._columns;
  }

  get rows(): number {
    return this._rows;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get cellWidth(): number {
    return this._cellWidth;
  }

  getNext(point: Point, direction: Direction): Point {
    let x = point.x;
    let y = point.y;

    if (direction === Direction.Right) {
      x++;
      if (x >= this.width) {
        x = 0;
      }
    } else if (direction === Direction.Left) {
      x--;
      if (x < 0) {
        x = this.width - 1;
      }
    } else if (direction === Direction.Down) {
      y++;
      if (y >= this.height) {
        y = 0;
      }
    } else if (direction === Direction.Up) {
      y--;
      if (y < 0) {
        y = this.height - 1;
      }
    }

    return new Point(x, y);
  }
}
