const distanceCircleCenter = (targetX, targetY, circleX, circleY) => {
  const x = Math.abs(targetX - circleX)
  const y = Math.abs(targetY - circleY)
  return (x ** 2 + y ** 2) ** 0.5
}

const distanceCircleTarget = (cx, cy, radius, angle) => {
  const x = cx + radius * Math.cos(angle)
  const y = cy + radius * Math.sin(angle)
  return { x: x, y: y }
}

// const coverCircle = (targetX, targetY, circleX, circleY, radius) => {
//   return distanceCircleCenter(targetX, targetY, circleX, circleY) <= radius
// }

const coverArc = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const distance = distanceCircleCenter(targetX, targetY, circleX, circleY)

  if (Boolean(counterclockwise) === true) {
    var angle = Math.atan2(targetY - circleY, targetX - circleX)
    if (angle < 0) angle += 2 * Math.PI

    return distance <= radius && (2 * Math.PI - angle) >= sAngle && (2 * Math.PI - angle) <= (2 * Math.PI - eAngle)
  }
  if (Boolean(counterclockwise) !== true) {
    var angle = Math.atan2(targetY - circleY, targetX - circleX)
    if (angle < 0) angle += 2 * Math.PI
    return distance <= radius && angle >= sAngle && angle <= eAngle
  }
}

const coverCircle = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const distance = distanceCircleCenter(targetX, targetY, circleX, circleY)

  if (Boolean(counterclockwise) === true) {
    var angle = Math.atan2(targetY - circleY, targetX - circleX)
    if (angle < 0) angle += 2 * Math.PI
    return distance <= radius && angle <= sAngle || angle >= eAngle
  }
  if (Boolean(counterclockwise) !== true) {
    var angle = Math.atan2(targetY - circleY, targetX - circleX)
    if (angle < 0) angle += 2 * Math.PI
    return distance <= radius && angle >= sAngle && angle <= eAngle
  }
}

const coverRect = (targetX, targetY, rectX, rectY, rectWidth, rectHeight) => {
  return targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight
}

const coverRectWithRadius = (targetX, targetY, rectX, rectY, rectWidth, rectHeight, radius) => {
  const coverRectIn = coverRect(targetX, targetY, rectX, rectY, rectWidth, rectHeight)
  if (coverRectIn === false && distanceCircleCenter(targetX, targetY, rectX + radius, rectY + radius) > radius) return false
  if (coverRectIn === false && distanceCircleCenter(targetX, targetY, rectX + rectWidth - radius, rectY + radius) > radius) return false
  if (coverRectIn === false && distanceCircleCenter(targetX, targetY, rectX + radius, rectY + rectHeight - radius) > radius) return false
  if (coverRectIn === false && distanceCircleCenter(targetX, targetY, rectX + rectWidth - radius, rectY + rectHeight - radius) > radius) return false
  return coverRectIn
}

const GlobalUtils = { distanceCircleCenter, distanceCircleTarget, coverCircle, coverArc, coverRect, coverRectWithRadius }

export default GlobalUtils

export { distanceCircleCenter, distanceCircleTarget, coverCircle, coverArc, coverRect, coverRectWithRadius }