const _position = ['x', 'y', 'w', 'h']

const _wireframe = ['l', 'r', 't', 'b']

const _point = ['cx', 'cy', 'tlx', 'tly', 'trx', 'try', 'blx', 'bly', 'brx', 'bry']

const _viewport = ['vmin', 'vmax', 'vw', 'vh']

const _coordinate = _position & _wireframe & _point & _viewport

const vmin = (position) => Math.min(position.w, position.h) * 0.01

const vmax = (position) => Math.max(position.w, position.h) * 0.01

const vw = (position) => position.w * 0.01

const vh = (position) => position.h * 0.01

const centerx = (position) => position.x + position.w / 2

const centery = (position) => position.y + position.h / 2

const centerreversex = (position) => position.x - position.w / 2

const centerreversey = (position) => position.y - position.h / 2


const center = (position) => Object({ x: (position.x || 0) + (position.w ? position.w / 2 : 0), y: (position.y || 0) + (position.h ? position.h / 2 : 0), w: (position.w || 0), h: (position.h || 0) })

const centerreverse = (position) => Object({ x: (position.x || 0) - (position.w ? position.w / 2 : 0), y: (position.y || 0) - (position.h ? position.h / 2 : 0), w: (position.w || 0), h: (position.h || 0) })


const coordinate = (position) => new Array([[vmax, 'vmax'], [vw, 'vw'], [vh, 'vh'], [centerx, 'cx'], [centery, 'cy'], [border]]).reduce((t, i) => Object.assign(t, { [i[1]]: i[0](position) } ), Object({ x: position.x, y: position.y, w: position.w, h: position.h, l: position.x, r: position.x + position.w, t: position.y, b: position.y + position.h }))

const pointcover = (position, point) => point.x >= position.x && point.x <= position.x + position.w && point.y >= position.y && point.y <= position.y + position.h


const Position = { add, box, wmin, wmax, hmin, hmax, vmin, vmax, vw, vh, center, centerx, centery, centerreverse, coordinate, pointcover }

export default Position