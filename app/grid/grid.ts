export class Grid {
  constructor(private _width: number, private _height: number, private _cellWidth: number) {
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

}
