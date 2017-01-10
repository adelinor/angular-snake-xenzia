import { Snake } from './snake';

describe('Snake', function () {
  let snake: Snake;

  beforeEach(() => {
    snake = new Snake(3);
  });

  it('should create horizontal snake', () => {
    expect(snake).toBeDefined();
    expect(snake.length()).toEqual(3);
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

});
