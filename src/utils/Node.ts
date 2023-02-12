export default class Node {
  index: number;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  constructor(index);
  constructor(index: number, r: number);
  constructor(index, x: number, y: number);
  constructor(
    index: number,
    r: number,
    x: number,
    y: number,
    vx: number,
    vy: number
  );
  constructor(
    index: number,
    r: number = 1,
    x: number = 0,
    y: number = 0,
    vx: number = 0,
    vy: number = 0
  ) {
    this.index = index;
    this.r = r;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
}
