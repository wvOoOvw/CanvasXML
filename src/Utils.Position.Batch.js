const add = (positions) => positions.reduce((t, i) => Object({ x: t.x + (i.x || 0), y: t.y + (i.y || 0), w: t.w + (i.w || 0), h: t.h + (i.h || 0) }), { x: 0, y: 0, w: 0, h: 0 })

const box = (positions) => positions.reduce((t, i) => Object({ x: i.x ? Math.min(t.x, i.x) : t.x, y: i.y ? Math.min(t.y, i.y) : t.y, w: i.x && i.w ? Math.max(t.w, i.x + i.w) : t.w, h: i.y && i.h ? Math.max(t.h, i.y + i.h) : t.h }), { x: 0, y: 0, w: 0, h: 0 })

const wmin = (positions) => positions.reduce((t, i) => i.w ? Math.min(i.w, t) : t, 0)

const wmax = (positions) => positions.reduce((t, i) => i.w ? Math.max(i.w, t) : t, 0)

const hmin = (positions) => positions.reduce((t, i) => i.h ? Math.min(i.h, t) : t, 0)

const hmax = (positions) => positions.reduce((t, i) => i.h ? Math.max(i.h, t) : t, 0)

const PositionBatch = { add, box, wmin, wmax, hmin, hmax }

export default PositionBatch