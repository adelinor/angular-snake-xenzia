import { Grid }      from './grid';

describe('Grid', function () {
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(200, 200, 10);
  });

  it('converts to pixel coordinates', () => {
    let p = grid.coordinates(0, 0, 0, 0);
    expect(p).toBeDefined();
    expect(p.x).toEqual(0);
    expect(p.y).toEqual(0);

    p = grid.coordinates(0, 0, 1, 2);
    expect(p).toBeDefined();
    expect(p.x).toEqual(1);
    expect(p.y).toEqual(2);

    p = grid.coordinates(1, 2, 0, 0);
    expect(p).toBeDefined();
    expect(p.x).toEqual(10);
    expect(p.y).toEqual(20);

    p = grid.coordinates(0, 0, -1, -2);
    expect(p).toBeDefined();
    expect(p.x).toEqual(199);
    expect(p.y).toEqual(198);

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
