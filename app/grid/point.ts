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

  constructor(xPosition: number, yPosition: number,
    direction: Direction)
  {
    super(xPosition, yPosition);
    this.direction = direction;
  }

}
