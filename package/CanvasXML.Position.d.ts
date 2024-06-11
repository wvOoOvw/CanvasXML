interface Position {
    x?: number
    y?: number
    w?: number
    h?: number
}

interface PositionCenter {
    cx?: number
    cy?: number
    w?: number
    h?: number
}

type l = (position: Position) => number
type r = (position: Position) => number
type t = (position: Position) => number
type b = (position: Position) => number

interface ReturnWireframe {l: number, r: number, t: number, b: number}

type wireframe = (position: Position) => ReturnWireframe

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

interface ReturnPoint {cx: number, cy: number, ltx: number, lty: number, lbx: number, lby: number, rtx: number, rty: number, rbx: number, rby: number}

type point = (position: Position) => ReturnPoint

type vmin = (position: Position) => number
type vmax = (position: Position) => number
type vw = (position: Position) => number
type vh = (position: Position) => number

interface ReturnViewport {vmin: number, vmax: number, vw: number, vh: number}

type viewport = (position: Position) => ReturnViewport

type fromcenter = (position: PositionCenter) => Position

type coordinate = (position: Position) => Position & ReturnWireframe & ReturnPoint & ReturnViewport

type coordinatefromcenter = (position: PositionCenter) => Position & ReturnWireframe & ReturnPoint & ReturnViewport

export default interface PositionReturn {
    l: l,
    r: r,
    t: t,
    b: b,
    wireframe: wireframe,
    cx: cx,
    cy: cy,
    ltx: ltx,
    lty: lty,
    lbx: lbx,
    lby: lby,
    rtx: rtx,
    rty: rty,
    rbx: rbx,
    rby: rby,
    point: point,
    vmin: vmin,
    vmax: vmax,
    vw: vw,
    vh: vh,
    viewport: viewport,
    fromcenter: fromcenter,
    coordinate: coordinate,
    coordinatefromcenter: coordinatefromcenter
}