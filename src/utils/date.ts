const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const mapParts = (date: Date) =>
  Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  )

export const slashMDY = (date: Date | string) => {
  const parts = mapParts(new Date(date))
  return `${parts.month}/${parts.day}/${parts.year}`
}
export const dashYMD = (date: Date) => {
  const parts = mapParts(date)
  return `${parts.year}-${parts.month}-${parts.day}`
}
