const convertToRoman = (num) => {
  const romanNumerals = [
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ]

  let roman = ''

  romanNumerals.forEach(i => {
    while (num >= i.value) {
      roman += i.symbol
      num -= i.value
    }
  })

  for (let numeral of romanNumerals) {
    while (num >= numeral.value) {
      roman += numeral.symbol
      num -= numeral.value
    }
  }

  return roman;
}

const randomArray = (array, number) => {
  var target = [...array]
  var result = []

  while (target.length > 0 && result.length < number) {
    const i = target[Math.floor(Math.random() * target.length)]
    target = target.filter(n => n !== i)
    result = [...result, i]
  }

  return result
}

export { convertToRoman, randomArray }