const number = (number, fixed) => Number(number.toFixed(fixed))

const random = (number, offset, fixed) => Number(((Math.random() * number).toFixed(fixed))) + offset

const range = (number, min, max) => Math.min(Math.max(number, min), max)

const Caculate = { number, random, range }

export default Caculate