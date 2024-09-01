export default (dateTimeString: string): string => {
  // Split the input string by space
  const parts = dateTimeString.split(' ')

  // Return the second part, which is the time
  if (parts.length === 2) {
    return parts[1]
  }

  // Handle cases where input format might be incorrect
  throw new Error('Invalid date-time format. Expected format: \'YYYY-MM-DD HH:MM:SS\'')
}
