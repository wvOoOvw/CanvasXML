const nan = (n) => isNaN(n) ? NaN : n


const x = (location) => nan(location.x)

const y = (location) => nan(location.y)

const w = (location) => nan(location.w)

const h = (location) => nan(location.h)

const locational = (location) => Object({ x: x(location), y: y(location), w: w(location), h: h(location) })


const l = (location) => nan(location.x)

const r = (location) => nan(location.x + location.w)

const t = (location) => nan(location.y)

const b = (location) => nan(location.y + location.h)

const wireframe = (location) => Object({ l: l(location), r: r(location), t: t(location), b: b(location) })


const cx = (location) => nan(location.x + location.w / 2)

const cy = (location) => nan(location.y + location.h / 2)

const rcx = (location) => nan(location.x - location.w / 2)

const rcy = (location) => nan(location.y - location.h / 2)

const ltx = (location) => nan(location.x)

const lty = (location) => nan(location.y)

const lbx = (location) => nan(location.x)

const lby = (location) => nan(location.y + location.h)

const rtx = (location) => nan(location.x + location.w)

const rty = (location) => nan(location.y)

const rbx = (location) => nan(location.x + location.w)

const rby = (location) => nan(location.y + location.h)

const point = (location) => Object({ cx: cx(location), cy: cy(location), rcx: rcx(location), rcy: rcy(location), ltx: ltx(location), lty: lty(location), lbx: lbx(location), lby: lby(location), rtx: rtx(location), rty: rty(location), rbx: rbx(location), rby: rby(location) })


const vmin = (location) => nan(Math.min(location.w, location.h) * 0.01)

const vmax = (location) => nan(Math.max(location.w, location.h) * 0.01)

const vw = (location) => nan(location.w * 0.01)

const vh = (location) => nan(location.h * 0.01)

const viewport = (location) => Object({ vmin: vmin(location), vmax: vmax(location), vw: vw(location), vh: vh(location) })


const coordinate = (location) => {
  return Object({ ...locational(location), ...wireframe(location), ...point(location), ...viewport(location) })
}


const validate = (positions) => {
  const result = positions.reduce((t, i) => {
    return t
      && typeof i.x === 'number'
      && typeof i.y === 'number'
      && typeof i.w === 'number'
      && typeof i.h === 'number'
  }, true)

  return result
}

const add = (positions) => {
  const sum = positions.reduce((t, i) => {
    return {
      x: t.x !== undefined ? t.x + i.x : i.x,
      y: t.y !== undefined ? t.y + i.y : i.y,
      w: t.w !== undefined ? t.w + i.w : i.w,
      h: t.h !== undefined ? t.h + i.h : i.h,
    }
  }, { x: undefined, y: undefined, w: undefined, h: undefined })

  return sum
}

const box = (positions) => {
  const point = positions.reduce((t, i) => {
    return {
      boxt: t.boxt !== undefined ? (isNaN(i.y) ? t.boxt : Math.min(t.boxt, i.y)) : (isNaN(i.y) ? t.boxt : i.y),
      boxb: t.boxb !== undefined ? (isNaN(i.y + i.h) ? t.boxb : Math.max(t.boxb, i.y + i.h)) : (isNaN(i.y + i.h) ? t.boxt : i.y + i.h),
      boxl: t.boxl !== undefined ? (isNaN(i.x) ? t.boxl : Math.min(t.boxl, i.x)) : (isNaN(i.x) ? t.boxt : i.x),
      boxr: t.boxr !== undefined ? (isNaN(i.x + i.w) ? t.boxr : Math.max(t.boxr, i.x + i.w)) : (isNaN(i.x + i.w) ? t.boxt : i.x + i.w),
    }
  }, { boxt: undefined, boxb: undefined, boxl: undefined, boxr: undefined })

  return { x: point.boxl, y: point.boxt, w: point.boxr - point.boxl, h: point.boxb - point.boxt }
}

const wmin = (positions) => positions.reduce((t, i) => i.w ? Math.min(i.w, t) : t, 0)

const wmax = (positions) => positions.reduce((t, i) => i.w ? Math.max(i.w, t) : t, 0)

const hmin = (positions) => positions.reduce((t, i) => i.h ? Math.min(i.h, t) : t, 0)

const hmax = (positions) => positions.reduce((t, i) => i.h ? Math.max(i.h, t) : t, 0)


const pointcover = (location, point) => point.x >= location.x && point.x <= location.x + location.w && point.y >= location.y && point.y <= location.y + location.h


const Canvas2dLocation = { x, y, w, h, locational, l, r, t, b, wireframe, cx, cy, rcx, rcy, ltx, lty, lbx, lby, rtx, rty, rbx, rby, point, vmin, vmax, vw, vh, viewport, coordinate, validate, add, box, wmin, wmax, hmin, hmax, pointcover }

export default Canvas2dLocation