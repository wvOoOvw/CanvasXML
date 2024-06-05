const add = (positions) => positions.reduce((t, i) => Object({ x: t.x + (i.x || 0), y: t.y + (i.y || 0), w: t.w + (i.w || 0), h: t.h + (i.h || 0) }), { x: 0, y: 0, w: 0, h: 0 })

const box = (positions) => positions.reduce((t, i) => Object({ x: i.x ? Math.min(t.x, i.x) : t.x, y: i.y ? Math.min(t.y, i.y) : t.y, w: i.x && i.w ? Math.max(t.w, i.x + i.w) : t.w, h: i.y && i.h ? Math.max(t.h, i.y + i.h) : t.h }), { x: 0, y: 0, w: 0, h: 0 })

const wmin = (positions) => positions.reduce((t, i) => i.w ? Math.min(i.w, t) : t, 0)

const wmax = (positions) => positions.reduce((t, i) => i.w ? Math.max(i.w, t) : t, 0)

const hmin = (positions) => positions.reduce((t, i) => i.h ? Math.min(i.h, t) : t, 0)

const hmax = (positions) => positions.reduce((t, i) => i.h ? Math.max(i.h, t) : t, 0)

const vmin = (position) => Math.min(position.w, position.h) * 0.01

const vmax = (position) => Math.max(position.w, position.h) * 0.01

const vw = (position) => position.w * 0.01

const vh = (position) => position.h * 0.01

const cx = (position) => position.x + position.w / 2

const cy = (position) => position.y + position.h / 2

const center = (position) => Object({ x: (position.x || 0) + (position.w ? position.w / 2 : 0), y: (position.y || 0) + (position.h ? position.h / 2 : 0), w: (position.w || 0), h: (position.h || 0) })

const centerx = (position) => Object({ x: (position.x || 0) + (position.w ? position.w / 2 : 0), y: (position.y || 0), w: (position.w || 0), h: (position.h || 0) })

const centery = (position) => Object({ x: (position.x || 0), y: (position.y || 0) + (position.h ? position.h / 2 : 0), w: (position.w || 0), h: (position.h || 0) })

const centered = (position) => Object({ x: (position.x || 0) - (position.w ? position.w / 2 : 0), y: (position.y || 0) - (position.h ? position.h / 2 : 0), w: (position.w || 0), h: (position.h || 0) })

const centeredx = (position) => Object({ x: (position.x || 0) - (position.w ? position.w / 2 : 0), y: (position.y || 0), w: (position.w || 0), h: (position.h || 0) })

const centeredy = (position) => Object({ x: (position.x || 0), y: (position.y || 0) - (position.h ? position.h / 2 : 0), w: (position.w || 0), h: (position.h || 0) })

const coordinate = (position) => new Array([[vmax, 'vmax'], [vw, 'vw'], [vh, 'vh'], [cx, 'cx'], [cy, 'cy'], [border]]).reduce((t, i) => Object.assign(t, { [i[1]]: i[0](position) } ), Object({ x: position.x, y: position.y, w: position.w, h: position.h, l: position.x, r: position.x + position.w, t: position.y, b: position.y + position.h }))

const pointcover = (position, point) => point.x >= position.x && point.x <= position.x + position.w && point.y >= position.y && point.y <= position.y + position.h

const Position = { add, box, wmin, wmax, hmin, hmax, vmin, vmax, vw, vh, cx, cy, center, centerx, centery, centered,centeredx, centeredy, coordinate, pointcover }

export default Position