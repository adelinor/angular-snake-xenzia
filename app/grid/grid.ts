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

  toFactor(direction: Direction): Point {
    let x = 0;
    let y = 0;

    if (direction === Direction.Right) {
      x = 1;
    } else if (direction === Direction.Left) {
      x = -1;
    } else if (direction === Direction.Down) {
      y = 1;
    } else if (direction === Direction.Up) {
      y = -1;
    }

    return new Point(x, y);
  }

  // TODO remove?
  increment(point: Point, direction: Direction): Point {
    let f = this.toFactor(direction);
    return new Point(point.x + f.x, point.y + f.y);
  }

  getNext(point: Point, direction: Direction): Point {
    point = this.increment(point, direction);
    let x = point.x;
    let y = point.y;

    if (x >= this._columns) {
      x = 0;
    }
    if (x < 0) {
      x = this._columns - 1;
    }
    if (y >= this._rows) {
      y = 0;
    }
    if (y < 0) {
      y = this._rows - 1;
    }

    return new Point(x, y);
  }
}
