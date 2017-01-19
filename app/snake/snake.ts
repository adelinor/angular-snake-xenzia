import { Point }         from '../grid/point';
import { Direction }     from '../grid/direction';
import { MoveByOneStep } from '../grid/grid';

export class Snake {

  // First cell is the head
  private cells: Point[];

  // Travelling direction of the snake
  private direction: Direction;

  constructor(private initialLength: number) {
    // Move this to initialize method to be invoked by the grid
    this.cells = [];
    for (let i = initialLength - 1; i >= 0; i--) {
      this.cells.push({x: i, y: 0});
    }
    this.direction = Direction.Right;
  }

  length(): number {
    return this.cells.length;
  }

  cellAt(position: number): Point {
    return this.cells[position];
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  move(mover: MoveByOneStep) {
    this.moveTo(mover.getNext(this.cells[0], this.direction));
  }

  moveTo(newHeadPosition: Point) {
    for (let i = this.cells.length - 1; i > 0; i--) {
      this.cells[i] = this.cells[i - 1];
    }
    this.cells[0] = newHeadPosition;
  }

}
