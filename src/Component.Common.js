const number = (number, fixed) => Number(number.toFixed(fixed))

const random = (number, offset, fixed) => Number(((Math.random() * number).toFixed(fixed))) + offset

export { number, random }