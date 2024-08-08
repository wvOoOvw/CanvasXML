const rotatePoint = (point, targetPoint, angle) => {
  const x = point.x
  const y = point.y

  const targetX = targetPoint.x
  const targetY = targetPoint.y

  const sin = Math.sin(angle)
  const cos = Math.cos(angle)

  const resultX = (x - targetX) * cos - (y - targetY) * sin + targetX
  const resultY = (x - targetX) * sin + (y - targetY) * cos + targetY

  return { x: resultX, y: resultY }
}

const translatePointsReact = (rect, targetPoint, angle) => {
  const x = rect.x
  const y = rect.y
  const w = rect.w
  const h = rect.h

  const point0 = { x, y }
  const point1 = { x: x + w, y }
  const point2 = { x: x + w, y: y + h }
  const point3 = { x, y: y + h }

  const resultPoint0 = rotatePoint(point0, targetPoint, angle)
  const resultPoint1 = rotatePoint(point1, targetPoint, angle)
  const resultPoint2 = rotatePoint(point2, targetPoint, angle)
  const resultPoint3 = rotatePoint(point3, targetPoint, angle)

  return [resultPoint0, resultPoint1, resultPoint2, resultPoint3]
}

const intersectLineLine = (line0, line1) => {
  const p0 = line0[0]
  const p1 = line0[1]
  const p2 = line1[0]
  const p3 = line1[1]

  const crossProduct = (p0, p1, p2, p3) => (p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x)

  const selfCrossProduct = crossProduct(p0, p1, p2, p3)

  const pointCrossProduct_0 = crossProduct(p0, p1, p0, p2)
  const pointCrossProduct_1 = crossProduct(p0, p1, p0, p3)
  const pointCrossProduct_2 = crossProduct(p2, p3, p2, p0)
  const pointCrossProduct_3 = crossProduct(p2, p3, p2, p1)

  if (selfCrossProduct === 0) {
    return (
      Math.min(p0.x, p1.x) <= Math.max(p2.x, p3.x) &&
      Math.min(p2.x, p3.x) <= Math.max(p0.x, p1.x) &&
      Math.min(p0.y, p1.y) <= Math.max(p2.y, p3.y) &&
      Math.min(p2.y, p3.y) <= Math.max(p0.y, p1.y)
    )
  }

  if (selfCrossProduct !== 0) {
    return (
      pointCrossProduct_0 * pointCrossProduct_1 <= 0 &&
      pointCrossProduct_2 * pointCrossProduct_3 <= 0
    )
  }
}

const intersectCircleCircle = (circle0, circle1) => {
  const cx0 = circle0.cx
  const cy0 = circle0.cy
  const r0 = circle0.radius
  const cx1 = circle1.cx
  const cy1 = circle1.cy
  const r1 = circle1.radius

  const distance = Math.sqrt((cx0 - cx1) ** 2 + (cy0 - cy1) ** 2)

  return distance <= r0 + r1
}

export default { rotatePoint, translatePointsReact, intersectLineLine, intersectCircleCircle }