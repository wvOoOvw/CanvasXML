interface position {
  x: number
  y: number
  w: number
  h: number
}

interface wireframe {
  l: number
  r: number
  t: number
  b: number
}

interface point {
  cx: number
  cy: number
  ltx: number
  lty: number
  lbx: number
  lby: number
  rtx: number
  rty: number
  rbx: number
  rby: number
}

interface viewport {
  vmin: number
  vmax: number
  vw: number
  vh: number
}

type coordinate = position & wireframe & point & viewport