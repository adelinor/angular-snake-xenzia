import { Snake }     from './snake';
import { Point }     from '../grid/point';
import { Direction } from '../grid/direction';

describe('Snake', function () {
  let snake: Snake;

  let expectSnakeCellAt = function(position: number, x: number, y: number,
    dir: Direction): void {

    expect(snake.cellAt(position)).toBeDefined();
    expect(snake.cellAt(position).x).toEqual(x);
    expect(snake.cellAt(position).y).toEqual(y);
    expect(snake.cellAt(position).direction).toEqual(dir);
  };

  beforeEach(() => {
    snake = new Snake(3);
  });

  it('should return head', () => {
    expect(snake.head()).toEqual(snake.cellAt(0));
  });

  it('should return tail', () => {
    expect(snake.tail()).toEqual(snake.cellAt(snake.length - 1));
  });

  it('should create horizontal snake', () => {
    expect(snake).toBeDefined();
    expect(snake.length).toEqual(3);
    expect(snake.cellAt(2)).toBeDefined();
    expect(snake.cellAt(2).x).toEqual(0);
    expect(snake.cellAt(2).y).toEqual(0);

    expect(snake.cellAt(1)).toBeDefined();
    expect(snake.cellAt(1).x).toEqual(1);
    expect(snake.cellAt(1).y).toEqual(0);

    expect(snake.cellAt(0)).toBeDefined();
    expect(snake.cellAt(0).x).toEqual(2);
    expect(snake.cellAt(0).y).toEqual(0);

  });

  it('should move by 1 to the right', () => {
    expect(snake).toBeDefined();
    snake.moveTo( new Point(3, 0) );
    expect(snake.length).toEqual(3);

    expect(snake.cellAt(2)).toBeDefined();
    expect(snake.cellAt(2).x).toEqual(1);
    expect(snake.cellAt(2).y).toEqual(0);

    expect(snake.cellAt(1)).toBeDefined();
    expect(snake.cellAt(1).x).toEqual(2);
    expect(snake.cellAt(1).y).toEqual(0);

    expect(snake.cellAt(0)).toBeDefined();
    expect(snake.cellAt(0).x).toEqual(3);
    expect(snake.cellAt(0).y).toEqual(0);

  });

  it('should assign direction correctly when moving', () => {
    snake.direction = Direction.Down;
    snake.moveTo( new Point(2, 1) );

    expectSnakeCellAt(0, 2, 1, Direction.Down);
    expectSnakeCellAt(1, 2, 0, Direction.Right);
    expectSnakeCellAt(2, 1, 0, Direction.Right);

    snake.direction = Direction.Left;
    snake.moveTo( new Point(1, 1) );
    expectSnakeCellAt(0, 1, 1, Direction.Left);
    expectSnakeCellAt(1, 2, 1, Direction.Down);
    expectSnakeCellAt(2, 2, 0, Direction.Right);

  });

  it('should assign direction correctly - 4 cells', () => {
    snake = new Snake(4);
    snake.direction = Direction.Down;
    snake.moveTo( new Point(3, 1) );

    expectSnakeCellAt(0, 3, 1, Direction.Down);
    expectSnakeCellAt(1, 3, 0, Direction.Right);
    expectSnakeCellAt(2, 2, 0, Direction.Right);
    expectSnakeCellAt(3, 1, 0, Direction.Right);

    snake.direction = Direction.Left;
    snake.moveTo( new Point(2, 1) );
    expectSnakeCellAt(0, 2, 1, Direction.Left);
    expectSnakeCellAt(1, 3, 1, Direction.Down);
    expectSnakeCellAt(2, 3, 0, Direction.Right);
    expectSnakeCellAt(3, 2, 0, Direction.Right);

    snake.direction = Direction.Up;
    snake.moveTo( new Point(2, 0) );
    expectSnakeCellAt(0, 2, 0, Direction.Up);
    expectSnakeCellAt(1, 2, 1, Direction.Left);
    expectSnakeCellAt(2, 3, 1, Direction.Down);
    expectSnakeCellAt(3, 3, 0, Direction.Right);

    snake.direction = Direction.Right;
    snake.moveTo( new Point(3, 0) );
    expectSnakeCellAt(0, 3, 0, Direction.Right);
    expectSnakeCellAt(1, 2, 0, Direction.Up);
    expectSnakeCellAt(2, 2, 1, Direction.Left);
    expectSnakeCellAt(3, 3, 1, Direction.Down);

    snake.moveTo( new Point(4, 0) );
    expectSnakeCellAt(0, 4, 0, Direction.Right);
    expectSnakeCellAt(1, 3, 0, Direction.Right);
    expectSnakeCellAt(2, 2, 0, Direction.Up);
    expectSnakeCellAt(3, 2, 1, Direction.Left);

    snake.moveTo( new Point(5, 0) );
    expectSnakeCellAt(0, 5, 0, Direction.Right);
    expectSnakeCellAt(1, 4, 0, Direction.Right);
    expectSnakeCellAt(2, 3, 0, Direction.Right);
    expectSnakeCellAt(3, 2, 0, Direction.Up);

  });

});
