import { Direction } from './direction';

export class Point {
    readonly x: number;
    readonly y: number;

    constructor(xPosition: number, yPosition: number) {
      this.x = xPosition;
      this.y = yPosition;
    }
}

export class MovingPoint extends Point {
  direction: Direction;

  constructor(position: Point, direction: Direction) {
    super(position.x, position.y);
    this.direction = direction;
  }

}
