export default (isoTimestamp: string): string => {
  // Create a Date object from the ISO timestamp
  const date = new Date(isoTimestamp)

  // Extract hours and minutes
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}
