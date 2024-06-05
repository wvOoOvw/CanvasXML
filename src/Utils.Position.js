const l = (position) => position.x

const r = (position) => position.x + position.w

const t = (position) => position.y

const b = (position) => position.y + position.h

const wireframe = (position) => Object({ x: position.x, y: position.y, w: position.w, h: position.h, l: l(position), r: r(position), t: t(position), b: b(position) })


const crx = (position) => position.x + position.w / 2

const cry = (position) => position.y + position.h / 2

const clx = (position) => position.x - position.w / 2

const cly = (position) => position.y - position.h / 2

const ltx = (position) => position.x

const lty = (position) => position.y

const lbx = (position) => position.x

const lby = (position) => position.y + position.h

const rtx = (position) => position.x + position.w

const rty = (position) => position.y

const rbx = (position) => position.x + position.w

const rby = (position) => position.y + position.h

const point = (position) => Object({ x: position.x, y: position.y, w: position.w, h: position.h, crx: crx(position), cry: cry(position), clx: clx(position), cly: cly(position), ltx: ltx(position), lty: lty(position), lbx: lbx(position), lby: lby(position), rtx: rtx(position), rty: rty(position), rbx: rbx(position), rby: rby(position) })


const vmin = (position) => Math.min(position.w, position.h) * 0.01

const vmax = (position) => Math.max(position.w, position.h) * 0.01

const vw = (position) => position.w * 0.01

const vh = (position) => position.h * 0.01

const viewport = (position) => Object({ x: position.x, y: position.y, w: position.w, h: position.h, vmin: vmin(position), vmax: vmax(position), vw: vw(position), vh: vh(position) })


const coordinate = (position) => Object({ x: position.x, y: position.y, w: position.w, h: position.h, ...wireframe(position), ...point(position), ...viewport(position) })


const Position = { l, r, t, b, wireframe, crx, cry, clx, cly, ltx, lty, lbx, lby, rtx, rty, rbx, rby, point, vmin, vmax, vw, vh, viewport, coordinate }

export default Position