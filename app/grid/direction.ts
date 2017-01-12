export enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

export class DirectionUtil {

  static fromKey(keyCode: number): Direction {
    if (keyCode === 37) {
      return Direction.Left;

    } else if (keyCode === 38) {
      return Direction.Up;

    } else if (keyCode === 39) {
      return Direction.Right;

    } else if (keyCode === 40) {
      return Direction.Down;

    } else {
      return null;

    }
  }

  static opposites(d1: Direction, d2: Direction): boolean {
    return (d1 === Direction.Left && d2 === Direction.Right) ||
      (d1 === Direction.Right && d2 === Direction.Left) ||
      (d1 === Direction.Up && d2 === Direction.Down) ||
      (d1 === Direction.Down && d2 === Direction.Up);
  }

}
