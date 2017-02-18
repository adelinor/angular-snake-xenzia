import { Point, MovingPoint }  from '../grid/point';
import { Direction }           from '../grid/direction';

export class Snake {

  // First cell is the head
  private cells: MovingPoint[];

  // Snake traveling direction
  private _direction: Direction;

  constructor(private initialLength: number) {
    this.direction = Direction.Right;

    // Move this to initialize method to be invoked by the grid
    this.cells = [];
    for (let i = initialLength - 1; i >= 0; i--) {
      this.cells.push(new MovingPoint( new Point(i, 0), this.direction));
    }
  }

  get length(): number {
    return this.cells.length;
  }

  cellAt(position: number): MovingPoint {
    return this.cells[position];
  }

  set direction(direction: Direction) {
    this._direction = direction;
  }

  get direction(): Direction {
    return this._direction;
  }

  move() {
    let newHeadPosition = this.head().moveTowards(this.direction);

    for (let i = this.cells.length - 1; i > 0; i--) {
      this.cells[i] = this.cells[i - 1];
    }
    this.cells[0] = newHeadPosition;
  }

  head(): MovingPoint {
    return this.cells[0];
  }

  tail(): MovingPoint {
    return this.cells[this.cells.length - 1];
  }

}
