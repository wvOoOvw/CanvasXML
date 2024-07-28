const distance = (a, b) => {
  return ((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 0.5
}

const move = (a, b, distance) => {
  const dx = b.x - a.x
  const dy = b.y - a.y

  const abMagnitude = Math.sqrt(dx * dx + dy * dy)

  const normalizedDx = dx / abMagnitude
  const normalizedDy = dy / abMagnitude

  const displacementDx = distance * normalizedDx
  const displacementDy = distance * normalizedDy

  let r = {
    x: a.x + displacementDx,
    y: a.y + displacementDy
  }

  return r
}

export { distance, move }