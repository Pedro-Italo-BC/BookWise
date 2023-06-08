type ratesType = {
  rate: number
}[]

export function getRatingMediaFunction(rates: ratesType) {
  const rate = Math.floor(
    rates.reduce((acc, cur) => {
      return acc + cur.rate
    }, 0) / rates.length,
  )

  return rate
}
