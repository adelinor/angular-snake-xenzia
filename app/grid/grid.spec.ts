import { Grid }      from './grid';
import { Direction } from './direction';

describe('Grid', function () {
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(200, 200, 10);
  });

  it('should be able to compute getNext', () => {
    let next = grid.getNext({x: 0, y: 0}, Direction.Right);

    expect(next).toBeDefined();
    expect(next.x).toEqual(1);
    expect(next.y).toEqual(0);

    next = grid.getNext({x: 18, y: 0}, Direction.Right);

    expect(next).toBeDefined();
    expect(next.x).toEqual(19);
    expect(next.y).toEqual(0);

    next = grid.getNext(next, Direction.Right);

    expect(next).toBeDefined();
    expect(next.x).toEqual(0);
    expect(next.y).toEqual(0);

    next = grid.getNext({x: 0, y: 0}, Direction.Left);

    expect(next).toBeDefined();
    expect(next.x).toEqual(19);
    expect(next.y).toEqual(0);

    next = grid.getNext({x: 19, y: 0}, Direction.Left);

    expect(next).toBeDefined();
    expect(next.x).toEqual(18);
    expect(next.y).toEqual(0);

    next = grid.getNext({x: 0, y: 18}, Direction.Down);

    expect(next).toBeDefined();
    expect(next.x).toEqual(0);
    expect(next.y).toEqual(19);

    next = grid.getNext({x: 0, y: 19}, Direction.Down);

    expect(next).toBeDefined();
    expect(next.x).toEqual(0);
    expect(next.y).toEqual(0);

    next = grid.getNext({x: 0, y: 0}, Direction.Up);

    expect(next).toBeDefined();
    expect(next.x).toEqual(0);
    expect(next.y).toEqual(19);

    next = grid.getNext({x: 0, y: 19}, Direction.Up);

    expect(next).toBeDefined();
    expect(next.x).toEqual(0);
    expect(next.y).toEqual(18);

  });

  it('assesses number of rows and columns correctly', () => {
    let g = grid;

    expect(g.columns).toEqual(20);
    expect(g.rows).toEqual(20);

    g = new Grid(202, 198, 10);
    expect(g.columns).toEqual(20);
    expect(g.rows).toEqual(19);

  });

});
