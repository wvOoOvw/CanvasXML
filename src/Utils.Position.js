const add = (positions) => positions.reduce((t, i) => Object({ x: t.x + (i.x || 0), y: t.y + (i.y || 0), w: t.w + (i.w || 0), h: t.h + (i.h || 0) }), { x: 0, y: 0, w: 0, h: 0 })

const center = (position) => Object({ x: (position.x || 0) + (position.w ? position.w / 2 : 0), y: (position.y || 0) + (position.h ? position.h / 2 : 0), w: (position.w || 0), h: (position.h || 0) })

const centered = (position) => Object({ x: (position.x || 0) - (position.w ? position.w / 2 : 0), y: (position.y || 0) - (position.h ? position.h / 2 : 0), w: (position.w || 0), h: (position.h || 0) })

const pointcover = (position, point) => point.x >= position.x && point.x <= position.x + position.w && point.y >= position.y && point.y <= position.y + position.h

const coordinate = (position) => Object({ x: position.x + position.w / 2, y: position.y + position.h / 2, w: position.w, h: position.h, l: position.x, r: position.x + position.w, t: position.y, b: position.y + position.h })

const min = (position) => Math.min(position.w, position.h)

const max = (position) => Math.max(position.w, position.h)

const Position = { add, center, centered, pointcover, coordinate, min, max }

export default Position