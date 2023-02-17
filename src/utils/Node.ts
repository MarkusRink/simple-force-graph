interface BasicD3Node {
  index: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
}

export default class D3Node {
  index: number;
  x: number;
  y: number;
  r:number; //TODO refactore radius out of this class
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  constructor(index);
  constructor(index: number, r: number);
  constructor(index: number, r: number, x: number, y: number);
  constructor(index, x: number, y: number);
  constructor(index, x: number, y: number, fx, fy);
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
    vy: number = 0,
    fx: number | null = null,
    fy: number | null = null,
  ) {
    this.index = index;
    this.r = r;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.fx = fx;
    this.fy = fy;
  }
}

