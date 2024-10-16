const distancePointPoint = (point0, point1) => {
  return Math.sqrt((point1.x - point0.x) ** 2 + (point1.y - point0.y) ** 2)
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

  if (px === ax && py === ay) return 0
  if (px === bx && py === by) return 0

  let ab_distance = Math.sqrt(abx ** 2 + aby ** 2)
  let ab_dot = apx * abx + apy * aby
  let ab_rate = ab_dot / ab_distance

  if (ab_rate < 0) {
    return distancePointPoint(point, line[0])
  }

  if (ab_rate > ab_distance) {
    return distancePointPoint(point, line[1])
  }

  if (ab_rate > 0 && ab_rate < ab_distance) {
    return Math.sqrt(apx ** 2 + apy ** 2 - ab_rate ** 2)
  }
}

// console.log(distancePointLine({ x: 1 ,y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 2 ,y: 2 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 0 ,y: 0 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 3 ,y: 3 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 1 ,y: 0 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 0 ,y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))

const rotatePoint = (originPoint, targetPoint, angle) => {
  const x = originPoint.x
  const y = originPoint.y

  const targetX = targetPoint.x
  const targetY = targetPoint.y

  const sin = Math.sin(angle)
  const cos = Math.cos(angle)

  const rotateX = (x - targetX) * cos - (y - targetY) * sin + targetX
  const rotateY = (x - targetX) * sin + (y - targetY) * cos + targetY

  return { x: rotateX, y: rotateY }
}

const conversionRectPoint = (rect) => {
  const x = rect.x
  const y = rect.y
  const w = rect.w
  const h = rect.h

  const point0 = { x: x - w / 2, y: y - h / 2 }
  const point1 = { x: x + w / 2, y: y - h / 2 }
  const point2 = { x: x + w / 2, y: y + h / 2 }
  const point3 = { x: x - w / 2, y: y + h / 2 }

  return [point0, point1, point2, point3]
}

const conversionRectLine = (rect) => {
  const x = rect.x
  const y = rect.y
  const w = rect.w
  const h = rect.h

  const point0 = { x: x - w / 2, y: y - h / 2 }
  const point1 = { x: x + w / 2, y: y - h / 2 }
  const point2 = { x: x + w / 2, y: y + h / 2 }
  const point3 = { x: x - w / 2, y: y + h / 2 }

  return [[point0, point1], [point1, point2], [point2, point3], [point3, point0]]
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

const intersectionPointCircle = (point, circle) => {
  const x = circle.x
  const y = circle.y
  const r = circle.radius

  return distancePointPoint(point, { x: x, y: y }) <= r
}

const intersectionCircleCircle = (circle0, circle1) => {
  const x0 = circle0.x
  const y0 = circle0.y
  const r0 = circle0.radius
  const x1 = circle1.x
  const y1 = circle1.y
  const r1 = circle1.radius

  return distancePointPoint({ x: x0, y: y0 }, { x: x1, y: y1 }) <= r0 + r1
}

// console.log(intersectionCircleCircle({ x: 0, y: 0, radius: 1 }, { x: 0, y: 0, radius: 0.1 }))
// console.log(intersectionCircleCircle({ x: 0, y: 0, radius: 1 }, { x: 0, y: 0, radius: 1 }))
// console.log(intersectionCircleCircle({ x: 0, y: 0, radius: 1 }, { x: 2, y: 0, radius: 1 }))
// console.log(intersectionCircleCircle({ x: 0, y: 0, radius: 1 }, { x: 1, y: 0, radius: 1 }))
// console.log(intersectionCircleCircle({ x: 0, y: 0, radius: 1 }, { x: 1, y: 1, radius: 1 }))
// console.log(intersectionCircleCircle({ x: 0, y: 0, radius: 1 }, { x: 1, y: 1, radius: 0.5 }))
// console.log(intersectionCircleCircle({ x: 0, y: 0, radius: 1 }, { x: 1, y: 1, radius: 0.1 }))
// console.log(intersectionCircleCircle({ x: 0, y: 0, radius: 1 }, { x: 0, y: 2, radius: 0.01 }))

const intersectionPointLine = (point, line) => {
  const p0 = line[0]
  const p1 = line[1]

  const crossProduct = (p0, p1, p2, p3) => (p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x)

  const selfCrossProduct = crossProduct(point, p0, point, p1)

  const inside = point.x >= Math.min(p0.x, p1.x) && point.x <= Math.max(p0.x, p1.x) && point.y >= Math.min(p0.y, p1.y) && point.y <= Math.max(p0.y, p1.y)

  return selfCrossProduct === 0 && inside
}

// console.log(intersectionPointLine({ x: 1 ,y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 2 ,y: 2 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 1.5 ,y: 1.5 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 1.75 ,y: 1.75 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 0 ,y: 0 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 3 ,y: 3 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 1 ,y: 0 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 0 ,y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))

const intersectionLineCircle = (line, circle) => {
  const x = circle.x
  const y = circle.y
  const r = circle.radius

  const point = { x: x, y: y }

  return distancePointLine(point, line) <= r
}

// console.log(intersectionLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { x: 0.5, y: 0.5, radius: 0.1 })) // true
// console.log(intersectionLineCircle([{ x: 0, y: 0 }, { x: 4, y: 0 }], { x: 0.5, y: 0.5, radius: 0.01 })) // false
// console.log(intersectionLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { x: 0.5, y: 0.5, radius: 0.5 })) // true
// console.log(intersectionLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { x: 0.5, y: 0.5, radius: 0.6 })) // true

const intersectionPointPolygon = (point, polygon) => {
  let count = 0

  const inLine = new Array(polygon.length).fill().some((i, index) => {
    const p0 = polygon[index]
    const p1 = polygon[(index + 1) % polygon.length]

    if (intersectionPointLine(point, [p0, p1])) {
      return true
    }

    if (point.y > Math.min(p0.y, p1.y) && point.y <= Math.max(p0.y, p1.y) && (point.y - p0.y) * (p1.x - p0.x) / (p1.y - p0.y) + p0.x > point.x) {
      count = count + 1
    }
  })

  return inLine || count % 2 === 1
}

const intersectionLinePolygon = (line, polygon) => {
  const p0 = line[0]
  const p1 = line[1]

  return [p0, p1].some(point => intersectionPointPolygon(point, polygon))
}

// console.log(intersectionPointPolygon({ x: 4, y: 4 }, [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 4 }])) // true
// console.log(intersectionPointPolygon({ x: 4, y: 4 }, [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 4 }, { x: 4, y: 4 }])) // true
// console.log(intersectionPointPolygon({ x: 4, y: 4 }, [{ x: 5, y: 6 }, { x: 7, y: 7 }, { x: 7, y: 2 }])) // false
// console.log(intersectionPointPolygon({ x: 2, y: 4 }, [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 4 }])) // false
// console.log(intersectionPointPolygon({ x: 4, y: 2 }, [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 4 }])) // false
// console.log(intersectionPointPolygon({ x: 2, y: 2 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // false
// console.log(intersectionPointPolygon({ x: 5, y: 5 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // true
// console.log(intersectionPointPolygon({ x: 4, y: 4 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // true
// console.log(intersectionPointPolygon({ x: 8, y: 8 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // true
// console.log(intersectionPointPolygon({ x: 4, y: 8 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // true

const intersectionPolygonPolygon = (polygon0, polygon1) => {
  return polygon0.some(point => intersectionPointPolygon(point, polygon1))
}

export default { distancePointPoint, distancePointLine, rotatePoint, conversionRectPoint, conversionRectLine, intersectionLineLine, intersectionPointCircle, intersectionCircleCircle, intersectionPointLine, intersectionLineCircle, intersectionPointPolygon, intersectionLinePolygon, intersectionPolygonPolygon }