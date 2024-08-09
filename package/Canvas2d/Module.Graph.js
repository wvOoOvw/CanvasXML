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

const conversionRect = (rect) => {
  const x = rect.x
  const y = rect.y
  const w = rect.w
  const h = rect.h

  const point0 = { x, y }
  const point1 = { x: x + w, y }
  const point2 = { x: x + w, y: y + h }
  const point3 = { x, y: y + h }

  return [point0, point1, point2, point3]
}

const intersectionLineLine = (line0, line1) => {
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

const intersectionCircleCircle = (circle0, circle1) => {
  const cx0 = circle0.cx
  const cy0 = circle0.cy
  const r0 = circle0.radius
  const cx1 = circle1.cx
  const cy1 = circle1.cy
  const r1 = circle1.radius

  const distance = Math.sqrt((cx0 - cx1) ** 2 + (cy0 - cy1) ** 2)

  return distance <= r0 + r1
}

const intersectionPointLine = (point, line) => {
  const p0 = line[0]
  const p1 = line[1]

  const crossProduct = (p0, p1, p2, p3) => (p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x)

  const selfCrossProduct = crossProduct(point, p0, point, p1)

  const inside = point.x >= Math.min(p0.x, p1.x) && point.x <= Math.max(p0.x, p1.x) && point.y >= Math.min(p0.y, p1.y) && point.y <= Math.max(p0.y, p1.y)

  return selfCrossProduct === 0 && inside
}

const intersectionLineCircle = (line, circle) => {
  const p0 = line[0]
  const p1 = line[1]

  const cx = circle.cx
  const cy = circle.cy
  const r = circle.radius
  
  const crossProduct = (p0, p1, p2, p3) => (p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x)

  const selfCrossProduct = crossProduct(p0, p1, { x: cx, y: cy }, { x: cx + r, y: cy })

  const pointCrossProduct_0 = crossProduct(p0, p1, p0, { x: cx, y: cy })

  const distance = Math.abs(pointCrossProduct_0) / Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2)

  return selfCrossProduct === 0 && distance <= r
}

const distancePointPoint = (point0, point1) => {
  return Math.sqrt((point0.x - point1.x) ** 2 + (point0.y - point1.y) ** 2)
}

const distancePointLine = (point, line) => {  
  const px = point.x
  const py = point.y
  const ax = line[0].x
  const ay = line[0].y
  const bx = line[1].x
  const by = line[1].y

  let abx = bx - ax
  let aby = by - ay
  let apx = px - ax
  let apy = py - ay

  let ab_distance = Math.sqrt(abx ** 2 + aby ** 2)
  let ab_dot = apx ** 2 + apy ** 2
  let ab_rate = ab_dot / ab_distance

  if (ab_rate < 0) { 
    return distancePointPoint(point, line[0])
  }
  
  if (ab_rate > ab_distance) {  
    return distancePointPoint(point, line[1])
  }

  if (ab_rate >= 0 && ab_rate <= ab_distance) {
    return Math.sqrt(apx ** 2 + apy ** 2 - ab_rate * ab_rate)
  }
}

// 使用示例

// console.log(distancePointLine(5, 5, 0, 0, 0.2, 0))

// 写 intersectLineCircle 的测试用例

// console.log(intersectLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.1 })) // true
// console.log(intersectLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.01 })) // false
// console.log(intersectLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.5 })) // true
// console.log(intersectLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.6 })) // true


export default { rotatePoint, conversionRect, intersectionLineLine, intersectionCircleCircle, intersectionPointLine, intersectionLineCircle, distancePointPoint, distancePointLine }