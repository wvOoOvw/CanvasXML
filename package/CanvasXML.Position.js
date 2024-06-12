const l = (position) => position.x

const r = (position) => position.x + position.w

const t = (position) => position.y

const b = (position) => position.y + position.h

const wireframe = (position) => Object({ ...position, l: l(position), r: r(position), t: t(position), b: b(position) })


const cx = (position) => position.x + position.w / 2

const cy = (position) => position.y + position.h / 2

const ltx = (position) => position.x

const lty = (position) => position.y

const lbx = (position) => position.x

const lby = (position) => position.y + position.h

const rtx = (position) => position.x + position.w

const rty = (position) => position.y

const rbx = (position) => position.x + position.w

const rby = (position) => position.y + position.h

const point = (position) => Object({ ...position, cx: cx(position), cy: cy(position), ltx: ltx(position), lty: lty(position), lbx: lbx(position), lby: lby(position), rtx: rtx(position), rty: rty(position), rbx: rbx(position), rby: rby(position) })


const vmin = (position) => Math.min(position.w, position.h) * 0.01

const vmax = (position) => Math.max(position.w, position.h) * 0.01

const vw = (position) => position.w * 0.01

const vh = (position) => position.h * 0.01

const viewport = (position) => Object({ ...position, vmin: vmin(position), vmax: vmax(position), vw: vw(position), vh: vh(position) })


const fromcenter = (position) => Object({ ...position, x: position.cx - position.w / 2, y: position.cy - position.h / 2 })


const coordinate = (position) => Object({ x: position.x, y: position.y, w: position.w, h: position.h, ...wireframe(position), ...point(position), ...viewport(position) })

const coordinatefromcenter = (position) => coordinate(fromcenter(position))


const add = (positions) => positions.reduce((t, i) => Object({ x: t.x + (i.x || 0), y: t.y + (i.y || 0), w: t.w + (i.w || 0), h: t.h + (i.h || 0) }), { x: 0, y: 0, w: 0, h: 0 })

const box = (positions) => {
  const point = positions.reduce((t, i) => {
    return {
      boxt: t.boxt ? Math.min(t.boxt, i.y) : i.y,
      boxb: t.boxb ? Math.min(t.boxb, i.y + i.h) : i.y + i.h,
      boxl: t.boxl ? Math.min(t.boxl, i.x) : i.x,
      boxr: t.boxr ? Math.min(t.boxr, i.x + i.w) : i.x + i.w,
    }
  }, { boxt: undefined, boxb: undefined, boxl: undefined, boxr: undefined })

  return { x: point.boxl, y: point.boxt, w: point.boxr - point.boxl, h: point.boxb - point.boxt }
}



const wmin = (positions) => positions.reduce((t, i) => i.w ? Math.min(i.w, t) : t, 0)

const wmax = (positions) => positions.reduce((t, i) => i.w ? Math.max(i.w, t) : t, 0)

const hmin = (positions) => positions.reduce((t, i) => i.h ? Math.min(i.h, t) : t, 0)

const hmax = (positions) => positions.reduce((t, i) => i.h ? Math.max(i.h, t) : t, 0)


const pointcover = (position, point) => point.x >= position.x && point.x <= position.x + position.w && point.y >= position.y && point.y <= position.y + position.h


const Position = { l, r, t, b, wireframe, cx, cy, ltx, lty, lbx, lby, rtx, rty, rbx, rby, point, vmin, vmax, vw, vh, viewport, fromcenter, coordinate, coordinatefromcenter, add, box, wmin, wmax, hmin, hmax, pointcover }

export default Position