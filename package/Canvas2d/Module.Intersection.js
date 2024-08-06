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

const intersectRectRect = (rect0, rect1) => {

}

// var p0 = [{ x: 4, y: 1 }, { x: 4, y: 4 }]
// var p1 = [{ x: 2, y: 2 }, { x: 4, y: 4 }]

// console.log(intersectLineLine(p0, p1))


export default { intersectLineLine }