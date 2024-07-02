const distanceCircleCenter = (targetX, targetY, circleX, circleY) => {
  const x = Math.abs(targetX - circleX)
  const y = Math.abs(targetY - circleY)
  return (x ** 2 + y ** 2) ** 0.5
}

const coverCircle = (targetX, targetY,circleX, circleY, radius) => {
  return distanceCircleCenter(targetX, targetY, circleX, circleY) <= radius
}

const coverArc = (targetX, targetY,circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const angle = Math.atan2(targetY - circleY, targetX - circleX)
  const distance = distanceCircleCenter(targetX, targetY, circleX, circleY)
  if (Boolean(counterclockwise) === true) {
    return distance <= radius && angle >= sAngle && angle <= eAngle
  } 
  if (Boolean(counterclockwise) !== true) {
    return distance <= radius && angle <= sAngle && angle >= eAngle
  }
}

const coverRect = (targetX, targetY, rectX, rectY, rectWidth, rectHeight) => {
  return targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight
}

const coverRectWithRadius = (targetX, targetY, rectX, rectY, rectWidth, rectHeight, radius) => {
  if (distanceCircleCenter(targetX, targetY, rectX + radius, rectY + radius) > radius) return false
  if (distanceCircleCenter(targetX, targetY, rectX + rectWidth - radius, rectY + radius) > radius) return false
  if (distanceCircleCenter(targetX, targetY, rectX + radius, rectY + rectHeight - radius) > radius) return false
  if (distanceCircleCenter(targetX, targetY, rectX + rectWidth - radius, rectY + rectHeight - radius) > radius) return false
  return targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight
}

const GlobalUtils = { distanceCircleCenter, coverCircle, coverArc, coverRect, coverRectWithRadius }

export default GlobalUtils

export { distanceCircleCenter, coverCircle, coverArc, coverRect, coverRectWithRadius }