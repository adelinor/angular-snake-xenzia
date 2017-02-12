import { Point, MovingPoint }  from '../grid/point';
import { Direction }           from '../grid/direction';
import { MoveByOneStep }       from '../grid/grid';

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
      this.cells.push({x: i, y: 0, direction: this.direction});
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

  move(mover: MoveByOneStep) {
    this.moveTo(mover.getNext(this.cells[0], this.direction));
  }

  moveTo(newHeadPosition: Point) {
    for (let i = this.cells.length - 1; i > 0; i--) {
      this.cells[i] = this.cells[i - 1];
    }
    this.cells[0] = new MovingPoint(newHeadPosition, this.direction);
  }

  head(): MovingPoint {
    return this.cells[0];
  }

  tail(): MovingPoint {
    return this.cells[this.cells.length - 1];
  }

}
