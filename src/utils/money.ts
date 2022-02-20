const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  maximumFractionDigits: 0,
})

export const formatMoney = (amount: number) => {
  return `${numberFormatter.format(amount)} USD`
}
