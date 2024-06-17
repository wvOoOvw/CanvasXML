const nan = (n) => isNaN(n) ? NaN : n


const x = (position) => nan(position.x)

const y = (position) => nan(position.y)

const w = (position) => nan(position.w)

const h = (position) => nan(position.h)

const location = (position) => Object({ ...position, x: x(position), y: y(position), w: w(position), h: h(position) })


const l = (position) => nan(position.x)

const r = (position) => nan(position.x + position.w)

const t = (position) => nan(position.y)

const b = (position) => nan(position.y + position.h)

const wireframe = (position) => Object({ ...position, l: l(position), r: r(position), t: t(position), b: b(position) })


const cx = (position) => nan(position.x + position.w / 2)

const cy = (position) => nan(position.y + position.h / 2)

const rcx = (position) => nan(position.x - position.w / 2)

const rcy = (position) => nan(position.y - position.h / 2)

const ltx = (position) => nan(position.x)

const lty = (position) => nan(position.y)

const lbx = (position) => nan(position.x)

const lby = (position) => nan(position.y + position.h)

const rtx = (position) => nan(position.x + position.w)

const rty = (position) => nan(position.y)

const rbx = (position) => nan(position.x + position.w)

const rby = (position) => nan(position.y + position.h)

const point = (position) => Object({ ...position, cx: cx(position), cy: cy(position), rcx: rcx(position), rcy: rcy(position), ltx: ltx(position), lty: lty(position), lbx: lbx(position), lby: lby(position), rtx: rtx(position), rty: rty(position), rbx: rbx(position), rby: rby(position) })


const vmin = (position) => nan(Math.min(position.w, position.h) * 0.01)

const vmax = (position) => nan(Math.max(position.w, position.h) * 0.01)

const vw = (position) => nan(position.w * 0.01)

const vh = (position) => nan(position.h * 0.01)

const viewport = (position) => Object({ ...position, vmin: vmin(position), vmax: vmax(position), vw: vw(position), vh: vh(position) })


const fromcenter = (position) => Object({ ...position, x: rcx(position), y: rcy(position) })


const coordinate = (position) => Object({ ...location(position), ...wireframe(position), ...point(position), ...viewport(position) })

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


const Position = { x,y,w,h,l, r, t, b, wireframe, cx, cy,rcx,rcy, ltx, lty, lbx, lby, rtx, rty, rbx, rby, point, vmin, vmax, vw, vh, viewport, fromcenter, coordinate, coordinatefromcenter, add, box, wmin, wmax, hmin, hmax, pointcover }

export default Position