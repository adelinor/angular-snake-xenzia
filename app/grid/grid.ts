import { Point }     from './point';

export class Grid {
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

  coordinates(col: number, row: number, offsetX: number, offsetY: number): Point {
    this.checkOffset(offsetX, 'offsetX');
    this.checkOffset(offsetY, 'offsetY');

    row = row % this.rows;
    if (row < 0) {
      row += this.rows;
    }

    col = col % this.columns;
    if (col < 0) {
      col += this.columns;
    }

    if (row === 0 && offsetY < 0) {
      row = this.rows;
    }
    if (col === 0 && offsetX < 0) {
      col = this.columns;
    }

    return new Point(col * this.cellWidth + offsetX,
      row * this.cellWidth + offsetY);
  }

  private checkOffset(offset: number, paramName: string): void {
    let min = - this.cellWidth + 1;
    let max = this.cellWidth - 1;
    if (offset < min || offset > max) {
      throw new RangeError('Parameter ' + paramName + ' must be between '
        + min + ' and ' + max);
    }
  }
}
