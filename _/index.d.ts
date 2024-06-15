// Position

interface Position {
    x: number
    y: number
    w: number
    h: number
}

interface PositionCenter {
    cx: number
    cy: number
    w: number
    h: number
}

type l = (position: Position) => number
type r = (position: Position) => number
type t = (position: Position) => number
type b = (position: Position) => number

interface Wireframe {
    l: number
    r: number
    t: number
    b: number
}

type wireframe = (position: Position) => Wireframe

type cx = (position: Position) => number
type cy = (position: Position) => number
type ltx = (position: Position) => number
type lty = (position: Position) => number
type lbx = (position: Position) => number
type lby = (position: Position) => number
type rtx = (position: Position) => number
type rty = (position: Position) => number
type rbx = (position: Position) => number
type rby = (position: Position) => number

interface Point {
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

type point = (position: Position) => Point

type vmin = (position: Position) => number
type vmax = (position: Position) => number
type vw = (position: Position) => number
type vh = (position: Position) => number

interface Viewport {
    vmin: number
    vmax: number
    vw: number
    vh: number
}

type viewport = (position: Position) => Viewport

type fromcenter = (position: PositionCenter) => Position

type coordinate = (position: Position) => Position & Wireframe & Point & Viewport

type coordinatefromcenter = (position: PositionCenter) => Position & Wireframe & Point & Viewport

type add = (positions: Position[]) => Position

type box = (positions: Position[]) => Position

type wmin = (positions: Position[]) => number

type wmax = (positions: Position[]) => number

type hmin = (positions: Position[]) => number

type hmax = (positions: Position[]) => number

type pointcover = (position: Position, point: { x: number, y: number }) => boolean

interface PositionExport {
    l: l
    r: r
    t: t
    b: b
    wireframe: wireframe
    cx: cx
    cy: cy
    ltx: ltx
    lty: lty
    lbx: lbx
    lby: lby
    rtx: rtx
    rty: rty
    rbx: rbx
    rby: rby
    point: point
    vmin: vmin
    vmax: vmax
    vw: vw
    vh: vh
    viewport: viewport
    fromcenter: fromcenter
    coordinate: coordinate
	add: add
	box: box
	wmin: wmin
	wmax: wmax
	hmin: hmin
	hmax: hmax
	pointcover: pointcover
    coordinatefromcenter: coordinatefromcenter
}

// Position / END

declare const CanvasXML: {
	Position: PositionExport
}

export = CanvasXML
