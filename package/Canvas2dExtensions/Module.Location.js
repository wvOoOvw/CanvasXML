const nan = (n) => isNaN(n) ? NaN : n


const x = (location) => nan(location.x)

const y = (location) => nan(location.y)

const w = (location) => nan(location.w)

const h = (location) => nan(location.h)

const locational = (location) => Object({ x: x(location), y: y(location), w: w(location), h: h(location) })


const l = (location) => nan(location.x - location.w / 2)

const r = (location) => nan(location.x + location.w / 2)

const t = (location) => nan(location.y - location.h / 2)

const b = (location) => nan(location.y + location.h / 2)

const wireframe = (location) => Object({ l: l(location), r: r(location), t: t(location), b: b(location) })


const vmin = (location) => nan(Math.min(location.w, location.h) * 0.01)

const vmax = (location) => nan(Math.max(location.w, location.h) * 0.01)

const vw = (location) => nan(location.w * 0.01)

const vh = (location) => nan(location.h * 0.01)

const viewport = (location) => Object({ vmin: vmin(location), vmax: vmax(location), vw: vw(location), vh: vh(location) })


const coordinate = (location) => {
  return Object({ ...locational(location), ...wireframe(location), ...viewport(location) })
}


// const validate = (positions) => {
//   const result = positions.reduce((t, i) => {
//     return t
//       && typeof i.x === 'number'
//       && typeof i.y === 'number'
//       && typeof i.w === 'number'
//       && typeof i.h === 'number'
//   }, true)

//   return result
// }

const add = (positions) => {
  const sum = positions.reduce((t, i) => {
    return {
      w: t.w !== undefined ? t.w + i.w : i.w,
      h: t.h !== undefined ? t.h + i.h : i.h,
    }
  }, { x: undefined, y: undefined, w: undefined, h: undefined })

  return sum
}

// const box = (positions) => {
//   const point = positions.reduce((t, i) => {
//     return {
//       boxt: t.boxt !== undefined ? (isNaN(i.y) ? t.boxt : Math.min(t.boxt, i.y)) : (isNaN(i.y) ? t.boxt : i.y),
//       boxb: t.boxb !== undefined ? (isNaN(i.y + i.h) ? t.boxb : Math.max(t.boxb, i.y + i.h)) : (isNaN(i.y + i.h) ? t.boxt : i.y + i.h),
//       boxl: t.boxl !== undefined ? (isNaN(i.x) ? t.boxl : Math.min(t.boxl, i.x)) : (isNaN(i.x) ? t.boxt : i.x),
//       boxr: t.boxr !== undefined ? (isNaN(i.x + i.w) ? t.boxr : Math.max(t.boxr, i.x + i.w)) : (isNaN(i.x + i.w) ? t.boxt : i.x + i.w),
//     }
//   }, { boxt: undefined, boxb: undefined, boxl: undefined, boxr: undefined })

//   return { x: point.boxl, y: point.boxt, w: point.boxr - point.boxl, h: point.boxb - point.boxt }
// }

const wmin = (positions) => positions.reduce((t, i) => i.w ? Math.min(i.w, t) : t, 0)

const wmax = (positions) => positions.reduce((t, i) => i.w ? Math.max(i.w, t) : t, 0)

const hmin = (positions) => positions.reduce((t, i) => i.h ? Math.min(i.h, t) : t, 0)

const hmax = (positions) => positions.reduce((t, i) => i.h ? Math.max(i.h, t) : t, 0)

export default { x, y, w, h, locational, l, r, t, b, wireframe, vmin, vmax, vw, vh, viewport, coordinate, add, wmin, wmax, hmin, hmax }