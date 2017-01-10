import { Point }      from '../grid/point';
import { Direction }  from '../grid/direction';

export class Snake {

  // First cell is the head
  private cells: Point[];

  // Travelling direction of the snake
  private direction: Direction;

  constructor(private initialLength: number) {
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
}
