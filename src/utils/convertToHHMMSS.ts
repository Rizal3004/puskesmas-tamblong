export default (isoTimestamp: string): string => {
  // Create a Date object from the ISO timestamp
  const date = new Date(isoTimestamp)

  // Extract hours, minutes, and seconds
  const hours = date.getUTCHours().toString().padStart(2, '0') // Ensure two digits
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')

  // Return the formatted string
  return `${hours}:${minutes}:${seconds}`
}
