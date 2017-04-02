import { Direction } from './direction';

export class Point {
    readonly x: number;
    readonly y: number;

    constructor(xPosition: number, yPosition: number) {
      this.x = xPosition;
      this.y = yPosition;
    }

    public samePosition(other: Point): boolean {
      let result = false;
      if (other) {
        result = this.x === other.x && this.y === other.y;
      }
      return result;
    }
}

export class MovingPoint extends Point {
  direction: Direction;

  constructor(position: Point, direction: Direction) {
    super(position.x, position.y);
    this.direction = direction;
  }

  move(): MovingPoint {
    return this.moveTowards(this.direction);
  }

  /**
   * Move towards provided direction and ignore
   * direction of the moving point
   */
  moveTowards(direction: Direction): MovingPoint {
    let moveX = 0;
    let moveY = 0;

    switch (direction) {
      case Direction.Right:
        moveX = 1;
        break;
      case Direction.Left:
        moveX = -1;
        break;
      case Direction.Down:
        moveY = 1;
        break;
      case Direction.Up:
        moveY = -1;
        break;
    }

    return new MovingPoint(
      new Point(this.x + moveX, this.y + moveY), direction);
  }

}
