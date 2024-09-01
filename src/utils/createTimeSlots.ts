export default (): { id: string, name: string }[] => {
  const timeSlots: { id: string, name: string }[] = []
  let id = 1

  for (let hour = 8; hour <= 16; hour++) {
    const start = `${hour.toString().padStart(2, '0')}:00`
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`
    timeSlots.push({ id: id.toString(), name: `${start} - ${end}` })
    id++
  }

  return timeSlots
}
