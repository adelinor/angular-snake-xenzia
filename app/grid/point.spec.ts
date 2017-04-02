import { Point, MovingPoint }  from './point';
import { Direction }           from './direction';

describe('Point', function () {

  it('can be compared', () => {
    let p1 = new Point(2,3);
    expect(p1.samePosition(null)).toBeFalsy();
    expect(p1.samePosition(p1)).toBeTruthy();

    let p2 = new Point(3,2);
    expect(p1.samePosition(p2)).toBeFalsy();

    let p3 = new Point(2,3);
    expect(p1.samePosition(p3)).toBeTruthy();

  });
});

describe('MovingPoint', function () {
  let point: MovingPoint;

  beforeEach(() => {
    point = new MovingPoint(new Point(0, 0), Direction.Right);
  });

  it('moves', () => {
    let moved = point.move();
    expect(moved).toBeDefined();
    expect(moved.x).toEqual(1);
    expect(moved.y).toEqual(0);
    expect(moved.direction).toEqual(Direction.Right);
  });

  it('moves towards', () => {
    let moved = point.moveTowards(Direction.Down);
    expect(moved).toBeDefined();
    expect(moved.x).toEqual(0);
    expect(moved.y).toEqual(1);
    expect(moved.direction).toEqual(Direction.Down);
  });

});
